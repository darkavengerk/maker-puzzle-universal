import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Image from '../components/FlexibleImage';
import styles from '../css/components/product-item';
import { productEditorStart } from '../actions/makers';

const cx = classNames.bind(styles);

const ContentsSection = ({ product, company, productEditorStart }) => {

  if(product) {
    const companyLink = company.link_name || product.company.link_name;
    return (
      <div className={cx('main-section')}>
        <Link to={`/company/${companyLink}/product/${product.pid}`}>
          <div className={cx('text', 'text-section')}>
            <h1>
              {product.title}
            </h1>
            <p>
              {product.category}
            </p>
          </div>
          <Image src={`${product.images[0]}`} x={160} y={160}/>
        </Link>        
      </div>
    );
  }
  else 
    return (
      <div className={cx('main-section')}>
        <div className={cx('add-product')}>
          <div className={cx('add-product-title')}>
            보유 제품
          </div>
          <div className={cx('add-product-title')}>
            추가하기
          </div>
          <div className={cx('add-product-icon')} role="button" onClick={productEditorStart}>
            +
          </div>
        </div>
      </div>
    );
};

ContentsSection.propTypes = {
  product: PropTypes.object,
  company: PropTypes.object
};

function mapStateToProps(state) {
  return {
    company: state.company.company
  };
}

export default connect(mapStateToProps, {productEditorStart})(ContentsSection);
