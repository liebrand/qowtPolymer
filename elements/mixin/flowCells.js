(function() {
  "use strict";

  // merge in the FlowingElement mixin
  window.FlowCells = mergeMixin(FlowingElement, {

    supports_: ['flow-cells'],

    /**
     * This will recurse in to each child (aka cell) and "flow" it
     *
     * 1 - make sure all cell's have their own 'flowInto's
     * 2 - move all content to their flowInto's
     *     otherwise the overflowingFunc is no good to us when
     *     flowing an individual cell (since another cell in the
     *     row might still be causing the page to overflow)
     * 3 - flow the tallest cell using the overflowingFunc. This will
     *     now ensure our row "fits" on the page
     * 4 - now flow the other cells using a custom overflowing
     *     function that will return true if the cell is heigher than
     *     our row; this will ensure we dont grow the row further
     * 5 - normalize
     *
     * @param {boolean} name argument for x y z
     */
    flow: function(overflowingFunc) {
      if (!this.flowInto) {
        throw new Error(this.nodeName +
          ' tried to flow without having a flowInto');
      }

      // step 1 - make sure all cells have their own 'flowInto's
      this.constructFlowIntos_();

      // step 2 - move all content to their flowInto's
      this.forceFlowAllContent_();

      // step 3 - flow the tallest cell using the overflowingFunc
      var cellMetaData = this.getCellMetaData_(this.flowInto);
      var tallestMetaData = cellMetaData.shift();
      var tallestCell = this.children[tallestMetaData.cellIndex];
      tallestCell.flow(overflowingFunc);

      // step 4 - now flow the remaining cells using a custom overflowing func
      var cachedRowHeight = this.offsetHeight;
      var rowOverflowing = function() {
        return this.offsetHeight > cachedRowHeight;
      };

      for (var i = 0; i < cellMetaData.length; i++) {
        var cell = this.children[cellMetaData[i].cellIndex];
        cell.flow(rowOverflowing.bind(this));
      }

      // step 5 - normalize in case this or flowInto have ONLY empty cells
      this.normalizeFlow();
    },

    unflow: function() {
      throw new Error('TODO: should unflow entire CHAIN!');
    },


    // ----------------------- PRIVATE ------------------

    constructFlowIntos_: function() {
      var nonFlowingCellsSelector = ':scope > :not([data-named-flow])';
      var nonFlowingCells = this.querySelectorAll(nonFlowingCellsSelector)
      assert(
        nonFlowingCells.length === 0 ||
        nonFlowingCells.length === this.childElementCount,
        'Either all cells should be flowing or none should be');
      for (var i = 0; i < nonFlowingCells.length; i++) {
        var cellFlowInto = nonFlowingCells[i].createFlowInto();
        DomUtils.insertAtEnd(this.flowInto, cellFlowInto);
      }
    },

    forceFlowAllContent_: function() {
      for (var i = 0; i < this.childElementCount; i++) {
        var cell = this.children[i];
        // TODO(jliebrand): using flow(function(){return true}) is expensive
        // should we add a forceFlowAllContent() to FlowingElement mixin?
        cell.flow(function() {
          return true;
        });
      }
    },

    getCellMetaData_: function(from) {
      // get meta data on cells in 'from'
      var cellMetaData = [];
      for (var i = 0; i < from.childElementCount; i++) {
        var cell = from.children[i];
        cellMetaData.push({
          cellIndex: i,
          height: cell.contentHeight()
        });
      }

      // sort data by height
      cellMetaData = cellMetaData.sort(function(a, b) {
        return a.height < b.height;
      });

      return cellMetaData;
    }

  });

})();