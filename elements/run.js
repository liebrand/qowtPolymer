
(function() {

  "use strict";

  var api_ = {
    supports_: ['something'],

    foo: function(){}
  };


  var QowtRunProto = mergeMixin(QowtElement, FlowWords, api_);

  /* jshint newcap: false */
  Polymer('qowt-run', QowtRunProto);
  /* jshint newcap: true */

})();