import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import ContentEditable from 'react-contenteditable'

import Features from '../../components/Features';
import FlexibleImage from '../../components/FlexibleImage';
import ImageUploader from '../../components/ImageUploader';
import Assist from '../../utils/assist';

import FormItem from '../../components/web/FormItem';
import FormItemMedium from '../../components/web/FormItemMedium';

import { createTextLinks } from '../../utils/functions';

const Component = ({ featureEdited, aboutEdited, data, cx }) => {
  const user = data.get();
  // const features = data.accessArray('features');
  // const featuresMade = features.map(feature => {
  //   return <FormItemMedium height={'1.44rem'} label={feature.get('title')}>
  //     <Features 
  //       features={user.features || []}
  //       featureEdited={feature.access('title').attach()}
  //       classNames={{
  //         title: cx('feature-title'),
  //         content: cx('feature', 'editing'),
  //         row: cx('feature-item')
  //       }}
  //       editing={true}
  //     />
  //   </FormItemMedium>
  // });
  return (
    <div className={cx('info-main')}>
      <div className={cx('account-section-title')}>
        메이커 프로필
      </div>
      <section className={cx('account-section-form-area')}>
        <FormItemMedium height={'1.44rem'} label="프로필 사진">
          <div className={cx('account-section-profile-image')}>
            <FlexibleImage source={Assist.Maker.getProfileImage(user)} x={144} y={144} />
            <div style={{position:'absolute', bottom:'0.03rem', right:'0.04rem', 'zIndex':1}}>
              <ImageUploader name="ImageUploader" callback={data.access('picture').attach('callback')} >
                <FlexibleImage className={cx('image-upload-trigger')} source={"/site/images/camera-1.png"} x={34} y={34} />
              </ImageUploader>
            </div>
          </div>
        </FormItemMedium>
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
      </section>
    </div>
  );
};

Component.propTypes = {
};

export default Component;




