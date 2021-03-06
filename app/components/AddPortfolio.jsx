import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { replace } from 'react-router-redux';
import _ from 'lodash';

import Switch from "../components/Switch";
import FlexibleImage from '../components/FlexibleImage';
import ImageUploader from '../components/ImageUploader';
import Scatter from '../components/Scatter';
import SingleLine from '../components/SingleLine';
import AutoComplete from '../components/AutoComplete';
import ImagePicker from '../components/ImagePicker';

import styles from '../css/components/add-portfolio';

import { Project, Company } from '../services';

const cx = classNames.bind(styles);

class AddPortfolio extends Component {

  constructor(props) {
    super(props);

    const portfolio= {...{
          tags: [],
          images: [],
          title: '',
          description: '',
          location: '',
          companyName: '',
          isPrivate: false,
        }, ...this.props.portfolio};

    this.state = {...portfolio, projectSuggestion: [], showDropdown: false};

    if(!this.state.companyName && this.props.company) {
      this.state.companyName = this.props.company.name;
    }

    this.images = portfolio.images;

    this.switchChanged = this.switchChanged.bind(this);
    this.addTagEntry = this.addTagEntry.bind(this);
    this.tagChanged = this.tagChanged.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.detectEnter = this.detectEnter.bind(this);
    this.imageSelected = this.imageSelected.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.onTextChage = this.onTextChage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.autoComplete = this.autoComplete.bind(this);
    this.imageListRequest = this.imageListRequest.bind(this);
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
    const images = [...this.state.images, img];
    this.setState({ images });
  }

  imageListRequest(fn) {
    this.imageListRequestFn = fn;
  }

  removeImage(i) {
    return () => {
      let images = [...this.state.images];
      images.splice(i, 1)
      this.setState({ images });
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

  async onSubmit(evt) {
    const { submit, portfolio, editing } = this.props;
    const images = this.imageListRequestFn? this.imageListRequestFn() : this.state.images;
    const submitData = {...this.state, images, editing};

    const checklist = ['companyName', 'location', 'title'];
    for(let check of checklist) {
      if(!submitData[check]) {
        alert('필수 항목을 입력해주세요');
        return;
      }
    }

    submitData.tags = submitData.tags.filter(t => t && t.trim().length > 0);
    
    if(editing) {
      submitData.companyChanged = submitData.companyName !== portfolio.companyName;
      submitData.locationChanged = submitData.location !== portfolio.location;
    }
    await submit(submitData);

    if(submitData.locationChanged) {
      const paths = this.props.pathname.split('/');
      if(paths.length > 1 && paths[1] === 'project') {
        const redirect = `/project/${submitData.location.replace(/ /g, '_')}/company/${submitData.companyName.replace(/ /g, '_')}/${submitData.pid}`;
        this.props.dispatch(replace(redirect));
      }
    }
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
                <tr className={cx('entity-row')} />
                {type === 'company'? null : 
                  <tr>
                    <td className={cx('entity-title')}>
                      <Scatter text="비밀설정" />
                    </td>
                    <td className={cx('entity')}>
                      <div className={cx('flex-row')}>
                        <Switch 
                          onChange={this.switchChanged}
                          checked={this.state.isPrivate}
                          name="public-switch"
                        />
                        <label className={cx('switch-message')}>* 비공개로 설정시 해당 포트폴리오는 본인만 확인 가능합니다</label>
                      </div>
                    </td>
                  </tr>
                }
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
                      textLimit={50}
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
                    <input type="text" className={cx('text-field')} value={this.state.title} onChange={this.onTextChage('title', 50)} />
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

              {(type || this.state.type) === 'company'? null : 
                <tr>
                  <td className={cx('entity-title')}>
                    <Scatter text="소속 기업" />
                  </td>
                  <td className={cx('entity')}>
                    <AutoComplete 
                      request={Company().searchCompaniesByName}
                      title="company-name"
                      update={this.autoComplete('companyName')}
                      text={this.state.companyName}
                      className={cx('text-field')}
                      textLimit={50}
                    />
                  </td>
                </tr>
              }

              {(type || this.state.type) === 'company'? null : 
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
                      value={this.state.description} onChange={this.onTextChage('description', 2000)} />
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
                                source={"/site/images/ic_highlight_remove_black_48dp.png"} 
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
                    <ImagePicker images={this.state.images} imageSelected={this.imageSelected} imageListRequest={this.imageListRequest}/>
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
    user: state.user,
    company: state.company.company,
    pathname: state.routing.locationBeforeTransitions.pathname
  };
}

export default connect(mapStateToProps)(AddPortfolio);
