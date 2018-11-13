import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import _ from 'lodash';

import Switch from "../components/Switch";
import FlexibleImage from '../components/FlexibleImage';
import ImageUploader from '../components/ImageUploader';
import Scatter from '../components/Scatter';
import SingleLine from '../components/SingleLine';
import AutoComplete from '../components/AutoComplete';
import styles from '../css/components/add-portfolio';

import { productEditorCancel, productSubmit } from '../actions/companies';

import { Project, Company } from '../services';

const cx = classNames.bind(styles);

class AddProduct extends Component {

  constructor(props) {
    super(props);

    const { product={
      title: '',
      category: '',
      spec: '',
      companyName: '',
      company: {},
      images: [],
      isPrivate: false
    }, company={} } = this.props;

    if(company.name) {
      product.companyName = company.name;
    }

    this.state = {...product, projectSuggestion: [], showDropdown: false};

    this.switchChanged = this.switchChanged.bind(this);
    this.imageSelected = this.imageSelected.bind(this);
    this.showCloseButton = this.showCloseButton.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.onTextChage = this.onTextChage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.autoComplete = this.autoComplete.bind(this);
  }

  switchChanged(isPrivate) {
    this.setState({isPrivate});
  }

  imageSelected(err, img) {
    this.setState({images: [...this.state.images, img]});
  }

  showCloseButton(i) {
    return () => this.setState({imageHoverIndex: i})
  }

  removeImage(i) {
    return () => {
      let images = [...this.state.images];
      images.splice(i, 1)
      this.setState({images: images});
    }
  }

  onTextChage(key, lengthLimit=10) {
    return (evt) => {
      let newState = {};
      let length = 0;
      let text = '';

      for(let ch of evt.target.value) {
        length += (escape(ch).length > 4? 2 : 1);
        text += ch;

        if(length >= lengthLimit) break;
      }

      if(this.state[key] !== text) {
        newState[key] = text;
        this.setState(newState);
        return true;
      }
      else {
        return false;
      }

    }
  }

  onSubmit(evt) {
    const { productSubmit } = this.props;
    productSubmit(this.state);
  }

  autoComplete(key) {
    const state = {};
    return word => {
      state[key] = word;
      this.setState(state);
    }
  }

  render() {
    const { title, user, product, productEditorCancel } = this.props;

    return (
      <div className={cx('container')}>
        <div className={cx('main-section')}>
          <div className={cx('title')}>
            {title}
          </div>
          <div className={cx('details')}>
            
            <table className={cx('detail-table')}>
              <tbody>
                
                <tr className={cx('entity-row')}>
                  <td className={cx('entity-title')}>
                    <Scatter text="비밀설정" />
                  </td>
                  <td className={cx('entity')}>
                    <Switch 
                        onChange={this.switchChanged}
                        checked={this.state.isPrivate}
                        name="public-switch"
                      />
                  </td>
                </tr>
                <tr className={cx('entity-row')} />

                <tr>
                  <td className={cx('entity-title')}>
                    <Scatter text="제 품 명" />
                  </td>
                  <td className={cx('entity')}>
                    <input type="text" className={cx('text-field')} value={this.state.title} onChange={this.onTextChage('title', 20)} />
                  </td>
                </tr>
                <tr>
                  <td className={cx('entity-must')}>
                    [필수]
                  </td>
                  <td className={cx('entity-helper')}>
                    * 홍보할 제품 이름을 적어주세요
                  </td>
                </tr>
                <tr className={cx('entity-row')} />
                
                <tr>
                  <td className={cx('entity-title')}>
                    <Scatter text="제품 분류" />
                  </td>
                  <td className={cx('entity')}>
                    <input type="text" className={cx('text-field')} value={this.state.category} onChange={this.onTextChage('category', 20)} />
                  </td>
                </tr>
                <tr>
                  <td className={cx('entity-must')}>
                    [필수]
                  </td>
                  <td className={cx('entity-helper')}>
                    * 예시) 가죽 소파, 블라인드, 바닥 마감재, 다운라이트 등
                  </td>
                </tr>
                <tr className={cx('entity-row')} />

                <tr>
                  <td className={cx('entity-title')} style={{verticalAlign:'top'}}>
                    <span>
                      <Scatter text="상세 사양" />
                    </span>
                  </td>
                  <td className={cx('entity', 'area')}>
                    <textarea rows="4" cols="50" className={cx('text-area')} 
                      value={this.state.spec} onChange={this.onTextChage('spec', 1000)} />
                  </td>
                </tr>
                <tr>
                  <td className={cx('entity-must')}>
                  </td>
                  <td>
                    <span className={cx('entity-helper')}>
                      * 제품의 특장점 및 상세 사양을 적어주세요.
                    </span>
                  </td>
                </tr>
                <tr className={cx('entity-row')} />

                <tr>
                  <td className={cx('entity-title')} style={{verticalAlign:'top'}}>
                    <span>
                      <Scatter text="이미지 선택" />
                    </span>
                  </td>
                  <td>
                    <div className={cx('image-area')}>
                      {
                        this.state.images.map((img, i) => (
                          <div className={cx('image-container')} 
                            onMouseEnter={this.showCloseButton(i)}
                            onMouseLeave={this.showCloseButton(-1)}
                            key={i} >

                            <FlexibleImage 
                              source={img} pureImage={true} y={'9.1rem'} key={i} 
                              className={cx('image-item', i === this.state.imageHoverIndex ? 'image-hover':'')}/>
                            {(i === this.state.imageHoverIndex ? 
                            <FlexibleImage 
                              x={24.7} y={24.7}
                              onClick={this.removeImage(i)} 
                              className={cx('image-remove-button')}
                              source={'/images/site/ic_clear_white_48dp.png'} 
                              role="button"
                              key={i+'remove'} /> : null)}
                          </div>
                        ))
                      }
                      <ImageUploader name="productImageUploader" callback={this.imageSelected} >
                        <span className={cx('image-upload-button')}>
                          <FlexibleImage source={'/site/images/upload-button.jpg'} x={117} y={92} />
                        </span>
                      </ImageUploader>
                    </div>
                  </td>
                </tr>
                
                <tr className={cx('entity-row')} />

              </tbody>
            </table>
          </div>
        </div>
        <SingleLine width={'100%'} color={'#dddddd'} thickness={3} />
        <div className={cx("button-area")}>
          <span role="button" className={cx('button', 'cancel')} onClick={productEditorCancel} >취 소</span>
          <span role="button" className={cx('button', 'save')} onClick={this.onSubmit} >저장하기</span>
        </div>
      </div>
    );
  }
}

AddProduct.propTypes = {
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, {productEditorCancel, productSubmit})(AddProduct);
