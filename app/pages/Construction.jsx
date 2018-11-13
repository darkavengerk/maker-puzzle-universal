import React, { Component } from 'react';
import Page from '../pages/Page';
import styles from '../css/components/construction';
import classNames from 'classnames/bind';
import Image from '../components/FlexibleImage';

const cx = classNames.bind(styles);

class Construction extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Construction | MakerPuzzle';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Construction page' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <div className={cx('main-section')}>
          <Image className={cx('logo')} source={'/site/images/로고-화이트.png'} x={216} y={45} pureImage={true}/>
          <h1 className={cx('COMING-SOON')} >COMING SOON</h1>
          <div className={cx('line')}></div>
          <p className={cx('WHODIDTHIS')} >“여긴 누가 했지?”</p>
          <p className={cx('DESC')} >도시 속 인상적인 공간을 만들어낸 메이커들이 모여있는</p>
          <p className={cx('DESC')} >건축인들을 위한 소셜 서비스가 곧 여러분을 찾아갑니다</p>
          <div className={cx('bottom')}></div>
        </div>
      </Page>
    );
  }
}

export default Construction;

