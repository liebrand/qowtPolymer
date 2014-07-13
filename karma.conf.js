// module.exports = function(config) {
//   config.set({
//     frameworks: ['polymerTest'],

//     // configuration
//     polymerTest: {
//     }
//   });
// };





module.exports = function(config) {
  'use strict';
  // Set up karma
  config.set({

    // urlRoot: 'jelte',

    browsers: ['Chrome'],

    frameworks: ['mocha'],

    files: [
      // NOTE: these are loaded in the browser, which
      // then will create an iframe to run the tests
      // do NOT load the tests in the main browser window!
      'utils/lodash.min.js',
      'test/utils/htmlTest.js',
      'test/utils/mocha-htmlTest.js',
      'test/loaders/*.js',

      // these patterns are here to ensure karma serves
      // the actual tests (but doesn't load them - since
      // they will get loaded by the iframe itself)
      {pattern:'elements/**/*.html', included: false,
          watched: true, served: true},
      {pattern:'elements/**/*.js', included: false,
          watched: true, served: true},
      {pattern:'test/**/*.html', included: false,
          watched: true, served: true},
      {pattern:'test/**/*.js', included: false,
          watched: true, served: true},
      {pattern:'utils/*.js', included: false,
          watched: true, served: true},
      {pattern:'bower_components/**/*.html', included: false,
          watched: true, served: true},
      {pattern:'bower_components/**/*.js', included: false,
          watched: true, served: true},
      {pattern:'node_modules/chai/**/*.js', included: false,
          watched: true, served: true},
      {pattern:'node_modules/**/*.css', included: false,
          watched: true, served: true}
    ]
  });
};