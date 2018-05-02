import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { logOut } from '../actions/users';
import Img from '../components/FlexibleImage';
import styles from '../css/components/navigation';

const cx = classNames.bind(styles);

const Navigation = ({}) => {
    return (
        <div className={cx('footer-area', 'flex-row')}>
          <div className={cx('eat')}>
            <Img src="/images/site/MAKER-PUZZLE-normal.png" x={232} y={47}/>
          </div>
          <div className={cx('flex-col', 'footer-title')} style={{marginRight:'2rem'}}>
            <label>서울 본사</label>
            <label>사업자등록증</label>
            <label>대표 이사</label>
            <label>고객 지원</label>
          </div>
          <div className={cx('flex-col', 'footer-feature')} style={{marginRight:'6rem'}}>
            <span>서울 강서구 마곡중앙6로 42 사이언스타 1002호</span>
            <span>786-16-00686</span>
            <span>남 대 근</span>
            <span className={cx('flex-row')}>
              help@maker-puzzle.com
              <label className={cx('footer-title')} style={{margin:'0 1rem 0 2rem'}}>TEL</label>
              02-2668-9505
            </span>
          </div>
          <div className={cx('flex-col', 'footer-feature', 'eat')}>
            <Link to="/">의견게시판</Link>
            <Link to="/">메이커퍼즐 NEWS</Link>
            <Link to="/">이용약관</Link>
            <Link to="/">개인정보 취급방침</Link>
          </div>
        </div>
    );
};

export default Navigation;
