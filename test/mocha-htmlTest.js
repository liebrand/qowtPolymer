/**
 * Copyright 2014 Google Inc. All Rights Reserved.
 *
 * @fileoverview Test runner wrapper for our QOWT Polymer element mocha tests.
 * This code runs in the top window. It loads the Karms js test file wrappers
 * that pull in the test html files. The html files are loaded into iframes
 * to be run.
 *
 * @author dskelton@google.com (Duncan Skelton)
 */

(function() {
  var thisFile = 'elements/mocha-htmltest.js';
  var base = '';

  (function() {
    var s$ = document.querySelectorAll('script[src]');
    Array.prototype.forEach.call(s$, function(s) {
      var src = s.getAttribute('src');
      var re = new RegExp(thisFile + '[^\\\\]*');
      var match = src.match(re);
      if (match) {
        base = src.slice(0, -match[0].length);
      }
    });
  })();

  var next, iframe;

  var listener = function(event) {
    if (event.data === 'ok') {
      next();
    } else if (event.data) {
      var err = castError_(JSON.parse(event.data));
      console.error(err.stack);
      throw err;
    }
  };

  function htmlSetup() {
    window.addEventListener("message", listener);
    iframe = document.createElement('iframe');
    iframe.style.cssText = 'position: absolute; left: -9000em; ' +
        'width:768px; height: 1024px';
    document.body.appendChild(iframe);
  }

  function htmlTeardown() {
    window.removeEventListener('message', listener);
    document.body.removeChild(iframe);
  }

  function htmlTest(src) {
    it(src, function(done) {
      this.timeout(10000);

      next = done;
      iframe.src = base + src + "?" + Math.random();
    });
  }

  function htmlSuite(inName, inFn) {
    describe(inName, function() {
      beforeEach(htmlSetup);
      afterEach(htmlTeardown);
      inFn();
    });
  }

  function castError_(err) {
    var error = {};
    var validTypes = [
      // built in
      'Error',
      'EvalError',
      'RangeError',
      'ReferenceError',
      'SyntaxError',
      'TypeError',
      'URIError',

      // qowt
      'QOWTError',
      'QOWTSilentError',
      'QOWTException'
    ];

    if (validTypes.indexOf(err.name) !== -1) {
      // construct the correct error object based on name
      // eg new window.TypeError or new window.ScriptError etc
      error = new window[err.name]();
    } else {
      // default to normal built in error
      console.log('cast fallback to Error');
      error = new Error();
    }

    // this will override all the properties of our newly created
    // Error object, and thus things like the stack trace should
    // be accurate.
    _.extend(error, err);

    // if the original error didn't have a stack, then ensure we
    // remove the stack from this new error we generated here
    if (err.stack === undefined) {
      error.stack = undefined;
    }

    return error;
  }

  window.htmlTest = htmlTest;
  window.htmlSuite = htmlSuite;
})();
