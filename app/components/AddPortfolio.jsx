import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import _ from 'lodash';

import Switch from "../components/Switch";
import FlexibleImage from '../components/FlexibleImage';
import ImageUploader from '../components/ImageUploader';
import Scatter from '../components/Scatter';
import styles from '../css/components/add-portfolio';

import { featureEditSave } from '../actions/makers';

const cx = classNames.bind(styles);

class AddPortfolio extends Component {

  constructor(props) {
    super(props);

    const { portfolio={
      tags: [],
      images: []
    } } = this.props;
    this.state = {...portfolio};

    this.startEdit = this.startEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.switchChanged = this.switchChanged.bind(this);
    this.addTagEntry = this.addTagEntry.bind(this);
    this.tagChanged = this.tagChanged.bind(this);
  }

  startEdit() {
  }

  cancelEdit() {
  }

  switchChanged(isPublic) {
    this.setState({isPublic});
  }

  addTagEntry() {
    this.setState({tags: [...this.state.tags, '']});
  }

  tagChanged(evt) {
    const target = evt.target;
    this.setState({tags: _.map(target.parentNode.childNodes, e => e.value)});
  }

  render() {
    const { title, maker, user, portfolio } = this.props;

    return (
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
                      checked={this.state.isPublic || false}
                      name="public-switch"
                    />
                </td>
              </tr>
              <tr className={cx('entity-row')} />

              <tr>
                <td className={cx('entity-title')}>
                  <Scatter text="현장명" />
                </td>
                <td className={cx('entity')}>
                  <input type="text" className={cx('text-field')} />
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
                  <input type="text" className={cx('text-field')} />
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

              <tr>
                <td className={cx('entity-title')} style={{verticalAlign:'top'}}>
                  <span>
                    <Scatter text="작품설명" />
                  </span>
                </td>
                <td className={cx('entity', 'area')}>
                  <textarea rows="4" cols="50" className={cx('text-area')} />
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
                  <span>
                    {
                      this.state.tags.map(
                        (tag, i) => 
                          <input 
                            type="text" 
                            className={cx('tag-field')} 
                            value={tag}
                            name={tag}
                            onChange={this.tagChanged} 
                            key={i} 
                          />
                      )
                    }
                  </span>
                  <label className={cx('add-tag')} onClick={this.addTagEntry}>
                    + 태그 추가하기
                  </label>
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

            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

AddPortfolio.propTypes = {
  maker: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    maker: state.maker.maker,
    user: state.user
  };
}

export default connect(
  mapStateToProps, 
  {}
)(AddPortfolio);
