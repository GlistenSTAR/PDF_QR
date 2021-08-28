import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { forgot } from '../../actions/auth';

const Forgot = ({ forgot, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: ''
  });

  const { email } = formData;

  const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    forgot(email);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
      <Fragment>
        <div className="auth_component forgot" align="center">
          <h1 className="large text-primary">Forgot password</h1>
          <p className="lead">
            <i className="fas fa-lock" /> Recovery your password
          </p>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
              />
            </div>
            <input type="submit" className="btn btn-primary mt-3" />
          </form>
          <p className="my-1 mt-3" style={{display: 'flex', justifyContent: 'space-around'}}>
            <span className="col-sm-12">Did you recovery password? <Link to="/login" className="col-sm-12">Login</Link></span>
          </p>
        </div>
      </Fragment>
  );
};

Forgot.propTypes = {
  forgot: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { forgot })( Forgot );
