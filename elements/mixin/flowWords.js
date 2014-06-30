
window.FlowWords = {
  addMixin: function(module) {
    "use strict";

    var funcs = {
      /**
       * Flows the words such that as many as possible are in "this"
       * and the rest has been flowed to "this.flowInto".
       * How many fit is decided by the passed in 'overflowingFunc'
       *
       * Steps:
       *   1 - if overflowingFunc is true, then
       *   1a- flow words from flowInto to this, else
       *   1b- flow words from this to flowInto
       *
       *      (now we should no longer be overflowing)
       *
       *   2 - normalize flow in case all children moved out/in
       *
       * @param {Function} overflowingFunc to indicate if we are overflowing
       */
      flow: function(overflowingFunc) {
        if (!this.flowInto) {
          throw new Error(this.nodeName +
                          ' tried to flow without having a flowInto');
        }

        // step 1 - flow the words
        this.flowWords_(overflowingFunc);

        // step 2 - normalize in case we moved all content into this or flowInto
        this.normalizeFlow();
      },


      /**
       * unflow all content from 'flowInto' back in to 'this'
       * Steps:
       *    1- if this.lastElementChild is flowed, unflow it
       *    2- move all children from 'flowInto' back in to 'this'
       */
      unflow: function() {
        throw new Error('TODO word unflow');
      },


      // ----------------------- PRIVATE ------------------

      flowWords_: function(overflowingFunc) {
        // binary search algorithm to flow the words

        // if we are overflowing, flow from 'this' else from 'this.flowInto'
        var theseWords = this.textContent ? this.textContent.split(/\b/) : [];
        var theirWords = this.flowInto.textContent ?
            this.flowInto.textContent.split(/\b/) : [];

        var wordCount = overflowingFunc() ?
              theseWords.length :
              theirWords.length;

        var extract;
        var half = Math.ceil(wordCount / 2);
        while (true) {
          // flow words out if we are overflowing or
          // pull them back in if we are not.
          if (overflowingFunc()) {
            extract = theseWords.splice(theseWords.length - half);
            theirWords = extract.concat(theirWords);
          } else {
            extract = theirWords.splice(0, half);
            theseWords = theseWords.concat(extract);
          }

          this.setText_(theseWords, theirWords);

          if (half > 1) {
            // go again
            half = Math.ceil(half / 2);
          } else {
            // the final word is a make or break:
            // we could have pulled it in if we weren't overflowing, but
            // in doing so, caused us to overflow. So doulbe check and
            // push out if needed
            if (overflowingFunc()) {
              theirWords.unshift(theseWords.pop());
              this.setText_(theseWords, theirWords);
            }
            break;
          }
        }

        // make sure any white spaces are at the end of 'this', rather
        // than at the start of 'flowInto'
        var changed = false;
        while (theirWords[0] && theirWords[0].match(/^\s*$/) !== null) {
          theseWords.push(theirWords.shift());
          changed = true;
        }
        if (changed) {
          this.setText_(theseWords, theirWords);
        }
      },


      unflowWords_: function() {
      },

      setText_: function(theseWords, theirWords) {
        this.textContent = theseWords.join('');
        this.flowInto.textContent = theirWords.join('');
      }

    };

    // extend the module; but only if it hasn't overwritten any funcs
    for(var func in funcs) {
      if (module[func] === undefined) {
        module[func] = funcs[func];
      }
    }

    // and mixin the basic flowing functions
    FlowingElement.addMixin(module);
  }
};






