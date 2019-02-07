import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import Select from 'react-select';

import { manualLogin, signUp } from '../actions/users';
import { dismissMessage } from '../actions/messages';
import SingleLine from '../components/SingleLine';
import Padding from '../components/Padding';
import FlexibleImage from '../components/FlexibleImage';
// import hourGlassSvg from '../images/hourglass.svg';

import styles from '../css/components/login';
const cx = classNames.bind(styles);

const now = new Date().getFullYear();
const years = [];
for(let y = now-14; y > now-100; y--) {
  years.push({value:y, label:y});
}

class LoginOrRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {loginMode: 'main'};
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.toggleLoginMode = this.toggleLoginMode.bind(this);
    this.emailLoginClicked = this.emailLoginClicked.bind(this);
    this.genderSelected = this.genderSelected.bind(this);
    this.yearSelected = this.yearSelected.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  yearSelected(year) {
    this.setState({ year });
  }

  genderSelected(event) {
    this.setState({gender: event.target.value});
  }

  toggleLoginMode(event) {
    event.preventDefault();
    if(this.state.loginMode === 'signup') {
      this.setState({loginMode: 'main'});
    }
    else this.setState({loginMode: 'signup'});
  }

  emailLoginClicked(event) {
    event.preventDefault();
    if(this.state.loginMode === 'login') {
      this.setState({loginMode: 'main'});
    }
    else this.setState({loginMode: 'login'});
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { manualLogin, signUp } = this.props;

    if (this.state.loginMode === 'login' || this.state.loginMode === 'main') {
      manualLogin(this.state);
    } else {
      signUp(this.state);
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { user: { isWaiting, message, isLogin } } = this.props;

    if(this.state.loginMode === 'main') {
      return (
        <div
          className={cx('login', {
            waiting: isWaiting
          })}
        >
          <div className={cx('main-section')}>
            <h1 className={cx('title')}>메이커퍼즐 시작하기</h1>
            <Padding height="5" />
            <div className={cx('main-section-desc')}>
              전세계 도시의 엔딩크레딧에<br/>
              당신의 이름도 새겨보세요
            </div>
            <Padding height="30" />
            <div className={cx('menu-button', 'button-fb')} role="button" >
              <FlexibleImage source="/site/images/FB-icon.jpg" x={18} y={18} pureImage={true} />
              <Padding width="13" />
              페이스북으로 계속하기
            </div>
            <Padding height="9" />
            <div className={cx('menu-button')} role="button" onClick={e => window.location.href = '/auth/google'}>
              <FlexibleImage source="/site/images/G-icon.jpg" x={21} y={21} pureImage={true} />
              <Padding width="11" />
              구글 계정으로 계속하기
            </div>
            <Padding height="9" />
            <div className={cx('menu-button')} role="button" onClick={this.emailLoginClicked} >
              <FlexibleImage source="/site/images/ic_drafts_grey600_48dp.png" x={21} y={21} pureImage={true} />
              <Padding width="5" />
              이메일 계정으로 계속하기
            </div>
            <Padding height="40" />
          </div>
        </div>
      )
    }
    else if(this.state.loginMode === 'login') {
      return (
        <div
          className={cx('login', {
            waiting: isWaiting
          })}
        >
          <div className={cx('main-section')}>
            <div className={cx('top-button-area')}>
              <FlexibleImage 
                source="/site/images/ic_reply_grey600_48dp.png" 
                className={cx('button-back')}
                role="button"
                onClick={this.emailLoginClicked}
                x={39} y={39}
              />
            </div>

            <h1 className={cx('title')}>이메일로 로그인</h1>
            <Padding height="35" />

            <form onSubmit={this.handleOnSubmit} className={cx('form-area')}>
              <input
                className={cx('input')}
                type="email"
                name="email"
                onChange={this.handleInputChange}
                placeholder="이메일 주소"
              />
              <input
                className={cx('input')}
                type="password"
                name="password"
                onChange={this.handleInputChange}
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
                onClick={e => alert('비밀번호 찾기 기능 준비 중: 관리자에게 문의하세요')}
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
            <Padding height="25" />

            <div className={cx('form-area')}>
              <input
                className={cx('input')}
                type="email"
                name="email"
                onChange={this.handleInputChange}
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
                  name="name"
                  onChange={this.handleInputChange} 
                  placeholder="이름을 입력해주세요"
                />
              </div>
              <input
                className={cx('input')}
                type="password"
                name="password"
                onChange={this.handleInputChange}
                placeholder="비밀번호 입력"
              />
              <p className={cx('helper')}>
                영문, 숫자, 특수문자(!@#$%^&*+=.)를 조합한 8자 이상
              </p>
              <input
                className={cx('input')}
                type="password"
                name="passwordCheck"
                onChange={this.handleInputChange}
                placeholder="비밀번호 확인"
              />
            </div>

            <Padding height={'20'} />

            <SingleLine width="100%" color="#dbd8d8" thickness={1} />

            <Padding height={'15'} />

            <div className={cx('form-area')}>
              <h1 className={cx('second-title')}>추가 정보</h1>
              <p className={cx('helper', 'no-margin')}>
                입력된 정보는 외부에 노출되지 않고, <br/>
보다 나은 서비스 제공을 위한 통계자료로만 활용됩니다.
              </p>

              <Padding height={'20'} />

              <div className={cx('space-between')}>
                <label className={cx('label')}>성별</label>
                <div className={cx('gender')}>
                  <input className="gender" type="radio" value="M" name="gender" onChange={this.handleInputChange} />
                  <Padding width="12" inline={true} />
                  남자
                  <Padding width="22" inline={true} />
                  <input className="gender" type="radio" value="F" name="gender" onChange={this.handleInputChange} />
                  <Padding width="12" inline={true} />
                  여자
                </div>
              </div>

              <Padding height={'20'} />

              <div className={cx('space-between')}>
                <label className={cx('label')}>출생연도</label>
                <Select 
                  className={cx('year-select')}
                  onChange={this.yearSelected}
                  options={years}
                  placeholder="선택해 주세요" />
              </div>
            </div>

            <Padding height={'18'} />

            <SingleLine width="100%" color="#dbd8d8" thickness={1} />

            <Padding height={'25'} />

            <div className={cx('check')}>
              <input type="checkbox" name="agreed" onClick={this.handleInputChange} />
              <Padding width="15" inline={true} />
              <span onClick={ e => window.open('/policy/service')} role="button">
                <b className={cx('important')}>이용약관</b>
              </span>
              <Padding width="2" inline={true} />및<Padding width="2" inline={true} />
              <span onClick={ e=> window.open('/policy/privacy')} role="button">
                <b className={cx('important')}>개인정보 처리방침</b>
              </span>
              에 동의합니다.
            </div>
            <Padding height="12"/>
            <div className={cx('check')}>
              <input type="checkbox" name="marketingAgreed" onClick={this.handleInputChange} />
              <Padding width="15" inline={true} />
              [선택]마케팅 목적 이메일 수신 동의하기
            </div>
            <Padding height={'20'} />
            <div>
              <p
                className={cx('message', {
                'message-show': message && message.length > 0
              })}>{message}</p>
              <input
                className={cx('login-button')}
                type="button"
                value={'이메일로 회원가입'} 
                role="button"
                onClick={this.handleOnSubmit} />
            </div>

            <Padding height={'15'} />

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
export default connect(mapStateToProps, { manualLogin, signUp, clearMessage: dismissMessage })(LoginOrRegister);

