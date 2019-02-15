import React from "react";
import PropTypes from "prop-types";

export const Form = ({ form, children }) => (
  <form onSubmit={form.submit}>
    {!form.loading && Object.keys(form.elements).length && children}
  </form>
);

Form.propTypes = {
  children: PropTypes.any,
  form: PropTypes.shape({
    submit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    elements: PropTypes.object
  })
};
