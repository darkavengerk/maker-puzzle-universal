import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Padding from '../../components/Padding';
import styles from '../../css/components/main-page-v2';

const cx = classNames.bind(styles);

const ProjectCardSection = ({ text, children }) => {
  return (
    <section className={cx('title-section')} >
      <div className={cx('title-line')} >
      </div>
      <div className={cx('title-text')} >
        { text }
      </div>
      <div className={cx('title-line')} >
      </div>
      <Padding height={18} />
      {children}
    </section>
  );
};

ProjectCardSection.propTypes = {
  text: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {})(ProjectCardSection);