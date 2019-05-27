import React from 'react';
import { connect } from 'react-redux';

import './style.scss';
import * as Actions from '../../actions';

const NavBar = React.memo(({ logout, username, image }) => (
  <div className="navBar sticky-top d-flex justify-content-around align-items-center">
    <span>
      <img className="rounded-circle" src={image} width="40px" height="40px"/>
      <span className="font-weight-bold ml-2">{username}</span>
    </span>
    <button className="btn btn-primary rounded-pill" onClick={logout}>
      Logout
    </button>
  </div>
))

const mapStateToProps = ({ user }) => ({
  username: user.data,
  image: user.image
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(Actions.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
