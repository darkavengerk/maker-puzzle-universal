import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import Link from '../components/Link';
import Image from '../components/FlexibleImageLazy';
import styles from '../css/components/product-item';
import { productEditorStart } from '../actions/companies';

const cx = classNames.bind(styles);

const ProductItemSection = ({ product, company, productEditorStart }) => {

  if(product) {
    const companyLink = company.link_name || product.company.link_name;
    return (
      <div className={cx('main-section')}>
        {/*<Link to={`/company/${companyLink}/product/${product.pid}`}>*/}
          <div className={cx('text', 'text-section')}>
            <h1>
              {product.title}
            </h1>
            <p>
              {product.category}
            </p>
          </div>
          <Image source={product.images[0]} x={160} y={160}/>
        {/*</Link>        */}
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
            <Image source={"/site/images/add-button-1.png"} x={73} y={73} />
          </div>
        </div>
      </div>
    );
};

ProductItemSection.propTypes = {
  product: PropTypes.object,
  company: PropTypes.object
};

function mapStateToProps(state) {
  return {
    company: state.company.company
  };
}

export default connect(mapStateToProps, {productEditorStart})(ProductItemSection);
