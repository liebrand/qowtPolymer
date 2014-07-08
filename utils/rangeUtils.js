define([], function() {

  'use strict';
  var _api = {

    RANGE_BEFORE: 0,
    RANGE_AFTER: 1,
    RANGE_BEFORE_INTERSECTS: 2,
    RANGE_AFTER_INTERSECTS: 3,
    RANGE_AROUND: 4,
    RANGE_INSIDE: 5,
    RANGE_IDENTICAL: 6,

    /**
     * Compare the node to the given range and return either:
     *
     *  RANGE_BEFORE: the range is entirely before the node
     *  RANGE_AFTER:  the range is entirely after the node
     *  RANGE_BEFORE_INTERSECTS: the range starts before but intersects the node
     *  RANGE_AFTER_INTERSECTS: the range ends after but it intersects the node
     *  RANGE_AROUND: the range contains the node
     *  RANGE_INSIDE: the range is inside the node
     *  RANGE_IDENTICAL: the range equals the node
     *
     *
     * @param {Range} range the range to compare with
     * @param {HTML Node} the node to compare to
     */
    compareNode: function(range, node) {
      var result;
      if (!range || !node) {
        throw new Error('missing arguments.');
      }

      // create a range around the node, so we can use it to compare
      var nodeRange = document.createRange();
      nodeRange.selectNodeContents(node);

      if (range.compareBoundaryPoints(Range.START_TO_END, nodeRange) <= 0) {
        // The selection is entirely before the node.
        result = this.RANGE_BEFORE;
      } else {
        if (range.compareBoundaryPoints(Range.END_TO_START, nodeRange) >= 0) {
          // The selection is entirely after the node.
          result = this.RANGE_AFTER;
        } else {
          // There is some intersection of selection and node.
          var startPoints =
            range.compareBoundaryPoints(Range.START_TO_START, nodeRange);
          var endPoints =
            range.compareBoundaryPoints(Range.END_TO_END, nodeRange);


          if (startPoints < 0) {
            if (endPoints < 0) {
              // The selection is before the node but intersects it.
              result = this.RANGE_BEFORE_INTERSECTS;
            } else {
              // The selection contains the node.
              result = this.RANGE_AROUND;
            }
          } else {
            if (endPoints > 0) {
              // The selection is after the node but intersects it.
              result = this.RANGE_AFTER_INTERSECTS;
            } else {
              if (startPoints === 0 && endPoints === 0) {
                // The selected text and the node are the same.
                result = this.RANGE_IDENTICAL;
              } else {
                // The selection is inside the node.
                result = this.RANGE_INSIDE;
              }
            }
          }
        }
      }

      return result;
    },

    createWalker: function(range) {
      var walker;
      var ancestor = range.commonAncestorContainer;
      // Iterate through the children of the common ancestor.
      walker = document.createNodeIterator(
        ancestor,
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
          acceptNode: function(node) {
            var comparison = _api.compareNode(range, node);
            if (comparison !== _api.RANGE_BEFORE &&
              comparison !== _api.RANGE_AFTER) {
              return NodeFilter.FILTER_ACCEPT;
            } else {
              return NodeFilter.FILTER_SKIP;
            }
          }
        },
        false);

      return walker;
    }

  };

  return _api;
});