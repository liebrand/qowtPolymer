Polymer('qowt-page', {
  foo: 34,
  ready: function() {
    this.addEventListener('header-changed', this.updateHeader);
    this.addEventListener('footer-changed', this.updateFooter);
  },

  updateHeader: function() {
    console.log('update header');
    // get header/footer information from FIRST section on page
    var section = this.querySelectorAll('qowt-section')[0];
    var header = this.shadowRoot.querySelector('qowt-header');

    if (section && header) {
      header.clear();
      var x = section.getHeaderContent('odd');
      header.appendChild(x);
    }
  },

  updateFooter: function() {
    console.log('update footer');
    // get header/footer information from FIRST section on page
    var section = this.querySelectorAll('qowt-section')[0];
    var footer = this.shadowRoot.querySelector('qowt-footer');

    if (section && footer) {
      footer.clear();
      footer.appendChild(section.getFooterContent('odd'));
    }
  },

  isOverflowing: function() {
    var pageContents = this.shadowRoot.getElementById('page-contents');
    return pageContents.scrollHeight > pageContents.offsetHeight;
  }
});
