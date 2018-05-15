import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Image from '../components/FlexibleImage';
import styles from '../css/components/portfolio-item';

const cx = classNames.bind(styles);

const ContentsSection = ({ portfolio, user, maker }) => {

  return (
    <div className={cx('main-section')}>
      <div className={cx('text-section')}>
        <Link to={`/maker/${maker.profile.userid}/portfolio/${portfolio.pid}`}>
          <h1>
            {portfolio.title}
          </h1>
        </Link>
        <p>
          {portfolio.descriptions}
        </p>
      </div>
      <Link to={`/maker/${maker.userid}/portfolio/${portfolio.pid}`}>
        { portfolio.images && portfolio.images[0] ? 
          <Image src={"/images/portfolio/"+portfolio.images[0]} x={214} y={214}/> : <Image x={214} y={214}/>
        }
      </Link>
      
    </div>
  );
};

ContentsSection.propTypes = {
  portfolio: PropTypes.object.isRequired,
  user: PropTypes.object,
  maker: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    maker: state.maker.maker
  };
}

export default connect(mapStateToProps, {})(ContentsSection);
