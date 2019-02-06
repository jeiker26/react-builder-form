import {
  transformFalseValue,
  convertIntoArray,
  insertOrDeleteElemntArray
} from "../../src/lib/utils";

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

describe("convertIntoArray suite", () => {
  it("should return empty array", () => {
    expect(convertIntoArray(false)).toEqual([]);
  });

  it("should return array with one string element", () => {
    expect(convertIntoArray("var")).toEqual(["var"]);
  });

  it("should return array without false", () => {
    expect(convertIntoArray(["foo", "", false, "var"])).toEqual(["foo", "var"]);
  });
});

describe("insertOrDeleteElemntArray suite", () => {
  it("should return array with a new element", () => {
    expect(insertOrDeleteElemntArray(["foo", "var"], "fooVar")).toEqual(["foo", "var", "fooVar"]);
  });

  it("should return array without an element", () => {
    expect(insertOrDeleteElemntArray(["foo", "var"], "var")).toEqual(["foo"]);
  });
});
