Polymer('qowt-section', {
  created: function() {
    // debugger;
  },
  ready: function() {
  },
  domReady: function() {
  },
  getHeaderContent: function(type) {
    var header = this.querySelector('[data-header-type="' + type + '"');
    return header.content.cloneNode(true);
  },
  getFooterContent: function(type) {
    var footer = this.querySelector('[data-footer-type="' + type + '"');
    return footer.content.cloneNode(true);
  }
});
