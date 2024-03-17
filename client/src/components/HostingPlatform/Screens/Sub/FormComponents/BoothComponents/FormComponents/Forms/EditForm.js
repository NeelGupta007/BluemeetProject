import React, { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { useDispatch, connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { editForm, fetchBoothForm } from "../../../../../../../../actions";
import { SwipeableDrawer } from "@material-ui/core";
import styled from "styled-components";

const StyledInput = styled.input`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #4e4e4e;

  &:hover {
    border: #538bf7;
  }
`;

const FormLabel = styled.label`
  font-family: "Ubuntu" !important;
  font-size: 0.82rem !important;
  font-weight: 500 !important;
  color: #727272 !important;
  margin-bottom: 5px;
`;

const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const FormError = styled.div`
  font-family: "Ubuntu";
  color: red;
  font-weight: 400;
  font-size: 0.8rem;
`;

const FormWarning = styled.div`
  font-family: "Ubuntu";
  color: orange;
  font-weight: 400;
  font-size: 0.8rem;
`;

const renderInput = ({
  input,
  meta: { touched, error, warning },
  type,
  ariadescribedby,
  classes,
  placeholder,
}) => {
  const className = `field ${error && touched ? "error" : ""}`;
  return (
    <div className={className}>
      <StyledInput
        type={type}
        {...input}
        aria-describedby={ariadescribedby}
        className={classes}
        placeholder={placeholder}
      />
      {touched &&
        ((error && <FormError className="my-1">{error}</FormError>) ||
          (warning && <FormWarning className="my-1">{warning}</FormWarning>))}
    </div>
  );
};

const EditForm = ({ open, handleClose, handleSubmit, reset, id }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoothForm(id));
  }, []);

  const onSubmit = (formValues) => {
    console.log(formValues);

    const ModifiedFormValues = {};

    ModifiedFormValues.name = formValues.name;
    ModifiedFormValues.formId = formValues.formId;

    dispatch(editForm(ModifiedFormValues, id, handleClose));
  };

  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer anchor="right" open={open}>
          <>
            <HeaderFooter className="form-heading-and-close-button mb-4 px-4 pt-3">
              <div></div>
              <div className="coupon-overlay-form-headline">Edit Form</div>
              <div className="overlay-form-close-button" onClick={handleClose}>
                <IconButton aria-label="delete">
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </HeaderFooter>

            <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
              <div className="create-new-coupon-form px-4 py-4">
                <div className="mb-3 overlay-form-input-row ">
                  <div>
                    <FormLabel
                      Forhtml="eventStartDate"
                      className="form-label form-label-customized"
                    >
                      Name
                    </FormLabel>
                    <Field
                      name="name"
                      type="text"
                      classes="form-control"
                      ariadescribedby="emailHelp"
                      placeholder="e.g. Experience survey"
                      component={renderInput}
                    />
                  </div>
                </div>

                <div className="mb-3 overlay-form-input-row">
                  <FormLabel
                    Forhtml="eventStartDate"
                    className="form-label form-label-customized"
                  >
                    Typeform Id
                  </FormLabel>
                  <div className="form-group">
                    <Field
                      name="formId"
                      type="text"
                      classes="form-control"
                      ariadescribedby="emailHelp"
                      placeholder="Typeform Id"
                      component={renderInput}
                    />
                  </div>
                </div>

                <div
                  style={{ width: "100%" }}
                  className="d-flex flex-row justify-content-end"
                >
                  <button
                    className="btn btn-outline-primary btn-outline-text me-3"
                    onClick={reset}
                  >
                    Discard
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary btn-outline-text"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

const mapStateToProps = (state) => ({
  initialValues: {
    name:
      state.booth.formDetails && state.booth.formDetails.name
        ? state.booth.formDetails.name
        : "",
    formId:
      state.booth.formDetails && state.booth.formDetails.formId
        ? state.booth.formDetails.formId
        : "",
  },
});

const validate = (formValues) => {
  const errors = {};

  if (!formValues.name) {
    errors.name = "Name is required";
  }

  if (!formValues.url) {
    errors.formId = "Form Id is required";
  }
  return errors;
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "EditFormDetails",
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
  })(EditForm)
);
