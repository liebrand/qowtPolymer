
window.__customElementRegistry = window.__customElementRegistry || [];
window.__customElementRegistry.push('QowtTable');

require([
  'utils/miscUtils',
  'elements/mixin/element',
  'elements/mixin/flowChildren'], function(
    MiscUtils,
    QowtElement,
    FlowChildren) {

  'use strict';

  var api_ = {
    supports_: ['something'],
    foo: function() {}
  };


  /* jshint newcap: false */
  Polymer('qowt-table', MiscUtils.mergeMixin(QowtElement, FlowChildren, api_));
  /* jshint newcap: true */

});
