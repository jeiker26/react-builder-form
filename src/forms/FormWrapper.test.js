import React from "react";
import { shallow, mount } from "enzyme";
import { FormMock, FIELDS_MOCKS, MOCKS_NEW_VALUES } from "./FormWrapper.hoc.mock";

describe("FormWrapper suite", () => {
  it("should return loading state", () => {
    // shallow no execute componentDidMount
    const wrapper = shallow(<FormMock />);
    expect(wrapper.html()).toBe("<p>Loading...</p>");
  });

  it("should return loading state", () => {
    // mount execute componentDidMount
    const wrapper = mount(<FormMock />);
    expect(wrapper.find("form").length).toEqual(1);
  });

  it("should load default values", () => {
    const wrapper = mount(<FormMock />);

    // text
    expect(wrapper.find("input[name='name']").props().value).toEqual(
      FIELDS_MOCKS.name.defaultValue
    );

    // date
    expect(wrapper.find("input[name='age']").props().value).toEqual(FIELDS_MOCKS.age.defaultValue);

    // checkbox true/false
    expect(wrapper.find("input[name='policyPrivacy']").props().value).toEqual(
      FIELDS_MOCKS.policyPrivacy.defaultValue
    );

    // radio
    expect(wrapper.find("input[name='gender'][checked=true]").props().value).toEqual(
      FIELDS_MOCKS.gender.defaultValue
    );

    // checkboxmulti
    expect(wrapper.find("input[name='films[]'][checked=true]").length).toEqual(2);
    expect(
      wrapper
        .find(`input[name='films[]'][checked=true][value="${FIELDS_MOCKS.films.defaultValue[0]}"]`)
        .props().value
    ).toEqual(FIELDS_MOCKS.films.defaultValue[0]);

    expect(
      wrapper
        .find(`input[name='films[]'][checked=true][value="${FIELDS_MOCKS.films.defaultValue[1]}"]`)
        .props().value
    ).toEqual(FIELDS_MOCKS.films.defaultValue[1]);

    // select
    expect(wrapper.find(`select[name='car']`).props().value).toEqual(
      FIELDS_MOCKS.car.defaultValue
    );
  });

  it("should load set new values", () => {
    const wrapper = mount(<FormMock />);
    wrapper.find("#btn-set-values").simulate("click");

    // text
    expect(wrapper.find("input[name='name']").props().value).toEqual(MOCKS_NEW_VALUES.name);

    // date
    expect(wrapper.find("input[name='age']").props().value).toEqual(MOCKS_NEW_VALUES.age);

    // checkbox true/false
    expect(wrapper.find("input[name='policyPrivacy']").props().value).toEqual(
      MOCKS_NEW_VALUES.policyPrivacy
    );

    // radio
    expect(wrapper.find("input[name='gender'][checked=true]").props().value).toEqual(
      MOCKS_NEW_VALUES.gender
    );

    // checkboxmulti
    expect(wrapper.find("input[name='films[]'][checked=true]").length).toEqual(1);
    expect(
      wrapper
        .find(`input[name='films[]'][checked=true][value="${MOCKS_NEW_VALUES.films[0]}"]`)
        .props().value
    ).toEqual(MOCKS_NEW_VALUES.films[0]);

    // select
    expect(wrapper.find(`select[name='car']`).props().value).toEqual(MOCKS_NEW_VALUES.car);
  });

  it("should clear values", () => {
    const wrapper = mount(<FormMock />);
    wrapper.find("#btn-clear").simulate("click");

    // text
    expect(wrapper.find("input[name='name']").props().value).toEqual("");

    // date
    expect(wrapper.find("input[name='age']").props().value).toEqual("");

    // checkbox true/false
    expect(wrapper.find("input[name='policyPrivacy']").props().value).toBe(false);

    // radio
    expect(wrapper.find("input[name='gender'][checked=true]").length).toEqual(0);

    // checkboxmulti
    expect(wrapper.find("input[name='films[]'][checked=true]").length).toEqual(0);

    // select
    expect(wrapper.find(`select[name='car']`).props().value).toEqual("");
  });
});
