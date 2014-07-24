(function() {
  'use strict';

  var MiscUtils = require('utils/miscUtils');
  var QowtElement = require('elements/mixin/element');
  var FlowChildren = require('elements/mixin/flowChildren');

  var api_ = {
    supports_: ['something'],

    created: function() {
      // debugger;
    },
    attached: function() {
      this.fire('header-footer-changed');
    },

    createHFItem: function(hf, pageType, docFrag) {
      // TODO(jliebrand): should REPLACE existing 'type' items
      debugger;
      var hft = document.createElement('template');
      hft.content.appendChild(docFrag);
      hft.setAttribute('data-hf-type', hf);
      hft.setAttribute('data-hf-page-type', pageType);

      this.$.headerFooterTemplates.appendChild(hft);
      this.fire('header-footer-changed');
    },

    getHFContent: function(hf, pageType) {
      debugger;
      var templates = this.$.headerFooterTemplates;
      var typeCheck = '[data-hf-type="' + hf + '"]';
      var pageCheck = '[data-hf-page-type="' + pageType + '"]';
      var hf = templates.querySelector(typeCheck + pageCheck);
      return hf && hf.content.cloneNode(true);
    },

    cloneMe: function() {
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
  };


  /* jshint newcap: false */
  Polymer('qowt-section',
      MiscUtils.mergeMixin(QowtElement, FlowChildren, api_));
  /* jshint newcap: true */

})();