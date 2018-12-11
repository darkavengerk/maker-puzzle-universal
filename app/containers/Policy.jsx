import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import Link from '../components/Link';
import SingleLine from '../components/SingleLine';
import Padding from '../components/Padding';
import { Main } from '../services';

import styles from '../css/components/policy';

const cx = classNames.bind(styles);

class Container extends Component {
  
  constructor(props) {
    super(props);
    const { routeParams } = this.props;
    this.state = { 
      section: routeParams.section
    };
    this.clickService = this.clickService.bind(this);
    this.clickPrivacy = this.clickPrivacy.bind(this);
  }

  clickPrivacy() {
    // this.setState({ section: 'privacy'});
  }

  clickService() {
    // this.setState({ section: 'service'});
  }

  async componentDidMount() {
    const { data } = await Main().getPolicy();
    this.setState({ data });
  }

  buildText(texts) {
    return texts.slice(1).map(d => {
      return <div key={d.title}>
        <div className={cx('text', 'title')}>
          {d.title}
        </div>
        {d.contents.map((c, i) => <div key={i} className={cx('text')}>{c}</div>)}
      </div>
    })
  }

  render() {
    const { data } = this.state;
    if(!data) return null;

    const { routeParams } = this.props;
    const { section } = routeParams;


    return (
      <div>
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <div className={cx('main-section')}>
          <section className={cx('menu')}>
            <Link onClick={this.clickService} to={'/policy/service'} className={cx('menu-item', section === 'service' && 'selected')}>이용약관</Link>
            <Link onClick={this.clickPrivacy} to={'/policy/privacy'} className={cx('menu-item', section === 'privacy' && 'selected')}>개인정보처리방침</Link>
          </section>
          <section className={cx('text-area')}>
            <div className={cx('first-title')}>
              { data[section][0].title }
            </div>
            <div className={cx('text')}>
              { data[section][0].contents }
              <Padding height={20}/>
            </div>
            { data[section] && this.buildText(data[section]) }
          </section>
        </div>
      </div>
    );
  }
}

Container.propTypes = {
};

function mapStateToProps(state) {
  return {
    param: state.param
  };
}

export default connect(mapStateToProps, {})(Container);
