import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { browserHistory } from 'react-router';
import { create as createObject } from '../utils/objects'

import Image from '../components/FlexibleImage';
import SingleLine from '../components/SingleLine';
import Padding from '../components/Padding';
import DateFormat from '../components/DateFormat';
import Popup from '../components/Popup';
import AddPortfolio from '../components/AddPortfolio';

import { portfoiloEditorStart, portfoiloEditorCancel, portfoiloSubmit, deletePortfoilo } from '../actions/makers';
import { companyPortfoiloSubmit, deleteCompanyPortfoilo } from '../actions/companies';

import styles from '../css/components/portfolio-detail';


const cx = classNames.bind(styles);

const ContentsSection = (
  { portfolio, user, company, owner, edit=false, 
    portfoiloEditorStart, portfoiloEditorCancel, portfoiloSubmit, deletePortfoilo, 
    companyPortfoiloSubmit, deleteCompanyPortfoilo }
) => {
  const imgs = portfolio.images.map(img => (
    <div key={img._id || img} className={cx('image')} >
      <Image src={img} x={'100%'} pureImage={true}/>
    </div>)
  );

  if(!Array.isArray(owner)) {
    owner = [owner];
  }
  const ownerArea = owner.map(v => (
    <div className={cx('project-area')} key={v.getHomeLink()} >
      <Image src={v.getProfileImage()} x={33} y={33} />
      <span>
        <Link className={cx('project-name')} to={v.getHomeLink()}>{v.getName()}</Link>
      </span>
    </div>
  ));

  const tags = portfolio.tags.map(tag => (<label key={tag} className={cx('tag')}>{tag}</label>));

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
          <Padding width={'1.5rem'} />
          {edit? 
            <span className={cx('rectangle-1')} role="button" onClick={portfoiloEditorStart}>
              <Image src="/site/images/ic_pen.png" x={17} y={17} />
              <Padding width="0.5rem" />
              내용 수정
            </span>:null}
          
          <Padding width={'1rem'} />

          {edit? 
            <span className={cx('rectangle-1')} role="button" onClick={removePortfolioClicked}>
              <Image src="/site/images/ic_delete.png" x={17} y={17} />
              <Padding width="0.5rem" />
              게시물 삭제
            </span>:null}
        </div>
        <div>
          <div className={cx('create-date')} >등록 일자</div>
          <Padding width={'0.8rem'} inline={true} />
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
      <Popup show={user.account.isAddingPortfolio} name="AddPortfolioPopup" roll={true} top={100}>
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

ContentsSection.propTypes = {
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
    companyPortfoiloSubmit, deleteCompanyPortfoilo})(ContentsSection);
