import classNames from 'classnames/bind';

import MakerInfo from '../components/MakerInfo';
import PortfolioItem from '../components/PortfolioItem';
import PortfolioDetail from '../components/PortfolioDetail';

import ProjectInfo from '../components/ProjectInfo';

import styles from '../css/components/contents-section';

class ContentsTagFactory {

  constructor(contentsType) {
    this.set = {
      maker: {
        info: MakerInfo,
        item: PortfolioItem,
        detail: PortfolioDetail
      }, 
      project: {
        info: ProjectInfo,
        item: PortfolioItem,
        detail: PortfolioDetail
      }
    }
    [contentsType];
  }

  getInfoTag() {
    return this.getTag('info');
  }

  getItemTag() {
    return this.getTag('item');
  }

  getDetailTag() {
    return this.getTag('detail');
  }

  getTag(name) {
    return this.set[name];
  }
}

export default ContentsTagFactory;