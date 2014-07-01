
window.FlowCells = {
  addMixin: function(module) {
    "use strict";

    var funcs = {

      /**
       * This will recurse in to each child (aka cell) and "flow" it
       *
       * @param {boolean} name argument for x y z
       */
      flow: function(overflowingFunc) {
        if (!this.flowInto) {
          throw new Error(this.nodeName +
                          ' tried to flow without having a flowInto');
        }

        // step 1a - get meta data on cells
        var nonFlowingCells = [];
        var cellMetaData = [];
        for (var i = 0; i < this.childElementCount; i++) {
          var cell = this.children[i];
          if (cell.supports('flow') && !cell.isFlowing()) {
            nonFlowingCells.push(cell);
          }
          cellMetaData.push({
            cell: cell,
            height: cell.contentHeight()
          });
        }
        assert(
          nonFlowingCells.length === 0 ||
          nonFlowingCells.length === this.childElementCount,
          'either all cells should be flowing or not');

        // step 1b - make sure all cells are flowing
        for (var i = 0; i < nonFlowingCells.length; i++) {
          var cellFlowInto = nonFlowingCells[i].createFlowInto();
          // note: uses insert at END to make sure the
          // cells in our row.flowInto are correctly aligned
          DomUtils.insertAtEnd(this.flowInto, cellFlowInto);
        }

        // step 2 - sort cells by height
        cellMetaData = cellMetaData.sort(function(a, b) {
          return a.height < b.height;
        });

        // step 3 - from tallest to shortest, flow
        for (var i = 0; i < this.childElementCount; i++) {
          var cell = cellMetaData[i].cell;
          cell.flow(overflowingFunc);

          // TODO(jliebrand): once the parent overflowingFunc returns false
          // then we need to pass in our own overflowingfunc to the cells
          // where they should flow for as long as their contentHeight
          // does not exceed their own td height...
          // TODO(jliebrand): think about how the "once no longer overflowing"
          // works for REFLOW...
          // SHOULD be straight forward; similar to other flow algorithms:
          // 1- pick source (this or flowInto)
          // 2- pick tallest cell on that source
          // 3- flow that cell using given overflowingFunc
          // 4- now flow the rest of the cells in tallest to shortest order
          //    using a new overflowing func that checks the child cell's
          //    content height against this rows own offsetHeight
        }

        // step 4 - normalize in case this or flowInto have ONLY empty cells
        this.normalizeFlow();
      },

      unflow: function() {
        throw new Error('TODO: should unflow entire CHAIN!');
      },


      // ----------------------- PRIVATE ------------------


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






