(function() {
  'use strict';

  var MiscUtils = require('utils/miscUtils');
  var QowtElement = require('elements/mixin/element');

  var api_ = {
    supports_: ['something'],

    clear: function() {
      while (this.firstChild) {
        this.removeChild(this.firstChild);
      }
    }
  };


  /* jshint newcap: false */
  Polymer('qowt-header-footer-base', MiscUtils.mergeMixin(QowtElement, api_));
  /* jshint newcap: true */

})();