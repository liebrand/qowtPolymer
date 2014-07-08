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

    singleRun: true,

    files: [
      'utils/lodash.min.js',
      'test/htmlTest.js',
      'test/mocha-htmlTest.js',

      'test/*.js',

      {pattern:'elements/**/*.html', included: false,
          watched: true, served: true},
      {pattern:'elements/**/*.js', included: false,
          watched: true, served: true},
      {pattern:'test/*.html', included: false,
          watched: true, served: true},
      {pattern:'utils/*.js', included: false,
          watched: true, served: true},
      {pattern:'bower_components/**/*.html', included: false,
          watched: true, served: true},
      {pattern:'bower_components/**/*.js', included: false,
          watched: true, served: true},
      {pattern:'node_modules/chai/**/*.js', included: false,
          watched: true, served: true}
    ]
  });
};