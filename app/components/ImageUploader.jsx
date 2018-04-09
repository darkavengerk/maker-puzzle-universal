import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import TopicTextInput from '../components/TopicTextInput';
import styles from '../css/components/image-uploader';
import { uploadFile } from '../actions/fileUpload';

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
    let reader = new FileReader();
    let target = document.getElementById(this.props.name);
    let file = target.files[0];
    this.props.uploadFile(file);
  }

  render() {
    const { files } = this.props;
    const images = files.map(f => (<img src={f.src} key={f.name} />))
    return (
      <div className={cx('image-uploader')}>
        <h1>{this.props.title} {this.props.name}</h1>
        <form>
          <input type="file" className={cx('file-input')} id={this.props.name} onChange={this.onFileSelected} />
          <input type="button" value="value" onClick={this.onLoad} />
        </form>
        {images}
      </div>
    );
  }
};
    
ImageUploader.propTypes = {
  name: PropTypes.string.isRequired,
  uploadFile: PropTypes.func
};
  
function mapStateToProps(state) {
  return {
    files: state.fileUpload.files
  };
}
    
export default connect(mapStateToProps, { uploadFile })(ImageUploader);