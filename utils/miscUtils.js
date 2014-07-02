

// usage:
// var proto = mergeMixin(BaseBehaviour, OtherBehaviour, api_);
window.mergeMixin = function() {
  var mainArguments = Array.prototype.slice.call(arguments);

  // start with an empty object (so that we dont physically change any mixin)
  mainArguments.unshift({});

  // add a merge function that can merge arrays like the "supports_" array
  mainArguments.push(function(a, b) {
    return _.isArray(a) ? a.concat(b) : undefined;
  });

  // use lodash to merge the mixins and apis etc
  return _.merge.apply(null, mainArguments);
}


window.assert = function(expression, msg) {
  var result;
  if (typeof expression === 'function') {
    result = expression();
  } else {
    result = expression;
  }
  if (!result) {
    /* jshint debug: true */
    debugger;
    /* jshint debug: false */
    throw new Error('ASSERT FAILED: ' + msg);
  }
};


(function() {
  var id = 0;
  window.generateId = function() {
    return id++;
  };
}());