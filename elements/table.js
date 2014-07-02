
(function() {

  "use strict";

  var api_ = {
    supports_: ['something'],

    foo: function(){}
  };


  var QowtTableProto = mergeMixin(QowtElement, FlowChildren, api_);

  /* jshint newcap: false */
  Polymer('qowt-table', QowtTableProto);
  /* jshint newcap: true */

})();
