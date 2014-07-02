
(function() {

  "use strict";

  var api_ = {
    supports_: ['something'],

    jelte: function() {
      FlowChildren.jelte.call(this);
      console.log('jelte page: ' + this.nodeName);
    }
  };


  var QowtParaProto = mergeMixin(QowtElement, FlowChildren, api_);


  /* jshint newcap: false */
  Polymer('qowt-para', QowtParaProto);
  /* jshint newcap: true */

})();
