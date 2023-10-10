import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import config from '../../../config';
import { Redirect } from 'react-router-dom';

const SignUpFormAg = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    resetForm
  } = props;
  return (
    <form role="form" id="frmRegister" method="post" name="formName" onSubmit={handleSubmit}>
      <div className="form-group animated shake error">
        <input
          type="text"
          name="firstName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName || ''}
          placeholder="Your Name"
          id="inputfirst"
          className="form-control"
        />
        {errors.firstName && touched.firstName && (
          <div id=" error input-feedback">{errors.firstName}</div>
        )}
      </div>
      {/* <div className="form-group">
        <input type="text" name="lastName" onChange={handleChange}
            onBlur={handleBlur}
          value={values.lastName} placeholder="Last Name" id="inputlast" className="form-control"  />
        {errors.lastName && touched.lastName && <div id="input-feedback">{errors.lastName}</div>}
                                </div> */}
      <div className="form-group">
        <input
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email || ''}
          placeholder="Email"
          id="inputEmail"
          className="form-control"
        />
        {errors.email && touched.email && <div id="input-feedback">{errors.email}</div>}
      </div>
      <div className="form-group">
        <input
          type="number"
          name="mobile"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.mobile || ''}
          placeholder="Mobile"
          id="inputMobile"
          className="form-control"
        />
        {errors.mobile && touched.mobile && <div id="input-feedback">{errors.mobile}</div>}
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Company Name"
          name="companyName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.companyName || ''}
          id="inputCompanyName"
          className="form-control"
        />
        {errors.companyName && touched.companyName && (
          <div id="input-feedback">{errors.companyName}</div>
        )}
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Your website Link if any "
          name="website"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.website || ''}
          id="inputWebsite"
          className="form-control"
        />
        {errors.website && touched.website && <div id="input-feedback">{errors.website}</div>}
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="City"
          name="city"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.city || ''}
          id="inputCity"
          className="form-control"
        />
        {errors.city && touched.city && <div id="input-feedback">{errors.city}</div>}
      </div>
      {/* <div className="form-group">
        <select className="form-control my-fc" name="country" id="inputCountry" value="IN" onChange={handleChange} onBlur={handleBlur} value={values.country} >
          <option value="">Select Country</option>
          <option value="IN">India</option>
          <option value="">China</option>
          <option value="">Dubai</option>
          <option value="">USA</option>
          <option value="">Russia</option>
          <option value="">Israel</option>
        </select>
        {errors.country && touched.country && <div id="input-feedback">{errors.country}</div>}
      </div> */}
      <div className="form-group">
        <p className="font-12 text-muted">
          By clicking Sign Up, you agree to our <a href="terms-and-conditions"> T &amp; C </a> and{' '}
          <a href="privacy-policy"> Privacy Policy </a>
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-no-color btn-block text-black py-3 mt-4"
          id="log-in"
          data-item-type="oldUser"
          onClick={console.log("form will be submitted")}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

const SignUpFormAgent = withFormik({
  mapPropsToValues: () => ({
    city: '',
    companyCategory: 'CA26',
    companyName: '',
    companyServiceType: 'Travel',
    country: '',
    email: '',
    firstName: '',
    lastName: '',
    mobile: '',
    website: ''
  }),

  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .min(2, "C'mon, your name is longer than that")
      .required('First name is required.'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    mobile: Yup.string().required('Mobile is required!'),
    companyName: Yup.string().required('Company Name is required!')
  }),

  handleSubmit: (values, { setSubmitting, resetForm }) => {
    // alert(JSON.stringify(values, null, 2));
    console.log("I am inside form submit");
    axios
      .post(config.travelApiUrl+'company-lead/create', {
        appKey: config.apiKey,
        city: values.city,
        companyCategory: 'CA26',
        companyName: values.companyName,
        companyServiceType: 'Travel',
        country: values.country,
        email: values.email,
        firstName: values.firstName,
        lastName: values.firstName,
        leadSource: config.source,
        mobile: values.mobile,
        website: values.website
      })
      .then(response => {
        // if (response.data.status.success)
        // alert(response.data.status.message);
        // setStatus(response.data.status.message);
        setSubmitting(true);
        resetForm();
        // return <Redirect to="/free-website" />;
        // else alert('We could not process your request , please try again later');
      })
      .catch(err => {
        console.log(err);
        setSubmitting(false);
      });
  },

  displayName: 'BasicForm',
  enableReinitialize: true
})(SignUpFormAg);

export default SignUpFormAgent;

