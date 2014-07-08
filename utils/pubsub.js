define([], function() {

  'use strict';

  // Note: this is just to make things work; qowt's own pubsub is
  // far richer!
  return {

    subscribers_: {},

    subscribe: function(signal, func) {
      this.subscribers_[signal] = this.subscribers_[signal] || [];
      this.subscribers_[signal].push(func);
    },

    publish: function(signal, data) {
      var listeners = this.subscribers_[signal];
      if (listeners) {
        listeners.forEach(function(listener) {
          listener.call(null, data);
        });
      }
    }
  };
});