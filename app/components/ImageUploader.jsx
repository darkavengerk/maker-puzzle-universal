import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import TopicTextInput from '../components/TopicTextInput';
import FlexibleImage from '../components/FlexibleImage';
import styles from '../css/components/image-uploader';
import { uploadFile, uploadImage } from '../actions/fileUpload';
import { Col, Row } from 'react-bootstrap';

const cx = classNames.bind(styles);

class ImageUploader extends React.Component {

  constructor(props) {
    super(props);
    this.onFileSelected = this.onFileSelected.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  onLoad = function(e) {
    e.preventDefault();
    document.getElementById(this.props.name).click();    
  }

  onFileSelected = function (e) {
    e.preventDefault();
    let target = document.getElementById(this.props.name);
    for(let file of target.files) {
      this.props.uploadImage(this.props.user.userid, file, this.props.callback);
    }
  }

  render() {
    const { files } = this.props;

    return (
      <div >
        {<div role="button" onClick={this.onLoad}>{this.props.children}</div>}
        <form style={{display:'none'}}>
          <input type="file" className={cx('file-input')} id={this.props.name} onChange={this.onFileSelected} multiple="multiple" />
          <input type="button" value="value" />
        </form>
      </div>
    );
  }
};
    
ImageUploader.propTypes = {
  name: PropTypes.string.isRequired,
  uploadFile: PropTypes.func,
  callback: PropTypes.func
};
  
function mapStateToProps(state) {
  return {
    files: state.fileUpload.files,
    user: state.user.account,
  };
}
    
export default connect(mapStateToProps, { uploadFile, uploadImage })(ImageUploader);