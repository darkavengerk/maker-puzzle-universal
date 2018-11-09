import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import SingleLine from '../components/SingleLine';
import Popup from '../components/Popup';
import Assist from '../utils/assist'

import styles from '../css/components/company-claim';
const cx = classNames.bind(styles);

class CompanyClaim extends Component {

  constructor(props) {
    super(props);
    this.state = {showPopup: false};
    this.clicked = this.clicked.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  clicked(evt) {
    if(!this.state.showPopup) {
      evt.preventDefault();
      this.setState({showPopup: true});
    }
  }

  cancel(evt) {
    evt.preventDefault();
    this.setState({showPopup: false});
  }

  render() {
    return (
      <div className={cx('main-section')}>
        <div className={cx('main-button')} onClick={this.clicked}>
          무료 기업페이지 소유하기
        </div>
        <Popup show={this.state.showPopup} name="ClaimPopup" cancel={this.cancel} roll={false} top={100}>
          <div className={cx('popup-area')} >
            <div className={cx('popup-title')} >
              무료 기업페이지 이용방법
            </div>
            <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
          </div>
        </Popup>
      </div>
    );
  }
}

CompanyClaim.propTypes = {
  company: PropTypes.object
};

function mapStateToProps(state) {
  return {
    company: state.company.company,
    user: state.user
  };
}

export default connect(mapStateToProps, {})(CompanyClaim);
