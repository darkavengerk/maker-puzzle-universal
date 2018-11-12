import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import CompanyClaimUI from '../components/CompanyClaimUI';
import SingleLine from '../components/SingleLine';
import Popup from '../components/Popup';
import Padding from '../components/Padding';
import FlexibleImage from '../components/FlexibleImage';
import Assist from '../utils/assist'

import { addOwnCompany } from '../actions/makers';

import styles from '../css/components/company-claim';
const cx = classNames.bind(styles);

class CompanyClaim extends Component {

  constructor(props) {
    super(props);
    this.state = {showPopup: false};
    this.clicked = this.clicked.bind(this);
    this.submit = this.submit.bind(this);
    this.ignore = this.ignore.bind(this);
    this.cancel = this.cancel.bind(this);
    this.isOwned = this.isOwned.bind(this);
  }

  submit() {
    const { user, company, addOwnCompany } = this.props;
    if(user.userid) {
      addOwnCompany(user.userid, company.name, () => {
        alert('완료');
        this.setState({showPopup: false});
      });
    }
    else {
      alert('로그인이 필요합니다');
    }
  }

  clicked(evt) {
    evt.preventDefault();
    if(!this.state.showPopup) {
      this.setState({showPopup: true});
    }
  }

  cancel(evt) {
    evt.preventDefault();
    this.setState({showPopup: false});
  }

  ignore(evt) {
    evt.preventDefault();
  }

  isOwned() {
    const { company }  = this.props;
    return company.owners && company.owners.length > 0;
  }

  render() {

    return (
      <div className={cx('main-section')} onClick={this.ignore}>
        <div className={cx('main-button')} onClick={this.clicked}>
          {this.isOwned() ? '소유된 페이지' : '무료 기업페이지 소유하기'}
        </div>
        <Popup show={this.state.showPopup} name="ClaimPopup" cancel={this.cancel} roll={false} top={100}>
          <CompanyClaimUI cancel={this.cancel} submit={this.submit} isOwned={this.isOwned()} />
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
    user: state.user.account
  };
}

export default connect(mapStateToProps, { addOwnCompany })(CompanyClaim);
