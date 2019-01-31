import { transformFalseValue } from "./utils";

describe("transformFalseValue suite", () => {
  it("should return empty string if it does not receive parameters", () => {
    expect(transformFalseValue()).toEqual("");
    expect(transformFalseValue(0)).toEqual("");
  });

  it("should return empty array if you receive a parameter of the type array", () => {
    expect(transformFalseValue(["var", ["foo"]])).toEqual([]);
    expect(transformFalseValue([])).toEqual([]);
  });

  it("should return false if you receive a parameter of the type boolean", () => {
    expect(transformFalseValue(false)).toBe(false);
    expect(transformFalseValue(true)).toBe(false);
  });
});
