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
    const { user, onChange } = this.props;
    const { pw, pwCheck } = this.state;
    user && user.userid && await authService().changePassword({id: user.userid, password: pw});
    onChange();
  }

  render() {
    const { cx } = this.props;
    return (
      <div className={cx('password-main')}>
        <FormItem label="새 패스워드">
          <TextInputRound 
            width="4.58rem" 
            password
            data={this.data.access('pw')}
          />
        </FormItem>
        <FormItem label="패스워드 확인">
          <TextInputRound 
            width="4.58rem" 
            password
            data={this.data.access('pwCheck')}
          />
        </FormItem>
        <FlexibleButton
            value="비밀번호 변경"
            width="1rem"
            height="0.3rem"
            backgroundColor="#b1b1b1"
            onClick={this.submitPassword}
            className={cx('password-button')} />
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


