import React from "react";
import { shallow } from "enzyme";
import { FormMock } from "./FormWrapper.hoc.mock";

describe("FormWrapper suite", () => {
  it("should return null when the condition fails", () => {
    const wrapper = shallow(<FormMock />);
    expect(wrapper.html()).toBe(null);
  });
});
