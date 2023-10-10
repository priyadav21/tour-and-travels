import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import config from '../../../config';

const SignUpForm = props => {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
  return (
    
    <form role="form" id="frmRegister" method="post" name="formName" onSubmit={handleSubmit}>
      <div className="form-group animated shake error">
        <input type="text" name="firstName" onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName} placeholder="First Name" id="inputfirst" className="form-control"  />
            {errors.firstName && touched.firstName && <div id=" error input-feedback">{errors.firstName}</div>}
      </div>
        <div className="form-group">
        <input type="text" name="lastName" onChange={handleChange}
            onBlur={handleBlur}
          value={values.lastName} placeholder="Last Name" id="inputlast" className="form-control"  />
        {errors.lastName && touched.lastName && <div id="input-feedback">{errors.lastName}</div>}
                                </div>
          <div className="form-group">
            <input type="email" name="email" onChange={handleChange}
              onBlur={handleBlur}
          value={values.email} placeholder="Email" id="inputEmail" className="form-control"  />
        {errors.email && touched.email && <div id="input-feedback">{errors.email}</div>}
                                </div>
            <div className="form-group">
              <input type="number" name="mobile" onChange={handleChange}
                onBlur={handleBlur}
          value={values.mobile} placeholder="Mobile" id="inputMobile" className="form-control"  />
        {errors.mobile && touched.mobile && <div id="input-feedback">{errors.mobile}</div>}
                                </div>
              <div className="form-group">
                <input type="password" placeholder="Password" name="password" onChange={handleChange}
                  onBlur={handleBlur}
          value={values.password} id="inputPassword" className="form-control"  />
        {errors.password && touched.password && <div id="input-feedback">{errors.password}</div>}
                                </div>
                <div className="form-group">
          <p className="font-12 text-muted">By clicking Sign Up, you agree to our <a href="terms-and-conditions"> T &amp; C </a> and <a href="privacy-policy"> Privacy Policy </a></p>
        <button type="submit" className="btn btn-no-color log-in btn-block mb-2 mt-2" id="log-in" data-item-type="oldUser">Sign Up</button>
                                </div>
                            </form>
  );
};

const  SignUpFormUser = withFormik({
  mapPropsToValues: () => (
    { 
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      password: ''
    }
 ),

  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .min(2, "C'mon, your name is longer than that")
      .required('First name is required.'),
    lastName: Yup.string()
      .min(2, "C'mon, your name is longer than that")
      .required('Last name is required.'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    mobile: Yup.string()
      .required('Mobile is required!'),
    password: Yup.string()
      .required('password is required!'),
  }),

  /* // Custom sync validation
  validate: values => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = 'Required';
    }
    else{
      console.log("values.firstName " +values.firstName);
    }

    return errors;
  }, */

  handleSubmit: (values, { setSubmitting }) => {
      // alert(JSON.stringify(values, null, 2));
      // setSubmitting(false);
     axios
      .post(config.travelApiUrl+'user/register', {
        appKey: config.apiKey,
        source: config.source,
        userRoleType: config.custRoleTy,
        firstName: values.firstName,
        mobile: values.mobile,
        email: values.email,
        password: values.password
      })
      .then((response) => {
        if (response.data.status.success)
          alert('Welcome to the world of offerd & deals');
        else alert('We could not process your request , please try again later');
      })
      .catch((err) => {
        console.log(err);
      });
  },

  displayName: 'BasicForm'
})(SignUpForm);

export default SignUpFormUser;

