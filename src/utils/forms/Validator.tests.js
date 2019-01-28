import { isRequired } from "./Validator";

test("isRequired suite", () => {
  // should return false
  expect(isRequired("foo")).toBe(true);
});
