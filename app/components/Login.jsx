import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import Select from 'react-select';

import { manualLogin, signUp } from '../actions/users';
import styles from '../css/components/login';
import SingleLine from '../components/SingleLine';
import Padding from '../components/Padding';
import hourGlassSvg from '../images/hourglass.svg';

const cx = classNames.bind(styles);

const now = new Date().getFullYear();
const years = [];
for(let y = now-14; y > now-100; y--) {
  years.push({value:y, label:y});
}

class LoginOrRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {loginMode: false};
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.toggleLoginMode = this.toggleLoginMode.bind(this);
    this.genderSelected = this.genderSelected.bind(this);
    this.yearSelected = this.yearSelected.bind(this);
  }

  yearSelected(year) {
    this.setState({ year });
  }

  genderSelected(event) {
    this.setState({gender: event.target.value});
  }

  toggleLoginMode() {
    this.setState({loginMode: !this.state.loginMode});
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { manualLogin, signUp, user: { isLogin } } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    if (this.state.loginMode) {
      manualLogin({ email, password });
    } else {
      signUp({ email, password });
    }
  }

  render() {
    const { user: { isWaiting, message, isLogin } } = this.props;

    if(this.state.loginMode) {
      return (
        <div
          className={cx('login', {
            waiting: isWaiting
          })}
        >
          <div className={cx('main-section')}>
            <h1 className={cx('title')}>더 보려면 로그인하세요</h1>
            <Padding height="2.5rem" />

            <form onSubmit={this.handleOnSubmit} className={cx('form-area')}>
              <input
                className={cx('input')}
                type="email"
                ref="email"
                placeholder="이메일 주소"
              />
              <input
                className={cx('input')}
                type="password"
                ref="password"
                placeholder="비밀번호 입력"
              />
              <p
                className={cx('message', {
                'message-show': message && message.length > 0
              })}>{message}</p>
              <input
                className={cx('login-button')}
                type="submit"
                value={'로 그 인'} 
                role="button" />
            </form>

            <div className={cx('alternative')}>
              <div className={cx('alternative-message')} >아직 회원이 아니세요?</div>
              <div
                className={cx('alternative-link')}
                onClick={this.toggleLoginMode}
                role="button"
              >무료 회원가입</div>
            </div>
          
            <SingleLine width="100%" color="#dbd8d8" thickness={1} />

            <div className={cx('alternative')}>
              <div className={cx('alternative-message')} >로그인 정보를 잊으셨나요?</div>
              <div
                className={cx('text-link')}
                role="button" 
              >비밀번호 찾기</div>
            </div>

          </div>
        </div>
      );
    }

    else {
      return (
        <div
          className={cx('login', {
            waiting: isWaiting
          })}
        >
          <div className={cx('main-section')}>
            <h1 className={cx('title')}>무료 회원가입</h1>
            <p className={cx('helper', 'center')}>추가 정보를 입력하고 회원가입을 완료하세요.</p>
            <Padding height="2.5rem" />

            <div className={cx('form-area')}>
              <input
                className={cx('input')}
                type="email"
                ref="email"
                placeholder="이메일 주소"
              />
              <p className={cx('helper')}>
                해당 이메일로 다양한 프로젝트, 기업, 메이커 들의 소식이 발송됩니다.
                사용하는 이메일이 아닌 경우, 변경하시기 바랍니다.
              </p>
              <div className={cx('space-between')}>
                <label className={cx('label')}>이름</label>
                 <input
                  className={cx('input', 'middle-size')}
                  type="text"
                  ref="name"
                  placeholder="이름을 입력해주세요"
                />
              </div>
              <input
                className={cx('input')}
                type="password"
               ref="password"
                placeholder="비밀번호 입력"
              />
              <p className={cx('helper')}>
                영문, 숫자, 특수문자(!@#$%^&*+=.)를 조합한 8자 이상
              </p>
              <input
                className={cx('input')}
                type="password"
               ref="passwordCheck"
                placeholder="비밀번호 확인"
              />
            </div>

            <SingleLine width="100%" color="#dbd8d8" thickness={1} />

            <div className={cx('form-area')}>
              <h1 className={cx('second-title')}>추가 정보</h1>
              <p className={cx('helper', 'no-margin')}>
                입력된 정보는 외부에 노출되지 않고, <br/>
보다 나은 서비스 제공을 위한 통계자료로만 활용됩니다.
              </p>
              <div className={cx('space-between')}>
                <label className={cx('label')}>성별</label>
                <div className={cx('gender')}>
                  <input type="radio" value="man" checked={this.state.gender === 'man'} onChange={this.genderSelected} />
                  <Padding width="1.2rem" inline={true} />
                  남자
                  <Padding width="2.2rem" inline={true} />
                  <input type="radio" value="woman" checked={this.state.gender === 'woman'} onChange={this.genderSelected} />
                  <Padding width="1.2rem" inline={true} />
                  여자
                </div>
              </div>
              <div className={cx('space-between')}>
                <label className={cx('label')}>출생연도</label>
                <Select 
                  className={cx('year-select')} 
                  value={this.state.year} 
                  onChange={this.yearSelected}
                  options={years}
                  placeholder="선택해 주세요" />
              </div>
            </div>

            <SingleLine width="100%" color="#dbd8d8" thickness={1} />

            <div className={cx('check')}>
              <input type="checkbox" /><b className={cx('important')}>이용약관</b> 및 <b className={cx('important')}>개인정보 처리방침</b>에 동의합니다.
            </div>
            <div className={cx('check')}>
              <input type="checkbox" />[선택]마케팅 목적 이메일 수신 동의하기
            </div>
            <div>
              <p
                className={cx('message', {
                'message-show': message && message.length > 0
              })}>{message}</p>
              <input
                className={cx('login-button')}
                type="submit"
                value={'이메일로 회원가입'} 
                role="button" />
            </div>

            <SingleLine width="100%" color="#dbd8d8" thickness={1} />

            <div className={cx('alternative')}>
              <div className={cx('alternative-message')} >이미 회원이세요?</div>
              <div
                className={cx('alternative-link')}
                onClick={this.toggleLoginMode}
                role="button"
              >로그인</div>
            </div>
          </div>
        </div>
      );
    }
  }
}

LoginOrRegister.propTypes = {
  user: PropTypes.object,
  manualLogin: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired
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
export default connect(mapStateToProps, { manualLogin, signUp })(LoginOrRegister);

