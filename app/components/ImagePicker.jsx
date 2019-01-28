import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import _ from 'lodash';

import FlexibleImage from '../components/FlexibleImage';
import ImageUploader from '../components/ImageUploader';

import styles from '../css/components/add-portfolio';

import UI from '../utils/ui'

const cx = classNames.bind(styles);

class ImagePicker extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.objects = {};
    this.removed = [];
    this.dragEnabled = false;
    this.showCloseButton = this.showCloseButton.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.getList = this.getList.bind(this);
    if(props.imageListRequest) {
      props.imageListRequest(this.getList); 
    }
  }

  changePhotoOrder(oldIndex, index) {
    // do nothing
  }

  activateDrag() {
    UI.activateDrag('#portfolio-images', '#portfolio-images > div.draggable', this.changePhotoOrder, cx('draggable-source--is-dragging'));
  }

  showCloseButton(i) {
    return () => {
      this.setState({imageHoverIndex: i})
    }
  }

  removeImage(img) {
    return (e) => {
      this.ref.removeChild(this.objects[img]);
      this.removed.push(img);
    }
  }

  findImageId(obj) {
    let found = null;
    _.forEach(this.objects, function(value, key) {
      if(obj === value) {
        found = key;
      }
    });
    return found;
  }

  getList() {
    // collect objects from ref
    const list = [];
    for(let i=0; i < this.ref.childElementCount; i++) {
      const child = this.ref.childNodes[i];
      if(child.childElementCount >0 && child.childNodes[0].localName === 'img') {
        list.push(child);
      }
    }

    // find their _ids
    return list.map(child => this.findImageId(child));
  }

  componentDidUpdate() {
    if(!this.dragEnabled) {
      this.activateDrag();
      this.dragEnabled = true;
    }
  }

  render() {
    return (
      <div className={cx('image-area')} id={'portfolio-images'} ref={el => this.ref = el}>
        {
          this.props.images.map((img, i) => (
            [<div 
              ref={el => this.objects[img._id || img] = el}
              className={cx('image-container') + ' draggable'} 
              onMouseEnter={this.showCloseButton(i)}
              onMouseLeave={this.showCloseButton(-1)}
              key={i}>

              <FlexibleImage                 
                source={img} pureImage={true} y={91} key={i} 
                className={cx('image-item', i === this.state.imageHoverIndex ? 'image-hover':'')}/>
              {(i === this.state.imageHoverIndex ? 
              <FlexibleImage 
                x={24.7} y={24.7}
                onMouseDown={this.removeImage(img._id || img)} 
                className={cx('image-remove-button')}
                source={'/images/site/ic_clear_white_48dp.png'} 
                role="button"
                key={i+'remove'} /> : null)}
            </div>, <div></div>]
          ))
        }
        <ImageUploader name="PortfolioImageUploader" callback={this.props.imageSelected} >
          <span className={cx('image-upload-button')}>
            <FlexibleImage source={'/site/images/upload-button.jpg'} x={117} y={92} />
          </span>
        </ImageUploader>                      
      </div>
    )
  }
}

ImagePicker.propTypes = {
};

function mapStateToProps(state) {
  return {
    image: state.image
  };
}

export default connect(mapStateToProps, {})(ImagePicker);
