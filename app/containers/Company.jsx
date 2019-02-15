import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { portfoiloEditorCancel, portfoiloSubmit } from '../actions/makers';
import ImageUploader from '../components/ImageUploader';
import TopTitle from '../components/TopTitle';
import ContentsSection from '../components/ContentsSection';
import SingleLine from '../components/SingleLine';
import CompanyClaim from '../components/CompanyClaim';
import { Company } from '../utils/objects';
import { changePortfoiloOrder } from '../actions/companies';
import styles from '../css/components/maker';

import UI from '../utils/ui'
import Assist from '../utils/assist'

const cx = classNames.bind(styles);

class Container extends Component {

  isOwnPage() {
    const { company, user } = this.props;
    return Assist.Company.isOwnPage(company, user.account);
  }

  activateDrag() {
    if(this.isOwnPage()) {
      const { changePortfoiloOrder } = this.props;
      UI.activateDrag('#portfolio-list', '#portfolio-list > div.dragItem', changePortfoiloOrder, cx('draggable-source--is-dragging'));
    }
  }

  componentDidUpdate() {
    this.activateDrag();
  }

  componentDidMount() {
    this.activateDrag();
  }

  render() {
    const { company, user } = this.props;
    const assist = Assist.Company;
    return (
      <div>
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <TopTitle 
          title={assist.getName(company)}
          to={assist.getHomeLink(company)}
          thumbnailURL={company.profileImage? assist.getProfileImage(company) : null} 
        >
          { assist.getName(company) && <CompanyClaim /> }
        </TopTitle>
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <ContentsSection user={user} provider={assist} data={company} contentsType="company" isOwnPage={this.isOwnPage()} />
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
      </div>
    );
  }
}

Container.propTypes = {
  company: PropTypes.object
};

function mapStateToProps(state) {
  return {
    company: state.company.company,
    user: state.user
  };
}

export default connect(mapStateToProps, { changePortfoiloOrder })(Container);
