import React from "react";
import { shallow, mount } from "enzyme";
import {
  FormMock,
  FIELDS_MOCKS,
  MOCKS_NEW_VALUES,
  minstringvalidator
} from "./FormWrapper.hoc.mock";
import { isRequired } from "./Validator";

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
    expect(wrapper.find(`input[name='films[]'][checked=true]`).props().value).toEqual(
      FIELDS_MOCKS.films.defaultValue
    );

    // checkboxmulti case 2

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

  it("should set validationWriteWithoutSubmit a true", () => {
    const wrapper = shallow(<FormMock />);
    wrapper.props().form.validationWriteWithoutSubmit(true);
    expect(wrapper.props().form.isValidationWrite).toBe(true);
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

  it("should compile form and check if form is valid with validators, then setField and return check form with validationWriteWithoutSubmit", () => {
    const wrapper = shallow(<FormMock />);
    wrapper.props().form.setFields({
      name: {
        defaultValue: "fooVar",
        validators: [isRequired, minstringvalidator]
      }
    }); // Set elements
    wrapper.props().form.validationWriteWithoutSubmit(true);
    wrapper.props().form.elements["name"].onChange({ target: { value: "var" } });
    expect(wrapper.props().form.getErrors("name")).toEqual([
      "El elemento debe tener más de 3 caracteres."
    ]);
  });

  it("should check onChange", () => {
    const wrapper = shallow(<FormMock />);
    wrapper.props().form.setFields(FIELDS_MOCKS); // setElements

    // text
    wrapper.props().form.elements.name.onChange({ target: { value: "var" } });
    expect(wrapper.props().form.elements.name.value).toEqual("var");

    // date
    wrapper.props().form.elements.age.onChange({ target: { value: "1992-04-19" } });
    expect(wrapper.props().form.elements.age.value).toEqual("1992-04-19");

    // checkbox true/false
    wrapper.props().form.elements.policyPrivacy.onChange({
      target: { name: "policyPrivacy", type: "checkbox", checked: false }
    });
    expect(wrapper.props().form.elements.policyPrivacy.value).toEqual(false);

    // radio
    wrapper.props().form.elements.gender.onChange({ target: { type: "radio", value: "y" } });
    expect(wrapper.props().form.elements.gender.value).toEqual("y");

    // todo: radiomulti

    // checkboxmulti
    wrapper.props().form.elements.films.onChange({
      target: { type: "checkbox", name: "films[]", value: "foo" }
    });
    expect(wrapper.props().form.elements.films.value).toEqual(["film1", "foo"]);

    // select
    wrapper.props().form.elements.car.onChange({ target: { value: "renault" } });
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
