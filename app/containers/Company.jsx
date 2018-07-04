import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import ImageUploader from '../components/ImageUploader';
import TopTitle from '../components/TopTitle';
import ContentsSection from '../components/ContentsSection';
import SingleLine from '../components/SingleLine';
import styles from '../css/components/maker';

const cx = classNames.bind(styles);

class Company extends Component {

  render() {
    const { company, user } = this.props;
    const isOwnPage = user && company && (company.userid === user.userid);
    return (
      <div className={cx('main-section')}>
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <TopTitle 
          title={company.profile.name} 
          to={'/company/' + company.profile.link_name}
          thumbnailURL={company.profile? company.profile.picture : ''}
        />
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <ContentsSection owner={company} contentsType="company" isOwnPage={isOwnPage} />
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
      </div>
    );
  }
}

Company.propTypes = {
  company: PropTypes.object
};

function mapStateToProps(state) {
  return {
    company: state.company.company,
    user: state.user.account
  };
}

export default connect(mapStateToProps, {})(Company);
