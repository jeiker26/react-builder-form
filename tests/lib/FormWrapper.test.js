import React from "react";
import { shallow } from "enzyme";
import {
  FormMock,
  FIELDS_MOCKS,
  MOCKS_NEW_VALUES,
  MOCKS_CLEAR_VALUES,
  FIELDS_ONCHANGE_MOCKS,
  minstringvalidator,
  MINSTRINGVALIDATOR_ERROR,
  FakeComponent
} from "./FormWrapper.hoc.mock";
import { isRequired, IS_REQUIRED_ERROR } from "../../src/lib/Validator";

describe("FormWrapper suite", () => {
  it("should return loading state", () => {
    const wrapper = shallow(<FormMock />);
    expect(wrapper.props().form.loading).toBe(true);
  });

  it("should return loading state", () => {
    const wrapper = shallow(<FormMock />);
    wrapper.props().form.setFields({
      name: {}
    });
    expect(wrapper.props().form.loading).toBe(false);
  });

  it("should load default values", () => {
    const wrapper = shallow(<FormMock />);
    wrapper.props().form.setFields(FIELDS_MOCKS);

    Object.keys(FIELDS_MOCKS).forEach(fieldName => {
      expect(wrapper.props().form.elements[fieldName].value).toEqual(
        FIELDS_MOCKS[fieldName].defaultValue
      );
    });
  });

  it("should load set new values", () => {
    const wrapper = shallow(<FormMock />);
    wrapper.props().form.setFields(FIELDS_MOCKS);
    wrapper.props().form.setValues(MOCKS_NEW_VALUES);

    Object.keys(FIELDS_MOCKS).forEach(fieldName => {
      expect(wrapper.props().form.elements[fieldName].value).toEqual(MOCKS_NEW_VALUES[fieldName]);
    });
  });

  it("should clear values", () => {
    const wrapper = shallow(<FormMock />);
    wrapper.props().form.setFields(FIELDS_MOCKS);
    wrapper.props().form.clear();

    Object.keys(FIELDS_MOCKS).forEach(fieldName => {
      expect(wrapper.props().form.elements[fieldName].value).toEqual(
        MOCKS_CLEAR_VALUES[fieldName]
      );
    });
  });

  it("should set validationWriteWithoutSubmit a true", () => {
    const wrapper = shallow(<FormMock />);
    wrapper.props().form.validationWriteWithoutSubmit(true);
    expect(wrapper.props().form.isValidationWrite).toBe(true);
  });

  it("should compile form and get error, with activate validationWriteWithoutSubmit", () => {
    const wrapper = shallow(<FormMock />);
    const FIELD_NAME = "name";
    wrapper.props().form.setFields({
      [FIELD_NAME]: {
        defaultValue: "fooVar",
        validators: [isRequired]
      }
    });
    wrapper.props().form.validationWriteWithoutSubmit(true);
    expect(wrapper.props().form.getErrors(FIELD_NAME)).toEqual([]);
    wrapper.props().form.elements[FIELD_NAME].onChange({ target: { value: "" } });
    expect(wrapper.props().form.getErrors(FIELD_NAME)).toEqual([IS_REQUIRED_ERROR]);
  });

  it("should check onChange", () => {
    const wrapper = shallow(<FormMock />);
    wrapper.props().form.setFields(FIELDS_MOCKS);

    // text
    const textInput = "name";
    wrapper.props().form.elements[textInput].onChange(FIELDS_ONCHANGE_MOCKS[textInput]);
    expect(wrapper.props().form.elements[textInput].value).toEqual(
      FIELDS_ONCHANGE_MOCKS[textInput].target.value
    );

    // date
    const dateInput = "age";
    wrapper.props().form.elements[dateInput].onChange(FIELDS_ONCHANGE_MOCKS[dateInput]);
    expect(wrapper.props().form.elements[dateInput].value).toEqual(
      FIELDS_ONCHANGE_MOCKS[dateInput].target.value
    );

    // checkbox true/false
    const checkbox = "policyPrivacy";
    wrapper.props().form.elements[checkbox].onChange(FIELDS_ONCHANGE_MOCKS[checkbox]);
    expect(wrapper.props().form.elements[checkbox].value).toEqual(
      FIELDS_ONCHANGE_MOCKS[checkbox].target.checked
    );

    // radio
    const radio = "gender";
    wrapper.props().form.elements[radio].onChange(FIELDS_ONCHANGE_MOCKS[radio]);
    expect(wrapper.props().form.elements[radio].value).toEqual(
      FIELDS_ONCHANGE_MOCKS[radio].target.value
    );

    // checkboxmulti
    const checkboxmulti = "films";
    wrapper.props().form.elements[checkboxmulti].onChange(FIELDS_ONCHANGE_MOCKS[checkboxmulti]);
    expect(wrapper.props().form.elements[checkboxmulti].value).toEqual([
      FIELDS_MOCKS[checkboxmulti].defaultValue,
      FIELDS_ONCHANGE_MOCKS[checkboxmulti].target.value
    ]);

    // select
    const select = "car";
    wrapper.props().form.elements[select].onChange(FIELDS_ONCHANGE_MOCKS[select]);
    expect(wrapper.props().form.elements[select].value).toEqual(
      FIELDS_ONCHANGE_MOCKS[select].target.value
    );
  });

  it("should get input interface", () => {
    // todo: delete magic string
    const wrapper = shallow(<FormMock />);
    wrapper.props().form.setFields(FIELDS_MOCKS);

    // text
    const inputText = wrapper.props().form.getInput("name");
    expect([inputText.name, typeof inputText.onChange === "function", inputText.value]).toEqual([
      "name",
      true,
      FIELDS_MOCKS.name.defaultValue
    ]);

    // checkbox true/false
    const checkbox = wrapper.props().form.getCheckbox("policyPrivacy");
    expect([
      checkbox.name,
      typeof checkbox.onChange === "function",
      checkbox.value,
      checkbox.checked
    ]).toEqual(["policyPrivacy", true, FIELDS_MOCKS.policyPrivacy.defaultValue, true]);

    const radio = wrapper.props().form.getRadio("gender", "y");
    expect([radio.name, typeof radio.onChange === "function", radio.value, radio.checked]).toEqual(
      ["gender", true, "y", false]
    );

    const checkboxmulti = wrapper.props().form.getCheckboxMulti("films", "film4");
    expect([
      checkboxmulti.name,
      typeof checkboxmulti.onChange === "function",
      checkboxmulti.value,
      checkboxmulti.checked
    ]).toEqual(["films[]", true, "film4", false]);

    const select = wrapper.props().form.getSelect("car");
    expect([select.name, typeof select.onChange === "function", select.value]).toEqual([
      "car",
      true,
      FIELDS_MOCKS.car.defaultValue
    ]);
  });

  it("should check error", () => {
    const wrapper = shallow(<FormMock />);
    wrapper.props().form.setFields({
      x: {
        validators: [isRequired, minstringvalidator]
      },
      y: {
        validators: [isRequired]
      },
      z: {
        defaultValue: "fooVar",
        validators: [isRequired, minstringvalidator]
      }
    });

    wrapper.props().form.submit({ preventDefault: () => {} });
    expect(wrapper.props().form.errors).toEqual({
      totalErrors: 3,
      x: [IS_REQUIRED_ERROR, MINSTRINGVALIDATOR_ERROR],
      y: [IS_REQUIRED_ERROR],
      z: []
    });
  });
});

describe("minstringvalidator suite", () => {
  it("should return error", () => {
    expect(minstringvalidator.exec("as")).toEqual(MINSTRINGVALIDATOR_ERROR);
  });

  it("should return not error", () => {
    expect(minstringvalidator.exec("Eass")).toBe(false);
  });
});

describe("FakeComponent suite", () => {
  it("should render correctly", () => {
    expect(shallow(<FakeComponent />).exists()).toBe(true);
  });
});
/* Integration test
  it("should compile form and check if form is valid with validators, then setField and return check form", () => {
    const event = {
      preventDefault: () => {}
    };
    const wrapper = shallow(<FormMock />);
    wrapper.props().form.setFields({
      name: {
        validators: [isRequired]
      }
    }); // Set elements
    expect(wrapper.props().form.isValid).toBe(false);
    wrapper.props().form.submit(event);
    expect(wrapper.props().form.isValid).toBe(false);
    wrapper.props().form.setValues({ name: "foo" });
    wrapper.props().form.submit(event);
    expect(wrapper.props().form.isValid).toBe(true);
  });

  it("should compile form and check if form is valid [no validators]", () => {
    const event = {
      preventDefault: () => {}
    };
    const wrapper = shallow(<FormMock />);
    wrapper.props().form.setFields({
      name: {
        defaultValue: "foo",
        validators: []
      }
    }); // Set elements
    expect(wrapper.props().form.isValid).toBe(false);
    wrapper.props().form.submit(event);
    expect(wrapper.props().form.isValid).toBe(true);
  });
*/
