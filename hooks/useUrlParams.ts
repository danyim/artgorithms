import { useState, useEffect, useCallback, useRef } from "react";

type ParamType = "number" | "boolean";

interface ParamConfig {
  key: string; // Short URL param key (e.g., "sz")
  type: ParamType;
  default: number | boolean;
}

type ParamConfigs<T extends string> = Record<T, ParamConfig>;

type ParamValues<T extends string> = Record<T, number | boolean>;

type LockedState<T extends string> = Record<T, boolean>;

interface UseUrlParamsReturn<T extends string> {
  values: ParamValues<T>;
  setValue: (key: T, value: number | boolean) => void;
  reset: () => void;
  initialized: boolean;
  locked: LockedState<T>;
  toggleLock: (key: T) => void;
  isLocked: (key: T) => boolean;
}

export function useUrlParams<T extends string>(
  configs: ParamConfigs<T>
): UseUrlParamsReturn<T> {
  // Build initial values from defaults
  const getDefaults = useCallback((): ParamValues<T> => {
    const defaults = {} as ParamValues<T>;
    for (const controlKey of Object.keys(configs) as T[]) {
      defaults[controlKey] = configs[controlKey].default;
    }
    return defaults;
  }, [configs]);

  // Build initial lock state (all unlocked)
  const getDefaultLocks = useCallback((): LockedState<T> => {
    const locks = {} as LockedState<T>;
    for (const controlKey of Object.keys(configs) as T[]) {
      locks[controlKey] = false;
    }
    return locks;
  }, [configs]);

  const [values, setValues] = useState<ParamValues<T>>(getDefaults);
  const [locked, setLocked] = useState<LockedState<T>>(getDefaultLocks);
  const [initialized, setInitialized] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const DEBOUNCE_MS = 200;

  // Read from URL params on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const newValues = { ...getDefaults() };
    const newLocks = { ...getDefaultLocks() };

    for (const controlKey of Object.keys(configs) as T[]) {
      const config = configs[controlKey];
      const paramValue = params.get(config.key);

      if (paramValue !== null) {
        // Check for "L" suffix indicating locked state
        const isLocked = paramValue.endsWith("L");
        const cleanValue = isLocked ? paramValue.slice(0, -1) : paramValue;

        if (config.type === "number") {
          newValues[controlKey] = Number(cleanValue);
        } else if (config.type === "boolean") {
          newValues[controlKey] = cleanValue === "1";
        }

        newLocks[controlKey] = isLocked;
      }
    }

    setValues(newValues);
    setLocked(newLocks);
    setInitialized(true);
  }, [configs, getDefaults, getDefaultLocks]);

  // Update URL params when values or locks change (debounced to prevent crashes from rapid updates)
  useEffect(() => {
    if (!initialized || typeof window === "undefined") return;

    // Clear previous debounce timer
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams();

      for (const controlKey of Object.keys(configs) as T[]) {
        const config = configs[controlKey];
        const currentValue = values[controlKey];
        const isLocked = locked[controlKey];
        const suffix = isLocked ? "L" : "";

        // Add params that differ from defaults OR are locked
        if (currentValue !== config.default || isLocked) {
          if (config.type === "boolean") {
            params.set(config.key, (currentValue ? "1" : "0") + suffix);
          } else {
            params.set(config.key, String(currentValue) + suffix);
          }
        }
      }

      const queryString = params.toString();
      const newUrl = queryString
        ? `${window.location.pathname}?${queryString}`
        : window.location.pathname;

      window.history.replaceState(null, "", newUrl);
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [initialized, values, locked, configs]);

  const setValue = useCallback((key: T, value: number | boolean) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => {
    setValues(getDefaults());
    setLocked(getDefaultLocks());
  }, [getDefaults, getDefaultLocks]);

  const toggleLock = useCallback((key: T) => {
    setLocked((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const isLocked = useCallback(
    (key: T) => {
      return locked[key] ?? false;
    },
    [locked]
  );

  return { values, setValue, reset, initialized, locked, toggleLock, isLocked };
}
