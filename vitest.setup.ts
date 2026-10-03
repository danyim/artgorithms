import "@testing-library/jest-dom/vitest";

// Node 26 defines its own `localStorage`/`sessionStorage` globals that read as
// `undefined` unless node runs with --experimental-webstorage. vitest's jsdom
// environment only copies a window key onto the global when that key is absent
// or listed in its internal KEYS array, which covers `Storage` but not the
// `localStorage` instance, so node's stub shadows jsdom's working Storage and
// any `localStorage.getItem(...)` in code under test throws. Install a plain
// in-memory Storage so tests see browser-like behaviour.
// ponytail: methods only, no index/property access (`localStorage.debug`) and
// no storage events; swap in jsdom's Storage if a test needs either.
class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  get length() {
    return this.store.size;
  }

  key(index: number) {
    return Array.from(this.store.keys())[index] ?? null;
  }

  getItem(key: string) {
    return this.store.get(String(key)) ?? null;
  }

  setItem(key: string, value: string) {
    this.store.set(String(key), String(value));
  }

  removeItem(key: string) {
    this.store.delete(String(key));
  }

  clear() {
    this.store.clear();
  }
}

for (const name of ["localStorage", "sessionStorage"] as const) {
  Object.defineProperty(globalThis, name, {
    value: new MemoryStorage(),
    configurable: true,
    writable: true,
  });
}

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});
