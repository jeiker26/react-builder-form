import { isRequired, Validator } from "./Validator";

describe("Validator class suite", () => {
  it("should return false if constructor is empty", () => {
    expect(new Validator().exec()).toBe(false);
  });

  it("should return foo if the content of the constructor is an anonymous function that returns 'foo'", () => {
    expect(new Validator(() => "foo").exec()).toEqual("foo");
  });
});

describe("isRequired suite", () => {
  const errorMessage = "Field is required";

  it("should return message when field value is null, false, empty array or empty string", () => {
    expect(isRequired.exec(null, {})).toEqual(errorMessage);
    expect(isRequired.exec(false, {})).toEqual(errorMessage);
    expect(isRequired.exec([], {})).toEqual(errorMessage);
    expect(isRequired.exec("", {})).toEqual(errorMessage);
  });

  it("should return false when field value is valid", () => {
    expect(isRequired.exec("foo", {})).toBe(false);
    expect(isRequired.exec(12, {})).toBe(false);
    expect(isRequired.exec(["var", "foo"], {})).toBe(false);
    expect(isRequired.exec(true, {})).toBe(false);
  });
});
