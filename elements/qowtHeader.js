Polymer('qowt-header', {
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