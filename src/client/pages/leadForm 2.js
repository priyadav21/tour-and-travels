import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import config from '../../../config';

const LeadForm = props => {
  const { values, touched, errors, handleChange, handleBlur } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Yes I am working')
  }
  
  return (
    
    <form role="form" id="frmRegister" method="post" name="formName" onSubmit={handleSubmit}>
      <div className="form-group animated shake error">
        <input type="text" name="firstName" onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName} placeholder="First Name" id="inputfirst" className="form-control"  />
            {errors.firstName && touched.firstName && <div id=" error input-feedback">{errors.firstName}</div>}
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
                <input type="text" placeholder="Going From"  name="origin" onChange={handleChange}
                  onBlur={handleBlur}
          value={values.origin} id="inputOrigin" className="form-control"  />
        {errors.origin && touched.origin && <div id="input-feedback">{errors.origin}</div>}
               </div>
      <div className="form-group">
        <input type="text" placeholder="Going To" name="destination" onChange={handleChange}
          onBlur={handleBlur}
          value={values.destination} id="inputDestination" className="form-control" />
        {errors.destination && touched.destination && <div id="input-feedback">{errors.destination}</div>}
      </div> 
                <div className="form-group">
          {/* <p className="font-12 text-muted">By clicking Sign Up, you agree to our <a href="terms-and-conditions"> T &amp; C </a> and <a href="privacy-policy"> Privacy Policy </a></p> */}
        <button type="submit" className="btn btn-no-color log-in btn-block mb-2 mt-2" id="log-in" data-item-type="oldUser">Plan My Holidays</button>
                                </div>
                            </form>
  );
};

const  LeadFormUser = withFormik({
  mapPropsToValues: () => (
    { 
      firstName: '',
      email: '',
      mobile: '',
      origin :'',
      destination: ''
    }
 ),

  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .min(2, "C'mon, your name is longer than that")
      .required('First name is required.'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    mobile: Yup.string()
      .required('Mobile is required!'),
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
       .post(config.travelApiUrl+'enquiry/insert', {
        appKey: config.apiKey,
        departArrivalDate:'',
        destination: values.destination,
        origin: values.origin,
        email: values.email,
        firstName: values.firstName,
        leadType:1,
        mobile: values.mobile,
        service:'Tour',
        source: config.source,
        userRoleType: config.custRoleTyCd,
      })
      .then((response) => {
        if (response.data.status.success)
         alert('Thanks for request , we will get back to you soon');
         else
           alert('We could not process your request , please try again later');
      })
      .catch((err) => {
        console.log(err);
      });
  },

  displayName: 'BasicForm'
})(LeadForm);

export default LeadFormUser;

