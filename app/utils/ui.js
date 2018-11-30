import classNames from 'classnames/bind';

let sortable = null;

function activateDrag(selector, children, cb, style) {
  if(sortable) {
    sortable.destroy();
  }

  if(document.querySelectorAll(selector).length) {
    const draggable = require('@shopify/draggable/lib/es5/draggable.bundle');
    sortable = new draggable.Sortable(document.querySelectorAll(selector), {
      draggable: children,
      classes: {
        'source:dragging': style
      }
    });
    sortable.on('sortable:stop', function(evt) {
      if(evt.data && evt.data.oldIndex > -1 && evt.data.oldIndex !== evt.data.newIndex) {
        cb(evt.data.oldIndex, evt.data.newIndex);
      }
    });
  }
}

function bind(styles) {
  if(typeof(window) !== 'undefined') {
    console.log('window.outerWidth', window.outerWidth);
    if(true || window.outerWidth < 1080) {

      const applied = {...styles, 
        'foldable':'container', 
        'fold':'row', 
        'fold-1': 'col-xl-4 col-lg-4 col-md-12 col-sm-12',
        'fold-2': 'col-xl-8 col-lg-8 col-md-12 col-sm-12'
      };

      return classNames.bind(applied);
    }
  }
  return classNames.bind(styles);
}

export default {
  activateDrag,
  bind
};
