/* jshint newcap: false */
Polymer('qowt-header', {
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
