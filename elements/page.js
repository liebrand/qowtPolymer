Polymer('qowt-page', {

  ready: function() {
    this.addEventListener('header-changed', this.updateHeader);
    this.addEventListener('footer-changed', this.updateFooter);
  },

  // TODO(jliebrand): remove duplication between header and footer functions
  updateHeader: function() {
    // get header/footer information from FIRST section on page
    var section = this.querySelectorAll('qowt-section')[0];

    if (section) {
      this.$.header.clear();
      this.$.header.appendChild(section.getHeaderContent('odd'));
    }
  },

  updateFooter: function() {
    // get header/footer information from FIRST section on page
    var section = this.querySelectorAll('qowt-section')[0];

    if (section) {
      this.$.footer.clear();
      this.$.footer.appendChild(section.getFooterContent('odd'));
    }
  },

  isOverflowing: function() {
    return this.$.contents.scrollHeight > this.$.contents.offsetHeight;
  }

});
