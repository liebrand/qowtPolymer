window.__customElementRegistry = window.__customElementRegistry || [];
window.__customElementRegistry.push('QowtRun');

require([
  'utils/miscUtils',
  'elements/mixin/element',
  'elements/mixin/flowWords'], function(
    MiscUtils,
    QowtElement,
    FlowWords) {

  'use strict';

  var api_ = {
    supports_: ['something'],
    foo: function() {}
  };


  /* jshint newcap: false */
  Polymer('qowt-run', MiscUtils.mergeMixin(QowtElement, FlowWords, api_));
  /* jshint newcap: true */

});
