
window.__customElementRegistry = window.__customElementRegistry || [];
window.__customElementRegistry.push('QowtPara');

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
    jelte: function() {
      FlowChildren.jelte.call(this);
      console.log('jelte page: ' + this.nodeName);
    }
  };


  /* jshint newcap: false */
  Polymer('qowt-para', MiscUtils.mergeMixin(QowtElement, FlowChildren, api_));
  /* jshint newcap: true */

});
