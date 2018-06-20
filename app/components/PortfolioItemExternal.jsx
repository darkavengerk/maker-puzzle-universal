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

  const user = portfolio.user;

  if(portfolio)
    return (
      <div className={cx('main-section')}>
        <div className={cx('text-section-type2')}>
          <Link to={`/maker/${user.userid}`}>
            <Image src={user.profile.picture} x={31} y={31} className={cx('profile-image')} />
          </Link>
          <span>
            <Link to={`/maker/${user.userid}/portfolio/${portfolio.pid}`}>
              <h1>
                {portfolio.title}
              </h1>
            </Link>
            <p>
              {portfolio.location}
            </p>
          </span>
        </div>
        <Link to={`/maker/${user.userid}/portfolio/${portfolio.pid}`}>
          { portfolio.images && portfolio.images[0] ? 
            <Image src={`${portfolio.images[0]}`} x={214} y={214}/> : <Image x={214} y={214}/>
          }
        </Link>
        
      </div>
    );
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
