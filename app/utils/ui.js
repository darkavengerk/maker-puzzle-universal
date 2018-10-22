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

export default {
  activateDrag
};
