import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import MakerProfile from '../components/MakerProfile';
import CompanyHistory from '../components/CompanyHistory';
import GreyTitle from '../components/GreyTitle';
import Abilities from '../components/Abilities';
import CompanyCard from '../components/CompanyCard';
import Padding from '../components/Padding';
import MakerListRoundy from '../components/MakerListRoundy';

import AutoComplete from '../components/AutoComplete';
import { Company } from '../services';

import { featureEditSave, updateContext, addOwnCompany } from '../actions/makers';
import { logOut } from '../actions/users';

import styles from '../css/components/maker-info';

const cx = classNames.bind(styles);

class MakerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.stateChanged = this.stateChanged.bind(this);
    this.submit = this.submit.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.edited = this.edited.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.featureEdited = this.featureEdited.bind(this);
    this.companyNameChanged = this.companyNameChanged.bind(this);
    this.addCompany = this.addCompany.bind(this);
  }

  stateChanged(newState) {
    const { updateContext } = this.props;
    updateContext(newState);
  }

  startEdit() {
    const maker = this.props.owner;
    this.stateChanged({editing:true});
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

  async submit() {
    const { featureEditSave } = this.props;
    const makerInfo = {...this.props.context};

    // save the buggy about section now.
    if(makerInfo.aboutEdited) {
      makerInfo.about = makerInfo.aboutEdited;
      this.stateChanged({ about: makerInfo.aboutEdited });
    }
    
    const res = await featureEditSave(makerInfo);
    if (res.status === 200) {
      this.stateChanged({editing: false});
    }
  }

  componentWillMount() {
    const { updateContext } = this.props;
    updateContext({});
  }

  companyNameChanged(name) {
    this.setState({companyName: name});
  }

  addCompany(evt) {
    const { context, addOwnCompany } = this.props;
    addOwnCompany(context.userid, this.state.companyName);
  }

  render() {
    const { context, user } = this.props;
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

        {(user.account.type === 'admin' || (context.companiesOwned && context.companiesOwned.length > 0))? 
          <GreyTitle title={'소유한 기업페이지'} top="38" bottom="7" />
          : null
        }
        {(context.companiesOwned && context.companiesOwned.length > 0)? 
          context.companiesOwned.map(c => <CompanyCard company={c} key={c.link_name} />)
          : null
        }
        { (user.account.type === 'admin')?
          <div className={cx('add-company')}>
            <AutoComplete
              request={Company().searchCompaniesByName}
              title="new-company-name"
              update={this.companyNameChanged}
              className={cx('company-name-input')}
              textLimit={50}
              text={this.state.companyName}
              top="4.2rem"
              width="30rem"
              placeholder="기업 이름 검색"
            /> 
            <input type="button" value="ADD" onClick={this.addCompany}/>
          </div>
          : null
        }
        

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
        <MakerListRoundy makers={context.followings} />
        <Padding height="2rem" />

      </div>
    ) : <div></div>;
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
  {featureEditSave, logOut, updateContext, addOwnCompany}
)(MakerInfo);