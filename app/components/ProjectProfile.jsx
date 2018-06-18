import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import _ from 'lodash';

import FlexibleImage from '../components/FlexibleImage';
import Border from '../components/SingleLine';
import ImageUploader from '../components/ImageUploader';
import Features from '../components/Features';
import styles from '../css/components/maker-profile';

import { featureEditSave } from '../actions/makers';
import { logOut } from '../actions/users';

import jsxToString from 'jsx-to-string';

const cx = classNames.bind(styles);

class ProjectProfile extends Component {

  constructor(props) {
    super(props);

    const { project } = this.props;
    this.state = {...project};

    this.submit = this.submit.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.featureEdited = this.featureEdited.bind(this);
    this.profileImageEdited = this.profileImageEdited.bind(this);
  }

  startEdit() {
    this.setState({editing:true});
  }

  cancelEdit() {
    const { project } = this.props;
    const { features, profile } = project;
    this.setState({ features, profile, about, editing: false });
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
    this.setState(_.merge({}, this.state, {profile: {picture : img}}));
  };

  async submit() {
    const { featureEditSave } = this.props;
    const res = await featureEditSave(this.state);
    if (res.status === 200) {
      this.setState({editing: false});
    }
  }

  render() {
    const { maker, user, logOut } = this.props;
    const isOwnPage = user.account.profile && (user.account.profile.userid === maker.profile.userid);

    const profileImage = this.state.editing? this.state.profile.picture : maker.profile.picture;

    return (
      <div className={cx('main-section')}>
        <div className={cx('feature-area')}>
          <Features 
            features={this.state.features}
            featureEdited={this.featureEdited}
            classNames={{
              title: cx('feature-title'),
              content: cx('feature', this.state.editing? 'editing':''),
              row: cx('feature-item')
            }}
            editing={this.state.editing}
          />
          
        </div>
        
      </div>
    );
  }
}

ProjectProfile.propTypes = {
  maker: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  featureEditSave: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    maker: state.maker.maker,
    user: state.user
  };
}

export default connect(
  mapStateToProps, 
  {featureEditSave, logOut}
)(ProjectProfile);
