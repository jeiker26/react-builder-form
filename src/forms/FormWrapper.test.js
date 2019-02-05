import React from "react";
import { shallow } from "enzyme";
import {
  FormMock,
  FIELDS_MOCKS,
  MOCKS_NEW_VALUES,
  MOCKS_CLEAR_VALUES,
  FIELDS_ONCHANGE_MOCKS,
  minstringvalidator
} from "./FormWrapper.hoc.mock";
import { isRequired, IS_REQUIRED_ERROR } from "./Validator";

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
    const elements = wrapper.props().form.elements;

    console.log(elements);
    // text
    const textInput = "name";
    elements[textInput].onChange(FIELDS_ONCHANGE_MOCKS[textInput]);
    expect(elements[textInput].value).toEqual(FIELDS_ONCHANGE_MOCKS[textInput].target.value);

    // date
    wrapper.props().form.elements.age.onChange();
    expect(wrapper.props().form.elements.age.value).toEqual("1992-04-19");

    // checkbox true/false
    wrapper.props().form.elements.policyPrivacy.onChange();
    expect(wrapper.props().form.elements.policyPrivacy.value).toEqual(false);

    // radio
    wrapper.props().form.elements.gender.onChange();
    expect(wrapper.props().form.elements.gender.value).toEqual("y");

    // todo: radiomulti

    // checkboxmulti
    wrapper.props().form.elements.films.onChange();
    expect(wrapper.props().form.elements.films.value).toEqual(["film1", "foo"]);

    // select
    wrapper.props().form.elements.car.onChange();
    expect(wrapper.props().form.elements.car.value).toEqual("renault");
  });

  it("should get input interface", () => {
    const wrapper = shallow(<FormMock />);
    wrapper.props().form.setFields(FIELDS_MOCKS); // setElements

    // text
    const inputText = wrapper.props().form.getInput("name");
    expect([inputText.name, typeof inputText.onChange === "function", inputText.value]).toEqual([
      "name",
      true,
      FIELDS_MOCKS.name.defaultValue
    ]);

    // date
    const inputDate = wrapper.props().form.getInput("age");
    expect([inputDate.name, typeof inputDate.onChange === "function", inputDate.value]).toEqual([
      "age",
      true,
      FIELDS_MOCKS.age.defaultValue
    ]);

    // checkbox true/false
    const checkbox = wrapper.props().form.getCheckbox("policyPrivacy");
    expect([
      checkbox.name,
      typeof checkbox.onChange === "function",
      checkbox.value,
      checkbox.checked
    ]).toEqual(["policyPrivacy", true, FIELDS_MOCKS.policyPrivacy.defaultValue, true]);

    // radio
    const radio = wrapper.props().form.getRadio("gender", "y");
    expect([radio.name, typeof radio.onChange === "function", radio.value, radio.checked]).toEqual(
      ["gender", true, "y", false]
    );

    // todo: radiomulti

    // checkboxmulti
    const checkboxmulti = wrapper.props().form.getCheckboxMulti("films", "film4");
    expect([
      checkboxmulti.name,
      typeof checkboxmulti.onChange === "function",
      checkboxmulti.value,
      checkboxmulti.checked
    ]).toEqual(["films[]", true, "film4", false]);

    // select
    const select = wrapper.props().form.getSelect("car");
    expect([select.name, typeof select.onChange === "function", select.value]).toEqual([
      "car",
      true,
      FIELDS_MOCKS.car.defaultValue
    ]);
  });

  it("should check errors", () => {
    const wrapper = shallow(<FormMock />);
    wrapper.props().form.setFields({
      name: {
        validators: [isRequired]
      }
    }); // setElements

    wrapper.props().form.submit({ preventDefault: () => {} });
    expect(wrapper.props().form.errors.name).toEqual(["Field is required"]);
  });

  it("should not check error", () => {
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
    }); // setElements

    wrapper.props().form.submit({ preventDefault: () => {} });
    expect(wrapper.props().form.errors).toEqual({
      totalErrors: 3,
      x: ["Field is required", "El elemento debe tener más de 3 caracteres."],
      y: ["Field is required"],
      z: []
    });
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
