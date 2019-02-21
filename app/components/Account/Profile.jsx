import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import ContentEditable from 'react-contenteditable'

import Features from '../../components/Features';
import { createTextLinks } from '../../utils/functions';

const Component = ({ user, featureEdited, aboutEdited, cx }) => {

  return (
    <div className={cx('feature-area')}>
      <Features 
        features={user.features || []}
        featureEdited={featureEdited}
        classNames={{
          title: cx('feature-title'),
          content: cx('feature', 'editing'),
          row: cx('feature-item')
        }}
        editing={true}
      />
      <ContentEditable 
        className={cx('about-maker', 'editing')}
        html={user.about? createTextLinks(user.about) : ''} 
        tagName="pre"
        onKeyUp={aboutEdited}
        disabled={false}
        placeholder="간단한 자기 소개를 입력해주세요."
      />          
    </div>
  );
};

Component.propTypes = {
};

export default Component;




