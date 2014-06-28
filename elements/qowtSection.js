Polymer('qowt-section', {
  created: function() {
    // debugger;
  },
  ready: function() {
  },
  domReady: function() {
  },

  // TODO(jliebrand): combine the createHeaderItem and createFooterItem
  // to reduce code duplication
  createHeaderItem: function(type, docFrag) {
    // TODO(jliebrand): should ensure we place these template
    // elements at the beginning of our child list.
    // TODO(jliebrand): should REPLACE existing 'type' items
    var hdi = document.createElement('template');
    hdi.content.appendChild(docFrag);
    hdi.setAttribute('data-header-type', type);

    this.appendChild(hdi);
    hdi.dispatchEvent(new CustomEvent('header-changed', {bubbles: true}));
  },
  createFooterItem: function(type, docFrag) {
    // TODO(jliebrand): should ensure we place these template
    // elements at the beginning of our child list.
    // TODO(jliebrand): should REPLACE existing 'type' items
    var fdi = document.createElement('template');
    fdi.content.appendChild(docFrag);
    fdi.setAttribute('data-footer-type', 'odd');

    this.appendChild(fdi);
    fdi.dispatchEvent(new CustomEvent('footer-changed', {bubbles: true}));
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
