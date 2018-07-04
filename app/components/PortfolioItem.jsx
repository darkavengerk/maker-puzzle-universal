import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Image from '../components/FlexibleImage';
import styles from '../css/components/portfolio-item';
import { portfoiloEditorStart } from '../actions/makers';

const cx = classNames.bind(styles);

const ContentsSection = ({ portfolio, maker, portfoiloEditorStart }) => {

  if(portfolio) {
    const ownerId = maker.userid || portfolio.user.userid;
    return (
      <div className={cx('main-section')}>
        <div className={cx('text-section')}>
          <Link to={`/maker/${ownerId}/portfolio/${portfolio.pid}`}>
            <h1>
              {portfolio.title}
            </h1>
          </Link>
          <Link to={`/project/${portfolio.location.replace(/\s/g, '_')}`}>
            <p>
              {portfolio.location}
            </p>
          </Link>
        </div>
        <Link to={`/maker/${ownerId}/portfolio/${portfolio.pid}`}>
          { portfolio.images && portfolio.images[0] ? 
            <Image src={`${portfolio.images[0]}`} x={214} y={214}/> : <Image x={214} y={214}/>
          }
        </Link>
        
      </div>
    );
  }
  else 
    return (
      <div className={cx('main-section')}>
        <div className={cx('add-portfolio')}>
          <div className={cx('add-portfolio-title')}>
            내 포트폴리오
          </div>
          <div className={cx('add-portfolio-title')}>
            추가하기        
          </div>
          <div className={cx('add-portfolio-icon')} role="button" onClick={portfoiloEditorStart}>
            +
          </div>
        </div>
      </div>
    );
};

ContentsSection.propTypes = {
  portfolio: PropTypes.object,
  maker: PropTypes.object
};

function mapStateToProps(state) {
  return {
    maker: state.maker.maker
  };
}

export default connect(mapStateToProps, {portfoiloEditorStart})(ContentsSection);
