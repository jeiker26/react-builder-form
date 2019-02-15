import React from "react";
import { shallow } from "enzyme";
import { Form } from "../../src/lib/FormLoading";

describe("FormWrapper suite", () => {
  it("should reder without errors", () => {
    expect(shallow(<Form form={{ submit: () => "foo", elements: {} }} />).exists()).toBe(true);
  });

  it("should return form empty", () => {
    const wrapper = shallow(
      <Form form={{ submit: () => "foo", elements: {} }}>
        <p>Form Fields</p>
      </Form>
    );
    expect(wrapper.html()).toEqual("<form></form>");
  });

  it("should return form with children", () => {
    const wrapper = shallow(
      <Form form={{ submit: () => "foo", elements: { c: "var" } }}>
        <p>Form Fields</p>
      </Form>
    );
    expect(wrapper.html()).toEqual("<form><p>Form Fields</p></form>");
  });
});
