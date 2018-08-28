import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../css/components/maker-profile';

const cx = classNames.bind(styles);

const Component = ({ maker, ...props }) => {

  let history = maker.makerProfile.companies;
  let lines = history.map(info => {
    return (
      <tr key={info.name} draggable="true">
        <td className={cx('col-info', 'first-item')}>{info.order + 1}</td>
        <td className={cx('col-name', (info.current? "col-selected": ""))}>{info.name}</td>
        <td className={cx('col-info', (info.current? "col-selected": ""))}>{info.period}</td>
        <td className={cx('col-info', (info.current? "col-selected": ""), 'last-item')}>{info.position}</td>
      </tr>)
  });
  return (
    <table className={cx('history')} {...props} >
      <tbody>
        <tr>
          <th className={cx('first-item')}></th>
          <th>기업명</th>
          <th>재직여부</th>
          <th className={cx('last-item')}>최종 직급</th>
        </tr>
        {lines}
      </tbody>
    </table>
  );
};

Component.propTypes = {
  maker: PropTypes.object.isRequired
};

export default Component;
