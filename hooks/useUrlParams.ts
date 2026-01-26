import { useState, useEffect, useCallback, useRef } from "react";

type ParamType = "number" | "boolean";

interface ParamConfig {
  key: string; // Short URL param key (e.g., "sz")
  type: ParamType;
  default: number | boolean;
}

type ParamConfigs<T extends string> = Record<T, ParamConfig>;

type ParamValues<T extends string> = Record<T, number | boolean>;

interface UseUrlParamsReturn<T extends string> {
  values: ParamValues<T>;
  setValue: (key: T, value: number | boolean) => void;
  reset: () => void;
  initialized: boolean;
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

  const [values, setValues] = useState<ParamValues<T>>(getDefaults);
  const [initialized, setInitialized] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const DEBOUNCE_MS = 200;

  // Read from URL params on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const newValues = { ...getDefaults() };

    for (const controlKey of Object.keys(configs) as T[]) {
      const config = configs[controlKey];
      const paramValue = params.get(config.key);

      if (paramValue !== null) {
        if (config.type === "number") {
          newValues[controlKey] = Number(paramValue);
        } else if (config.type === "boolean") {
          newValues[controlKey] = paramValue === "1";
        }
      }
    }

    setValues(newValues);
    setInitialized(true);
  }, [configs, getDefaults]);

  // Update URL params when values change (debounced to prevent crashes from rapid updates)
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

        // Only add params that differ from defaults
        if (currentValue !== config.default) {
          if (config.type === "boolean") {
            params.set(config.key, currentValue ? "1" : "0");
          } else {
            params.set(config.key, String(currentValue));
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
  }, [initialized, values, configs]);

  const setValue = useCallback((key: T, value: number | boolean) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => {
    setValues(getDefaults());
  }, [getDefaults]);

  return { values, setValue, reset, initialized };
}
