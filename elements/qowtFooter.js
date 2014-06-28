Polymer('qowt-footer', {
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
