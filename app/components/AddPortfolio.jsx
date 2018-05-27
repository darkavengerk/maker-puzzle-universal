import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Switch from "react-switch";
import _ from 'lodash';

import FlexibleImage from '../components/FlexibleImage';
import ImageUploader from '../components/ImageUploader';
import Scatter from '../components/Scatter';
import Slider from '../components/Slider';
import styles from '../css/components/add-portfolio';

import { featureEditSave } from '../actions/makers';

const cx = classNames.bind(styles);

class AddPortfolio extends Component {

  constructor(props) {
    super(props);

    const { maker } = this.props;
    this.state = {...maker};

    this.startEdit = this.startEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.switchChanged = this.switchChanged.bind(this);
  }

  startEdit() {
  }

  cancelEdit() {
  }

  switchChanged(isPublic) {
    this.setState({isPublic});
  }

  render() {
    const { title, maker, user } = this.props;

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
                      checked={this.state.isPublic}
                      id="normal-switch"
                      onColor="#ee5400"
                      uncheckedIcon={false}
                      checkedIcon={false}
                      width={56}
                      handleDiameter={25}
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
                <td className={cx('entity-title')}>
                  <Scatter text="작품설명" />
                </td>
                <td className={cx('entity', 'area')}>
                  <textarea rows="4" cols="50" className={cx('text-area')} />
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
