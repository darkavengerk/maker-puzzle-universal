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

import { Project, Company } from '../services';

const cx = classNames.bind(styles);

class AddPortfolio extends Component {

  constructor(props) {
    super(props);

    const { portfolio={
      tags: [],
      images: [],
      title: '',
      description: '',
      location: '',
      companyName: '',
      isPrivate: false,
    } } = this.props;
    this.state = {...portfolio, projectSuggestion: [], showDropdown: false};

    this.switchChanged = this.switchChanged.bind(this);
    this.addTagEntry = this.addTagEntry.bind(this);
    this.tagChanged = this.tagChanged.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.detectEnter = this.detectEnter.bind(this);
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

  addTagEntry() {
    if(this.state.tags.length < 7)
      this.setState({newTag: true});
  }

  tagChanged(evt) {
    const target = document.getElementsByClassName(cx("tag-field"));
    this.setState({tags: _.map(target, e => e.value), newTag:false});
  }

  removeTag(ix) {
    return evt => {
      let tags = [...this.state.tags]
      tags.splice(ix, 1);
      this.setState({tags: tags});
    }
  }

  detectEnter(evt) {
    if(evt.key === "Enter" || evt.key === "Tab") {
      evt.preventDefault();
      evt.target.blur();
      evt.target.value = '';
      this.addTagEntry();
    }
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
    const { submit, portfolio, editing } = this.props;
    const submitData = {...this.state, editing};
    if(editing) {
      submitData.companyChanged = submitData.companyName !== portfolio.companyName;
      submitData.locationChanged = submitData.location !== portfolio.location;
    }
    submit(submitData);
  }

  autoComplete(key) {
    const state = {};
    return word => {
      state[key] = word;
      this.setState(state);
    }
  }

  componentDidUpdate(){
    if(this.newTag) 
      this.newTag.focus();
  }

  render() {
    const { title, user, portfolio, cancel, type } = this.props;

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
                    <Scatter text="현장명" />
                  </td>
                  <td className={cx('entity', 'relative')}>
                    <AutoComplete 
                      request={Project().searchProjectsByName}
                      title="project-name"
                      update={this.autoComplete('location')}
                      text={this.state.location}
                      className={cx('text-field')}
                      textLimit={20}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={cx('entity-must')}>
                    [필수]
                  </td>
                  <td className={cx('entity-helper')}>
                    * 예시) 여의도국제금융센터, 롯데월드몰, 경회루 등
                  </td>
                </tr>
                <tr className={cx('entity-row')} />                
                
                <tr>
                  <td className={cx('entity-title')}>
                    <Scatter text="제목" />
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
                    * 예시) 커튼월 구조 계산, 로비 인테리어 디자인, 외벽 경관조명 설치 등
                  </td>
                </tr>
                <tr className={cx('entity-row')} />

              {type==='company'? null : 
                <tr>
                  <td className={cx('entity-title')}>
                    <Scatter text="소속 기업" />
                  </td>
                  <td className={cx('entity', 'relative')}>
                    <AutoComplete 
                      request={Company().searchCompaniesByName}
                      title="company-name"
                      update={this.autoComplete('companyName')}
                      text={this.state.companyName}
                      className={cx('text-field')}
                      textLimit={20}
                    />
                  </td>
                </tr>
              }

              {type==='company'? null : 
                <tr>
                  <td className={cx('entity-must')}>
                    [필수]
                  </td>
                  <td className={cx('entity-helper')}>
                    * 포트폴리오를 수행했을 당시 소속되어 있던 기업을 선택해주세요
                  </td>
                </tr>
              }
                <tr className={cx('entity-row')} />


                <tr>
                  <td className={cx('entity-title')} style={{verticalAlign:'top'}}>
                    <span>
                      <Scatter text="작품설명" />
                    </span>
                  </td>
                  <td className={cx('entity', 'area')}>
                    <textarea rows="4" cols="50" className={cx('text-area')} 
                      value={this.state.description} onChange={this.onTextChage('description', 1000)} />
                  </td>
                </tr>
                <tr>
                  <td className={cx('entity-must')}>
                  </td>
                  <td>
                    <span className={cx('entity-helper')}>
                      * 수행한 포트폴리오의 상세 설명을 적어주세요
                    </span>
                  </td>
                </tr>
                <tr className={cx('entity-row')} />

                <tr>
                  <td className={cx('entity-title')} style={{verticalAlign:'top'}}>
                    <span>
                      <Scatter text="태그추가" />
                    </span>
                  </td>
                  <td className={cx('tags')}>
                      {
                        this.state.tags.map(
                          (tag, i) => 
                            (<span style={{position:'relative'}} key={i}>
                              <input 
                                type="text" 
                                className={cx('tag-field')} 
                                value={tag}
                                name={tag}
                                onChange={this.tagChanged}
                                onKeyPress={this.detectEnter}
                              />
                              <FlexibleImage 
                                src={"/site/images/ic_highlight_remove_black_48dp.png"} 
                                x={17} y={17} 
                                className={cx('tag-delete')}
                                role="button"
                                pureImage={true}
                                onClick={this.removeTag(i)}
                              />
                            </span>)
                        )
                      }
                      { 
                        this.state.newTag? 
                          <input 
                            type="text" 
                            className={cx('tag-field')} 
                            ref={(input) => { this.newTag = input; }} 
                            onBlur={this.tagChanged}
                            onKeyDown={this.detectEnter}
                            name="new" 
                          /> : (this.state.tags.length >= 8 ? null :
                                                  <label className={cx('add-tag')} onClick={this.addTagEntry} role="button">
                                                    + 태그 추가하기
                                                  </label>)
                      }
                  </td>
                </tr>
                <tr>
                  <td className={cx('entity-must')}>
                  </td>
                  <td>
                    <span className={cx('entity-helper')}>
                      * 추가하신 태그들은 키워드 검색시 반영되며, 당신의 작품을 더 많이 알릴 수 있게 도와줍니다
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
                              src={img} pureImage={true} y={'9.1rem'} key={i} 
                              className={cx('image-item', i === this.state.imageHoverIndex ? 'image-hover':'')}/>
                              {(i === this.state.imageHoverIndex ? 
                              <FlexibleImage 
                                x={24.7} y={24.7}
                                onClick={this.removeImage(i)} 
                                className={cx('image-remove-button')}
                                src={'/images/site/ic_clear_white_48dp.png'} 
                                role="button"
                                key={i+'remove'} /> : null)}
                          </div>
                        ))
                      }
                      <ImageUploader name="PortfolioImageUploader" callback={this.imageSelected} >
                        <span className={cx('image-upload-button')}>
                          <FlexibleImage src={'/site/images/upload-button.jpg'} x={117} y={92} />
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
          <span role="button" className={cx('button', 'cancel')} onClick={cancel} >취 소</span>
          <span role="button" className={cx('button', 'save')} onClick={this.onSubmit} >저장하기</span>
        </div>
      </div>
    );
  }
}

AddPortfolio.propTypes = {
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(AddPortfolio);
