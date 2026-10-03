// Guards the Storage shim in vitest.setup.ts: node 26 ships a `localStorage`
// global that reads as undefined, and vitest's jsdom env does not replace it,
// so without the shim every `localStorage.getItem(...)` under test throws.
describe("test environment storage", () => {
  it("behaves like Storage", () => {
    expect(localStorage.getItem("missing")).toBeNull();

    localStorage.setItem("debugShapes", "1");
    expect(localStorage.getItem("debugShapes")).toEqual("1");
    expect(localStorage.length).toEqual(1);
    expect(localStorage.key(0)).toEqual("debugShapes");

    localStorage.removeItem("debugShapes");
    expect(localStorage.getItem("debugShapes")).toBeNull();
    expect(localStorage.length).toEqual(0);
  });

  it("is isolated between tests", () => {
    expect(localStorage.length).toEqual(0);
    expect(sessionStorage.getItem("debugShapes")).toBeNull();
  });
});
