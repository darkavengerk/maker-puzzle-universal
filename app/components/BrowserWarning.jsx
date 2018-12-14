import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';

import { detect } from 'detect-browser';

import { notifyBrowser } from '../actions/main';
import Popup from '../components/Popup';
import SingleLine from '../components/SingleLine';
import FlexibleImage from '../components/FlexibleImage';
import Padding from '../components/Padding';

import styles from '../css/components/browser-warning';

const cx = classNames.bind(styles);

class BrowserWarning extends Component {
  constructor(props) {
    super(props);
    this.showWarningPopup = this.showWarningPopup.bind(this);
    this.hideWarningPopup = this.hideWarningPopup.bind(this);
    this.state = {showPopup: false};
    // this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const { screen, notifyBrowser } = this.props;
    const browser = detect();
    notifyBrowser(browser);
    switch (browser && browser.name) {
    case 'chrome':
    case 'firefox':
    case 'safari':
      this.showWarningPopup();
      break;
    default:
      this.showWarningPopup();
    }
  }

  showWarningPopup() {
    this.setState({showPopup: true});
  }

  hideWarningPopup() {
    this.setState({showPopup: false});
  }

  render() {
    const address = 'https://www.google.com/chrome/';
    return (
      <Popup show={this.state.showPopup} name="BrowserWarningPopup" cancel={this.hideWarningPopup} roll={true} top={100}>
        <div className={cx('main-section')}>
          <Padding height="33" />        
          <div className={cx('title1')}>
            메이커퍼즐은
          </div>
          <div className={cx('title1')}>
            <FlexibleImage source="/site/images/icon-chrome.png" x={25} y={25} pureImage={true} />
            &nbsp; 구글 ‘크롬’ 브라우저에 최적화되어 있습니다.
          </div>
          <div className={cx('title1', 'title1-small')}>
            <FlexibleImage source="/site/images/icon-explorer.png" x={25} y={25} pureImage={true} />
            &nbsp; 인터넷 익스플로러에서는 <span className={cx('underline')}>잘 작동하지 않을 수도 있어요</span>.
          </div>
          <Padding height="15" />
          
          <SingleLine width="100%" color="#dbd8d8" thickness={3} />

          <Padding height="16" />
          <FlexibleImage source="/site/images/icon-chrome.png" x={52} y={52} pureImage={true} />
          <Padding height="10" />
          <div className={cx('title2')}>
            구글 크롬 이용방법
          </div>
          <Padding height="7" />
          <SingleLine width="1.22rem" color="#5d5d5d" thickness={3} />
          <Padding height="16" />
          <div className={cx('text')}>
            Chrome은 최신 웹에 최적화된 빠르고 안전한 무료 웹브라우저입니다
          </div>
          <div className={cx('text')}>
            <span className={cx('text-style-1')}>‘전세계 64.7% 이상’</span>이 이미 Chrome을 사용중이에요
          </div>
          <Padding height="12" />
          <div className={cx('text-box')}>
            <div className={cx('text', 'align-left')}>
              [방법 A] : 포털 검색창에 ‘크롬’ 검색 > 검색결과 선택 > 설치 (기본 브라우저로 설정)
            </div>
            <div className={cx('text', 'align-left')}>
              [방법 B] : <span className={cx('text-style-2')} role="button" onClick={e => window.open(address)}>{address}</span>
              &nbsp; 링크로 직접 이동 > 설치 (기본 브라우저로 설정)
            </div>
          </div>
        </div>
      </Popup>
    );

  }
}

BrowserWarning.propTypes = {
};

function mapStateToProps(state) {
  return {
    screen: state.screen
  };
}

export default connect(mapStateToProps, { notifyBrowser })(BrowserWarning);

