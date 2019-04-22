import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import ContentEditable from 'react-contenteditable'

import FormItem from '../../components/web/FormItem';
import FlexibleButton from '../../components/web/FlexibleButton';
import Padding from '../../components/Padding';
import TextInputRound from '../../components/web/TextInputRound';

import { DataBinder } from '../../utils/DataBinder';
import { authService } from '../../services';


class Password extends Component {

  constructor(props) {
    super(props);
    this.state = {pw:'', pwCheck:''};
    this.data = new DataBinder(this.state, {component: this});
    this.submitPassword = this.submitPassword.bind(this);
  }

  async submitPassword() {
    let { user, userid, onChange, hash } = this.props;
    user = user.userid || userid;
    const { pw, pwCheck } = this.state;
    if(pw && pw === pwCheck) {
      const result = user && await authService().changePassword({
        id: user.userid || user, 
        password: pw,
        hash
      });
      alert('처리 결과: ', result);
      onChange && onChange();
    }
    else {
      alert('유효하지 않습니다');
    }
  }

  render() {
    const { cx, cancel } = this.props;
    return (
      <div className={cx('password-main')}>
        <Padding height={22}/>
        <TextInputRound
          width={310}
          height={36}
          data={this.data.access('pw')}
          placeholder="새 비밀번호"
          borderColor="#919191"
          radius="0.08rem"
          password
        />
        <Padding height={9}/>
        <TextInputRound
          width={310}
          height={36}
          data={this.data.access('pwCheck')}
          placeholder="다시 입력"
          borderColor="#919191"
          radius="0.08rem"
          password
        />
        <Padding height={16}/>
        <FlexibleButton
          borderColor="#b3b3b3"
          width="1.45rem"
          height="0.36rem"
          backgroundColor="#b3b3b3"
          onClick={cancel}
          className={cx('password-button')}>
          취
          <Padding width={15}/>
          소
        </FlexibleButton>
        <Padding width={22} />
        <FlexibleButton
          borderColor="#f46e1f"
          width="1.45rem"
          height="0.36rem"
          backgroundColor="#f46e1f"
          onClick={this.submitPassword}
          className={cx('password-button')}>
          확
          <Padding width={15}/>
          인
        </FlexibleButton>
      </div>
    );
  }
}

Password.propTypes = {
};

function mapStateToProps(state) {
  return {
    user: state.user.account
  };
}

export default connect(mapStateToProps, {})(Password);


