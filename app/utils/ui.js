let sortable = null;

function activateDrag(selector, children, cb) {
  if(sortable) {
    sortable.destroy();
  }

  if(document.querySelectorAll(selector).length) {
    const draggable = require('@shopify/draggable');
    sortable = new draggable.Sortable(document.querySelectorAll(selector), {
      draggable: children
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
