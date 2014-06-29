/* jshint newcap: false */
Polymer('qowt-footer', {
  /* jshint newcap: true */
  ready: function() {
  },
  domReady: function() {
  },
  clear: function() {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
  }
});
