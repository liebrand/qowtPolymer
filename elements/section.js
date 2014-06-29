/* jshint newcap: false */
Polymer('qowt-section', {
  /* jshint newcap: true */

  created: function() {
    // debugger;
  },
  ready: function() {
  },
  domReady: function() {
  },

  createHFItem: function(hf, pageType, docFrag) {
    // debugger;
    // TODO(jliebrand): should REPLACE existing 'type' items
    var hft = document.createElement('template');
    hft.content.appendChild(docFrag);
    hft.setAttribute('data-hf-type', hf);
    hft.setAttribute('data-hf-page-type', pageType);

    this.$.headerFooterTemplates.appendChild(hft);
    hft.dispatchEvent(new CustomEvent('header-footer-change', {bubbles: true}));
  },

  getHFContent: function(hf, pageType) {
    // debugger;
    var templates = this.$.headerFooterTemplates;
    var typeCheck = '[data-hf-type="' + hf + '"] ';
    var pageCheck = '[data-hf-page-type="' + pageType + '"]';
    var header = templates.querySelector(typeCheck + pageCheck);
    return header.content.cloneNode(true);
  },

  cloneMe: function() {
    // debugger;
    var clone = this.cloneNode(false);
    var templates = this.$.headerFooterTemplates;
    var headersFooters = templates.querySelectorAll('template');
    for (var i = 0; i < headersFooters.length; i++) {
      var hft = headersFooters[i];
      var hfType = hft.getAttribute('data-hf-type');
      var pageType = hft.getAttribute('data-hf-page-type');
      clone.createHFItem(hfType, pageType, hft.content);
    }
    return clone;
  }

});

QowtElement.addMixin(QowtSection.prototype);
FlowChildren.addMixin(QowtSection.prototype);