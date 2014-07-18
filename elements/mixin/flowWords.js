define([
  'elements/mixin/flowingElement',
  'utils/rangeUtils',
  'utils/miscUtils'
  ], function(FlowingElement, RangeUtils, MiscUtils) {

  "use strict";

  // merge in the FlowingElement mixin
  return MiscUtils.mergeMixin(FlowingElement, {

    supports_: ['flow-words'],
    /**
     * Flows the words such that as many as possible are in "this"
     * and the rest has been flowed to "this.flowInto".
     * How many fit is decided by the passed in 'overflowingFunc'
     *
     * Steps:
     *   1 - while we have flowInto
     *   1a- flow words to/from flowInto
     *   1b- if flowInto is now empty, remove it from flow
     *   1c- repeat 1
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

      // normalize ourselves first, so we dont have to deal with
      // multiple TEXT_NODEs as children. NOTE: this is different from
      // normalizeFlow !
      this.normalize();

      // in case the caret is inside of us, cache it;
      this.cacheSelection_();

      // step 1 - while we have a flowInto, flow
      do {
        var goAgain = false;
        this.flowWords_(overflowingFunc);
        if (this.flowInto.isEmpty()) {
          // we pulled in all content from our flowInto; so
          // remove it and double check we dont then have a
          // NEW flowInto (from page n+2) to pull more data
          // from (if possible)
          var emptyNode = this.flowInto;
          emptyNode.removeFromFlow();
          if (this.flowInto && this.flowInto !== emptyNode) {
            goAgain = true;
          }
        }
      } while (goAgain);


      // step 2 - normalize in case we moved all content into this or flowInto
      this.normalizeFlow();

      this.restoreSelection_();
    },


    /**
     * unflow all content from 'flowInto' back in to 'this'
     * Steps:
     *    1- if this.lastElementChild is flowed, unflow it
     *    2- move all children from 'flowInto' back in to 'this'
     */
    unflow: function() {
      console.log('flow words unflow');
      if (!this.flowInto) {
        throw new Error(this.nodeName +
          ' tried to unflow without having a flowInto');
      }
      this.textContent = this.textContent + this.flowInto.textContent;
      this.flowInto.textContent = '';

      this.normalizeFlow();
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

    // ------------------------- PRIVATE ---------------------------

    unflowWords_: function() {},

    setText_: function(theseWords, theirWords) {
      this.textContent = theseWords.join('');
      this.flowInto.textContent = theirWords.join('');
    },

    cacheSelection_: function() {
      this.cache_ = {};
      var sel = window.getSelection();
      if (sel.rangeCount > 0) {
        var range = sel.getRangeAt(0);
        var comparison = RangeUtils.compareNode(range, this);
        if (comparison !== RangeUtils.RANGE_BEFORE &&
            comparison !== RangeUtils.RANGE_AFTER) {
          // selection is inside of us somehow, cache it
          if (this.contains(range.startContainer)) {
            this.cache_.startOffset = range.startOffset;
          }
          if (this.contains(range.endContainer)) {
            this.cache_.endOffset = range.endOffset;
          }
        }
      }
    },
    restoreSelection_: function() {
      if (this.firstChild && this.firstChild.nodeType === Node.TEXT_NODE) {
        var range;
        if (this.cache_.startOffset || this.cache_.endOffset) {
          var sel = window.getSelection();
          if (sel.rangeCount === 0) {
            // creat a new range and set both start and end
            // set to zero if we dont have either cached
            range = document.createRange();
            range.setStart(this.firstChild, this.cache_.startOffset || 0);
            range.setEnd(this.firstChild, this.cache_.endOffset || 0);
          } else {
            // update existing cache, only update the point(s) we have cached
            range = sel.getRangeAt(0);
            if (this.cache_.startOffset) {
              range.setStart(this.firstChild, this.cache_.startOffset);
            }
            if (this.cache_.endOffset) {
              range.setEnd(this.firstChild, this.cache_.endOffset);
            }
          }
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    }

  });

});