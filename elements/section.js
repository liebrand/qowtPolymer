(function() {
  'use strict';

  var MiscUtils = require('utils/miscUtils');
  var QowtElement = require('elements/mixin/element');
  var FlowChildren = require('elements/mixin/flowChildren');

  var api_ = {
    supports_: ['something'],

    ready: function() {
      this.listenForUpdates_();
    },

    getHeaderItem: function(type) {
      return this.getHFItem_('header', type);
    },

    getFooterItem: function(type) {
      return this.getHFItem_('footer', type);
    },

    getHeaderContent: function() {
      return document.importNode(this.$.headerTemplates.content, true);
    },

    getFooterContent: function() {
      return document.importNode(this.$.footerTemplates.content, true);
    },

    cloneMe: function() {
      var clone = this.cloneNode(false);
      clone.$.headerTemplates.content.appendChild(this.getHeaderContent());
      clone.$.footerTemplates.content.appendChild(this.getFooterContent());
      return clone;
    },


    // ------------------------- PRIVATE ------------------------


    listenForUpdates_: function() {
      var headers = this.$.headerTemplates.content;
      var footers = this.$.footerTemplates.content;
      this.onMutation(headers, this.headerTemplatesUpdated_);
      this.onMutation(footers, this.footerTemplatesUpdated_);
    },

    getHFItem_: function(hf, type) {
      var source = (hf === 'header') ?
          this.$.headerTemplates :
          this.$.footerTemplates;

      var item = source.content.querySelector('[type=' + type + ']');

      if (!item) {
        item = document.createElement('div');
        item.setAttribute('type', type);
        source.content.appendChild(item);
      }
      return item;
    },

    headerTemplatesUpdated_: function(observer, mutations) {
      this.listenForUpdates_();
      this.fire('header-changed');
    },

    footerTemplatesUpdated_: function(observer, mutations) {
      this.listenForUpdates_();
      this.fire('footer-changed');
    },


  };


  /* jshint newcap: false */
  Polymer('qowt-section',
      MiscUtils.mergeMixin(QowtElement, FlowChildren, api_));
  /* jshint newcap: true */

})();