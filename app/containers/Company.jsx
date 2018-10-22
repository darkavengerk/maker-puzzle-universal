import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { portfoiloEditorCancel, portfoiloSubmit } from '../actions/makers';
import ImageUploader from '../components/ImageUploader';
import TopTitle from '../components/TopTitle';
import ContentsSection from '../components/ContentsSection';
import SingleLine from '../components/SingleLine';
import styles from '../css/components/maker';
import { Company } from '../utils/objects';
import { changePortfoiloOrder } from '../actions/companies';

import UI from '../utils/ui'

const cx = classNames.bind(styles);

class Container extends Component {

  isOwnPage() {
    const { company, user } = this.props;
    return user.account && company && (user.account.type === 'admin' || (company.owner && company.owner.userid === user.account.userid));
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
    const { company: data, user } = this.props;
    const company = new Company(data);
    return (
      <div className={cx('main-section')}>
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <TopTitle 
          title={company.getName()}
          to={company.getHomeLink()}
          thumbnailURL={company.profileImage? company.getProfileImage():null} 
        />
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <ContentsSection user={user} owner={company} contentsType="company" isOwnPage={this.isOwnPage} />
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
