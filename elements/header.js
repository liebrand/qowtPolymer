
window.__customElementRegistry = window.__customElementRegistry || [];
window.__customElementRegistry.push('QowtHeader');

require([
  'utils/miscUtils',
  'elements/mixin/element'], function(
    MiscUtils,
    QowtElement) {

  'use strict';

  var api_ = {
    supports_: ['something'],
    ready: function() {
    },
    domReady: function() {
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

});
