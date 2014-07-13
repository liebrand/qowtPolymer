/**
 * Copyright 2014 Google Inc. All Rights Reserved.
 *
 * @fileoverview Test runner wrapper for our QOWT Polymer element mocha tests.
 * This code runs in the element's iframe.
 *
 * @author dskelton@google.com (Duncan Skelton)
 */

// For each Polymer element we define we push it's constructor name onto this
// list. This is used to check for when Polymer is done upgrading each of these
// html elements into Polymer elements, and their extended behaviour is ready.
window.__customElementRegistry = [];

window.whenReady = function() {
  var promise = new Promise(function(resolve, reject) {
    var id;
    function checkElements() {
      console.log('checking');
      var ready = true;
      for (var i = 0; i < window.__customElementRegistry.length; i++) {
        var ctor = window.__customElementRegistry[i];
        if (window[ctor] === undefined) {
          console.log(ctor + ' is not defined yet');
          ready = false;
          break;
        }
      }
      if (ready) {
        console.log('all ready!');
        window.clearInterval(id);
        resolve();
      }
    }
    id = window.setInterval(checkElements, 10);

  });
  return promise;
};

/**
 * Signal our parent karma window that we're done
 * with the current JS test.
 */
window.done = function() {
  window.onerror = null;
  parent.postMessage('ok', '*');
};

/**
 * Capture any error in this iframe and send it to the parent karma window.
 */
window.addEventListener('error', function(e) {
  var err;
  // console.dir(e);
  // debugger;
  if (e.error instanceof Error) {
    err = _.extend({}, e.error);
    err.name = e.error.name;
    err.message = e.error.message;
    err.stack = e.error.stack;
  } else {
    err = new Error(e.error);
  }

  // We can't Stringify() an Error object as it has non-enumerable properties.
  // Instead we have to brute force it. See http://goo.gl/b5kAGc
  function stringifyError(err, filter, space) {
    var plainObject = {};
    Object.getOwnPropertyNames(err).forEach(function(key) {
      plainObject[key] = err[key];
    });
    return JSON.stringify(plainObject, filter, space);
  }

  var postErr = stringifyError(err, null, '\t');
  parent.postMessage(postErr, '*');
}, true);
