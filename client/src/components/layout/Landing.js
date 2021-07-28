import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                    <div className='landing-inner'>
                      <h1 className='x-large'>Whole PDF Reader</h1>
                      <p className='lead'>
                        It's can read the pdf files, upload the pdf files, saw about pdf info using QR code scanner and etc...
                      </p>
                      <div className='buttons'>
                        <Link to='/register' className='btn btn-info btn-lg'>
                          Sign Up
                        </Link>
                        <Link to='/login' className='btn btn-light btn-lg'>
                          Login
                        </Link>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
