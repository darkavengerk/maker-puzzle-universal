import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import FlexibleImage from '../components/FlexibleImage';
import Border from '../components/SingleLine';
import ImageUploader from '../components/ImageUploader';
import styles from '../css/components/maker-profile';

import { featureEdited, featureEditStart } from '../actions/makers';

import ContentEditable from 'react-contenteditable'
import jsxToString from 'jsx-to-string';

const cx = classNames.bind(styles);

class MakerProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { maker, context, featureEdited } = this.props;

    let stats = (
      <span className={cx('stats-area', 'flex-row')}>
        <span className={cx('maker-stats', 'flex-col')}>
          <span className={cx('figure')}>
            {maker.portfolios.length}
          </span>
          <span className={cx('keyword')}>
            Portfolio
          </span>
        </span>
        <span className={cx('maker-stats', 'flex-col')}>
          <span className={cx('figure')}>
            421
          </span>
          <span className={cx('keyword')}>
            Follower
          </span>
        </span>
        <span className={cx('maker-stats', 'flex-col')}>
          <span className={cx('figure')}>
            421
          </span>
          <span className={cx('keyword')}>
            Following
          </span>
        </span>
      </span>);

    let splitLetters = word => {
      return word.split('').map((letter,i) => {
        return (<span key={i}>{letter}</span>);
      })
    }

    const handleChange = title => {
      return evt => {
        if (evt.key === 'Enter') {
            evt.preventDefault();
        }
        else {
          featureEdited(title, evt.target.innerText);
        }
      }
    }

    const handleChange2 = evt => {
      let current = evt.target;
      let parent = current.parentElement.parentElement;
      let children = parent.childNodes;

      // use innter text to sum up the result
      current.innerText;
    }

    let features = context.features.map(feature => {
      return (
        <div className={cx('feature-item')} key={feature.title}>
          <span className={cx('feature-title')}>
            {splitLetters(feature.title)}
          </span>
          <ContentEditable 
            tagName="span"
            className={cx('feature')}
            html={ feature.content }
            onKeyUp={handleChange(feature.title)}
            placeholder="Say anything"
          />
          
        </div>
      );
    });

    let featureArea = (
      <div className={cx('feature-area')}>
          {features}
      </div>
    );

    return (
      <div className={cx('main-section')}>
        <span className={cx('flex-row')}>
          <FlexibleImage src="/images/default_profile.jpg" x={144} y={144} />
          <span className={cx('user-info')}>
            <span className={cx('name')}>
              {maker.profile.name}
            </span>
            <Border width={181} thickness={2} color={'#dadada'} />
            {stats}
            <span className={cx('follow-button')} role="button">
              FOLLOW
            </span>
          </span>
        </span>
        <div>
          {featureArea}
          <ContentEditable 
            className={cx('about-maker')}
            html={ jsxToString(
              <div>
                {maker.about.split('\n').map((sen,i) => (<p key={i}>{sen}</p>))}
              </div>
            ) } 
            onKeyPress={handleChange2}
          />
          
        </div>
        <ImageUploader name="ImageUploader" />
      </div>
    );
  }
}

MakerProfile.propTypes = {
  maker: PropTypes.object.isRequired,
  featureEdited: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    maker: state.maker.maker,
    context: state.maker.context,
  };
}

export default connect(mapStateToProps, {featureEdited})(MakerProfile);
