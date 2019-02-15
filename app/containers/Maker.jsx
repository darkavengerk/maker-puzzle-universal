import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import ImageUploader from '../components/ImageUploader';
import TopTitle from '../components/TopTitle';
import ContentsSection from '../components/ContentsSection';
import SingleLine from '../components/SingleLine';
import Padding from '../components/Padding';
import styles from '../css/components/maker';

// import { Maker } from '../utils/objects';
import Assist from '../utils/assist';
import { changePortfoiloOrder } from '../actions/makers';

import UI from '../utils/ui'

const cx = classNames.bind(styles);

class Container extends Component {

  constructor(props) {
    super(props);
  }

  isOwnPage() {
    const { maker, user } = this.props;
    return user.account && maker && ((maker.userid === user.account.userid) || user.account.type === 'admin');
  }

  activateDrag() {
    if(this.isOwnPage()) {
      const { changePortfoiloOrder } = this.props;
      UI.activateDrag('#portfolio-list', '#portfolio-list > div.dragItem', changePortfoiloOrder, cx('draggable-source--is-dragging'));
    }
  }

  componentDidUpdate() {
    this.activateDrag();
  }

  componentDidMount() {
    this.activateDrag();
  }

  render() {
    const { maker, user } = this.props;
    const assist = Assist.Maker;
    return (
      <div className={cx('main-section')}>
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <TopTitle 
          title={assist.getName(maker)}
          to={assist.getHomeLink(maker)}
          thumbnailURL={maker.picture? assist.getProfileImage(maker):null} 
        />
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        {
          maker && maker.makerProfile? 
          <ContentsSection user={user} provider={assist} data={maker} contentsType="maker" isOwnPage={this.isOwnPage()} /> : 
          <Padding height="600"/>
        }
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
      </div>
    );
  }
}

Container.propTypes = {
  maker: PropTypes.object
};

function mapStateToProps(state) {
  return {
    maker: state.maker.maker,
    user: state.user,
    param: state.param
  };
}

export default connect(mapStateToProps, { changePortfoiloOrder })(Container);
