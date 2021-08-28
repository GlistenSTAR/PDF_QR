import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { getUser, savePassword } from '../../actions/auth';

const params = new URLSearchParams(window.location.search)

const ChangePassword = ({ 
    getUser,
    isAuthenticated,
    auth: { current_user },
    setAlert,
    savePassword,
    history
  }) => {

  useEffect(() => {
    getUser(params.get('id'));
  }, [getUser]);
  
  const [formData, setFormData] = useState({
    password:'',
    password2:''
  });

  const { password, password2 } = formData;

  const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      console.log("send the request")
      savePassword(params.get('id'), password, history)
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
      <Fragment>
        <div className="auth_component" align="center">
          <h1 className="large text-primary">Change password</h1>
          <p className="lead">
            <i className="fas fa-lock" /> Change your password
          </p>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={current_user ? current_user.email : ''}
                  onChange={onChange}
                  required
                  disabled
              />
            </div>
            <div className="form-group">
              <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={onChange}
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

ChangePassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  savePassword: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(mapStateToProps, { setAlert, getUser, savePassword })( ChangePassword );
