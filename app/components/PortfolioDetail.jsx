import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { browserHistory } from 'react-router';

import { create as createObject } from '../utils/objects'
import Link from '../components/Link';
import Image from '../components/FlexibleImageLazy';
import SingleLine from '../components/SingleLine';
import Padding from '../components/Padding';
import DateFormat from '../components/DateFormat';
import Popup from '../components/Popup';
import AddPortfolio from '../components/AddPortfolio';
import IconPortfolioLocked from '../components/IconPortfolioLocked';

import { portfoiloEditorStart, portfoiloEditorCancel, portfoiloSubmit, deletePortfoilo } from '../actions/makers';
import { companyPortfoiloSubmit, deleteCompanyPortfoilo } from '../actions/companies';

import styles from '../css/components/portfolio-detail';


const cx = classNames.bind(styles);

const PortfolioDetainSection = (
  { portfolio, user, company, owner, edit=false, 
    portfoiloEditorStart, portfoiloEditorCancel, portfoiloSubmit, deletePortfoilo, 
    companyPortfoiloSubmit, deleteCompanyPortfoilo }
) => {
  const imgs = portfolio.images.map(img => (
    <div key={img._id || img} className={cx('image')} >
      <Image source={img} x={'100%'} pureImage={true}/>
    </div>)
  );

  if(!Array.isArray(owner)) {
    owner = [owner];
  }

  const ownerArea = owner.map(v => (
    <div className={cx('project-area')} key={v.getHomeLink()} >
      <Link to={v.getHomeLink()} count={v.getType()}>
        <Image source={v.getProfileImage()} x={33} y={33} contain={v.getType() === 'company'} />
      </Link>
      <Link to={v.getHomeLink()} count={v.getType()}>
        <label className={cx('project-name')} role="button">
          {v.getName()}
        </label>
      </Link>
    </div>
  ));

  function tagClicked(tag) {
    return evt => browserHistory.push('/search/' + tag);
  }

  const tags = portfolio.tags.map(tag => (
    <label key={tag} className={cx('tag')} onClick={tagClicked(tag)} role="button">
      {tag}
    </label>
  ));

  function submitPortfolio(portfolio) {
    if(portfolio.type === 'maker') {
      portfoiloSubmit(portfolio);
    }
    if(portfolio.type === 'company') {
      companyPortfoiloSubmit(portfolio);
    }
  }

  function removePortfolioClicked() {

    if(!confirm('Really?')) return;

    if(portfolio.type === 'maker') {
      deletePortfoilo(portfolio);
      browserHistory.replace('/maker/' + user.account.userid);
    }

    if(portfolio.type === 'company') {
      deleteCompanyPortfoilo(portfolio);
      browserHistory.replace('/company/' + company.link_name);
    }
  }

  return (
    <div className={cx('main-section')}>
      <div className={cx('title-area')}>
        <div className={cx('title-area2')}>
          <h1 className={cx('portfolio-title')}>
            {portfolio.title}
          </h1>
          <Padding width={'15'} />
          {edit? 
            [
              portfolio.isPrivate? <IconPortfolioLocked key={1} className={cx('locked')} x={20} y={25} />: null,
              <span key={2} className={cx('rectangle-1')} role="button" onClick={portfoiloEditorStart}>
                <Image source="/site/images/ic_pen.png" x={17} y={17} />
                <Padding width="5" />
                내용 수정
              </span>,
              <Padding key={3} width={'10'} />,
              <span key={4}  className={cx('rectangle-1')} role="button" onClick={removePortfolioClicked}>
                <Image source="/site/images/ic_delete.png" x={17} y={17} />
                <Padding width="5" />
                게시물 삭제
              </span>
            ]:null}
        </div>
        <div>
          <div className={cx('create-date')} >등록 일자</div>
          <Padding width={'8'} inline={true} />
          <DateFormat className={cx('create-date')} datestring={portfolio.created || portfolio.lastUpdated} />
        </div>
      </div>
      <SingleLine width='auto' color='#dadada' thickness={1} extend={20}/>
      <section className={cx('contents')}>
        {ownerArea}
        <p className={cx('description')}>
          {portfolio.description}
        </p>
        <div className={cx('tag-area')}>
          {tags}
        </div>
        <div className={cx('image-area')}>
          {imgs}
        </div>
      </section>
      <Popup show={user.attempt === 'edit:portfolio'} name="AddPortfolioPopup" roll={true} top={100}>
        <AddPortfolio
          portfolio={portfolio} 
          title="포트폴리오 수정하기" 
          editing={true}
          submit={submitPortfolio} 
          cancel={portfoiloEditorCancel} />
      </Popup>
    </div>
  );
};

PortfolioDetainSection.propTypes = {
  portfolio: PropTypes.object.isRequired,
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user,
    company: state.company.company
  };
}

export default connect(mapStateToProps, 
  {portfoiloEditorStart, portfoiloEditorCancel, portfoiloSubmit, deletePortfoilo, 
    companyPortfoiloSubmit, deleteCompanyPortfoilo})(PortfolioDetainSection);
