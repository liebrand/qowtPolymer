(function() {
  'use strict';

  var MiscUtils = require('utils/miscUtils');
  var QowtElement = require('elements/mixin/element');

  var api_ = {
    supports_: ['something'],

    ready: function() {
      this.setAttribute('pseudo', 'x-header');
    },

    clear: function() {
      while (this.firstChild) {
        this.removeChild(this.firstChild);
      }
    }
  };


  /* jshint newcap: false */
  Polymer('qowt-header', MiscUtils.mergeMixin(QowtElement, api_));
  /* jshint newcap: true */

})();