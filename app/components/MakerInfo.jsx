import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import MakerProfile from '../components/MakerProfile';
import CompanyHistory from '../components/CompanyHistory';
import GreyTitle from '../components/GreyTitle';
import Abilities from '../components/Abilities';

import { featureEditSave, updateContext } from '../actions/makers';
import { logOut } from '../actions/users';

import styles from '../css/components/maker-info';

const cx = classNames.bind(styles);

class MakerInfo extends Component {
  constructor(props) {
    super(props);

    this.stateChanged = this.stateChanged.bind(this);
    this.submit = this.submit.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.edited = this.edited.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.featureEdited = this.featureEdited.bind(this);
    this.aboutEdited = this.aboutEdited.bind(this);
    this.profileImageEdited = this.profileImageEdited.bind(this);
  }

  stateChanged(newState) {
    const { updateContext } = this.props;
    this.setState(newState);
    updateContext(newState);
  }

  startEdit() {
    const maker = this.props.owner;
    this.stateChanged({editing:true, picture: maker.getProfileImage()});
  }

  edited(states, entry) {
    if(entry) {
      const { context } = this.props;
      const subState = {...context[entry], ...states};
      this.stateChanged({[entry]: subState});
    }
    else this.stateChanged(states);
  }

  cancelEdit() {
    const maker = this.props.owner;
    this.stateChanged({ ...maker, editing: false });
  }

  featureEdited(key, text) {
    const target = this.props.context;    
    const features = target.features.map(feature => {
      if(feature.title === key) {
        return {...feature, content:text}
      }
      return feature;
    });
    this.stateChanged({ features });
  }

  aboutEdited(evt) {
    const about = evt.target.innerText;
    this.stateChanged({ about });
  }

  profileImageEdited(err, img) {
    this.stateChanged({picture : img});
  };

  async submit() {
    const { featureEditSave, owner: maker } = this.props;
    const res = await featureEditSave({...this.props.context});
    if (res.status === 200) {
      this.stateChanged({editing: false});
    }
  }

  render() {
    const { context } = this.props;
    return (context && context.makerProfile) ? (
      <div className={cx('main-section')}>
        <GreyTitle title={'메이커 프로필'} bottom="13" />
        <MakerProfile 
          maker={context}
          startEdit={this.startEdit} 
          cancelEdit={this.cancelEdit} 
          editing={context.editing}
          onChange={this.edited}
          onSubmit={this.submit}
        />

        <GreyTitle title={'소속 기업'} top="38" />
        <CompanyHistory 
          id="company-history" 
          maker={context} 
          editing={context.editing}
          onChange={this.edited}
        />

        <GreyTitle title={'능력치'} top="33" bottom="27" />
        <Abilities 
          maker={context} 
          editing={context.editing}
          onChange={this.edited}
        />

        <GreyTitle title={'관련된 메이커'} top="24" bottom="26" />

      </div>
    ) : <div>Nothing</div>;
  }
}

MakerInfo.propTypes = {
  owner: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    context: state.maker.context
  };
}

export default connect(
  mapStateToProps, 
  {featureEditSave, logOut, updateContext}
)(MakerInfo);