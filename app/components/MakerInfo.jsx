import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import MakerProfile from '../components/MakerProfile';
import CompanyHistory from '../components/CompanyHistory';
import GreyTitle from '../components/GreyTitle';
import Abilities from '../components/Abilities';

import { featureEditSave } from '../actions/makers';
import { logOut } from '../actions/users';

import styles from '../css/components/maker-info';

const cx = classNames.bind(styles);

class MakerInfo extends Component {
  constructor(props) {
    super(props);

    const { owner } = this.props;
    this.maker = owner;
    this.state = {...this.maker};

    this.submit = this.submit.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.edited = this.edited.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.featureEdited = this.featureEdited.bind(this);
    this.aboutEdited = this.aboutEdited.bind(this);
    this.profileImageEdited = this.profileImageEdited.bind(this);
  }

  startEdit() {
    this.setState({editing:true, picture: this.maker.getProfileImage()});
  }

  edited(states, entry) {
    if(entry) {
      const subState = {...this.state[entry], ...states};
      this.setState({[entry]: subState});
    }
    else this.setState(states);
  }

  cancelEdit() {
    this.setState({ ...this.maker, editing: false });
  }

  featureEdited(key, text) {
    const target = this.state;    
    const features = target.features.map(feature => {
      if(feature.title === key) {
        return {...feature, content:text}
      }
      return feature;
    });
    this.setState({ features });
  }

  aboutEdited(evt) {
    const about = evt.target.innerText;
    this.setState({ about });
  }

  profileImageEdited(err, img) {
    this.setState({picture : img});
  };

  async submit() {
    const { featureEditSave } = this.props;
    const res = await featureEditSave(this.state);
    if (res.status === 200) {
      this.setState({editing: false});
    }
  }

  render() {
    return this.maker && this.maker.makerProfile ? (
      <div className={cx('main-section')}>
        <GreyTitle title={'메이커 프로필'} bottom="13" />
        <MakerProfile 
          maker={this.state} 
          startEdit={this.startEdit} 
          cancelEdit={this.cancelEdit} 
          editing={this.state.editing}
          onChange={this.edited}
          onSubmit={this.submit}
        />

        <GreyTitle title={'소속 기업'} top="38" />
        <CompanyHistory 
          id="company-history" 
          maker={this.state} 
          editing={this.state.editing}
          onChange={this.edited}
        />

        <GreyTitle title={'능력치'} top="33" bottom="27" />
        <Abilities abilities={this.state.makerProfile.abilities} />

        <GreyTitle title={'관련된 메이커'} top="24" bottom="26" />

      </div>
    ) : <div></div>;
  }
}

MakerInfo.propTypes = {
  owner: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps, 
  {featureEditSave, logOut}
)(MakerInfo);