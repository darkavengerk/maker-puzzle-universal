import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Image from '../components/FlexibleImage';
import styles from '../css/components/portfolio-item';
import { portfoiloEditorStart } from '../actions/makers';

const cx = classNames.bind(styles);

const ContentsSection = ({ portfolio, maker, project, portfoiloEditorStart }) => {

  const user = portfolio.user;

  if(portfolio)
    return (
      <div className={cx('main-section')}>
          <div className={cx('text', 'text-section-type2')}>
            <Link to={`/maker/${user.userid}`}>
              <Image src={user.picture} x={31} y={31} className={cx('profile-image')} />
            </Link>
            <Link to={`/project/${project.link_name}/maker/${user.userid}/${portfolio.pid}`}>
              <span>
                <h1>
                  {portfolio.location}
                </h1>
                <p>
                  {portfolio.title}
                </p>
              </span>
            </Link>        
          </div>
          <Link to={`/project/${project.link_name}/maker/${user.userid}/${portfolio.pid}`}>
            <Image src={portfolio.images[0]} x={214} y={214}/>
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
  maker: PropTypes.object,
  project: PropTypes.object
};

function mapStateToProps(state) {
  return {
    maker: state.maker.maker,
    project: state.project.project
  };
}

export default connect(mapStateToProps, {portfoiloEditorStart})(ContentsSection);
