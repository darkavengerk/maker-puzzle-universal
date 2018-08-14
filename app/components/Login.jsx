import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from '../actions/users';
import styles from '../css/components/login';
import SingleLine from '../components/SingleLine';
import hourGlassSvg from '../images/hourglass.svg';

const cx = classNames.bind(styles);

class LoginOrRegister extends Component {
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { manualLogin, signUp, user: { isLogin } } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    if (isLogin) {
      manualLogin({ email, password });
    } else {
      signUp({ email, password });
    }
  }

  renderHeader() {
    const { user: { isLogin }, toggleLoginMode } = this.props;
    if (isLogin) {
      return (
        <div className={cx('main-section')}>
          <h1 className={cx('heading')}>더 보려면 로그인하세요</h1>
          <div className={cx('alternative')}>
            Not what you want?
            <a
              className={cx('alternative-link')}
              onClick={toggleLoginMode}
            >Register an Account</a>
          </div>
        </div>
      );
    }

    return (
      <div className={cx('header')}>
        <h1 className={cx('heading')}>Register with Email</h1>
        <div className={cx('alternative')}>
          Already have an account?
          <a
            className={cx('alternative-link')}
            onClick={toggleLoginMode}
          >Login</a>
        </div>
      </div>
    );
  }

  render() {
    const { isWaiting, message, isLogin } = this.props.user;

    return (
      <div
        className={cx('login', {
          waiting: isWaiting
        })}
      >
        <div className={cx('main-section')}>
          <h1 className={cx('title')}>더 보려면 로그인하세요</h1>

          <form onSubmit={this.handleOnSubmit} className={cx('form-area')}>
            <input
              className={cx('input')}
              type="email"
              ref="email"
              placeholder="email"
            />
            <input
              className={cx('input')}
              type="password"
             ref="password"
              placeholder="password"
            />
            <p
              className={cx('message', {
              'message-show': message && message.length > 0
            })}>{message}</p>
            <input
              className={cx('login-button')}
              type="submit"
              value={'로 그 인'} />
          </form>

          <div className={cx('alternative')}>
            <div className={cx('alternative-message')} >아직 회원이 아니세요?</div>
            <div
              className={cx('alternative-link')}
              onClick={toggleLoginMode}
            >무료 회원가입</div>
          </div>
        
          <SingleLine width="100%" color="#dbd8d8" thickness={1} />

          <div className={cx('alternative')}>
            <div className={cx('alternative-message')} >로그인 정보를 잊으셨나요?</div>
            <div
              className={cx('text-link')}
              onClick={toggleLoginMode}
            >비밀번호 찾기</div>
          </div>

        </div>
      </div>
    );
  }
}

LoginOrRegister.propTypes = {
  user: PropTypes.object,
  manualLogin: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  toggleLoginMode: PropTypes.func.isRequired
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps({user}) {
  return {
    user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps, { manualLogin, signUp, toggleLoginMode })(LoginOrRegister);

