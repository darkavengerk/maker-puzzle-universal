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

const cx = classNames.bind(styles);

class Container extends Component {

  render() {
    const { company: data, user } = this.props;
    const company = new Company(data);
    const isOwnPage = user && company && (user.type === 'admin' || (company.owner && company.owner.userid === user.userid));
    return (
      <div className={cx('main-section')}>
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <TopTitle 
          title={company.getName()}
          to={company.getHomeLink()}
          thumbnailURL={company.profileImage? company.getProfileImage():null} 
        />
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <ContentsSection owner={company} contentsType="company" isOwnPage={isOwnPage} />
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
    user: state.user.account
  };
}

export default connect(mapStateToProps, {})(Container);
