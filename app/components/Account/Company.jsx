import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import FlexibleImage from '../../components/FlexibleImage';
import Padding from '../../components/Padding';

import FormItem from '../../components/web/FormItem';
import FormItemMedium from '../../components/web/FormItemMedium';
import TextInputRound from '../../components/web/TextInputRound';
import FlexibleButton from '../../components/web/FlexibleButton';

import ImageUploader from '../../components/ImageUploader';
import Assist from '../../utils/assist';


class Companies extends Component {

  constructor(props) {
    super(props);
    this.state = {selected: 0};
  }

  render() {
    const { data, cx } = this.props;
    const companySelected = data.access(this.state.selected);
    const features = companySelected.access('features');
    return (
      <div className={cx('info-main')}>
        <div className={cx('account-section-title')}>
          소유한 기업페이지
        </div>
        <section className={cx('account-section-form-area')}>
          { 
            data.map(company => {
              const isSelected = companySelected === company;
              return  [<FlexibleButton
                            width={127}
                            height={35}
                            backgroundColor={isSelected? 'white': '#dadada'}
                            shadow={isSelected? 0.5: 0}
                            thickness={isSelected? '0.01rem' : 0}
                            radius={0}
                          >
                            {company.get('name')}
                          </FlexibleButton>, <Padding width={15}/>]
            })
          }
          <FormItemMedium height={'1.44rem'} label="프로필 사진">
            <div className={cx('account-section-profile-image')}>
              <FlexibleImage source={Assist.Company.getProfileImage(companySelected.get())} x={144} y={144} />
              <div style={{position:'absolute', bottom:'0.03rem', right:'0.04rem', 'zIndex':1}}>
                <ImageUploader name="ImageUploader" callback={data.access('picture').attach('callback')} >
                  <FlexibleImage className={cx('image-upload-trigger')} source={"/site/images/camera-1.png"} x={34} y={34} />
                </ImageUploader>
              </div>
            </div>
          </FormItemMedium>
          <FormItem label="기업명">
            <TextInputRound 
              width="4.58rem"
              placeholder={companySelected.get('name')} 
              data={companySelected.access('content')}
            />
          </FormItem>
          { 
            features.map((feature, i) => 
              <FormItem key={i} label={feature.get('title')}>
                <TextInputRound 
                  width="4.58rem"
                  placeholder={feature.get('placeholder')} 
                  data={feature.access('content')}
                />
              </FormItem>
            )
          }
        </section>
      </div>
    );
  }
}

Companies.propTypes = {
};

export default Companies;


