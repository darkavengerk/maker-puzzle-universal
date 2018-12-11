import React from 'react';
import PropTypes from 'prop-types';
import Link from '../components/Link';
import classNames from 'classnames/bind';
import Img from '../components/FlexibleImage';
import styles from '../css/components/navigation';

const cx = classNames.bind(styles);

const components = ({}) => {
    return (
        <div className={cx('footer-area')}>
          <div className={cx('menu-items')}>
            <Link className={cx('menu-item')} to="/">서비스 소개</Link>
            <Link className={cx('menu-item')} to="/policy/service">이용약관</Link>
            <Link className={cx('menu-item')} to="/policy/privacy">개인정보처리방침</Link>
            <Link className={cx('menu-item')} onClick={e => alert('준비중')}>의견게시판</Link>
            <Link className={cx('menu-item')} onClick={e => alert('준비중')}>메이커퍼즐 뉴스</Link>
          </div>
          <div className={cx('company-info')}>
            <label>주식회사 메이커퍼즐</label>|
            <label>대표이사 : 남대근, 조승연</label>|
            <label>서울특별시 강서구 마곡중앙6로 42, 1002호 (마곡동,사이언스타)</label>|
            <label>개인정보보호관리자 : 남대근</label>
          </div>
          <div className={cx('company-info')}>
            <label>사업자등록번호 : 403-88-01021</label>|
            <label>고객지원 : help@maker-puzzle.com</label>|
            <label>서비스문의 : 02-2668-9505</label>
          </div>
        </div>
    );
};

export default components;
