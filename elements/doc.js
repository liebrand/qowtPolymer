Polymer('qowt-doc', {
  ready: function() {
  },
  domReady: function() {
  },

  paginate: function(pageNum) {
    pageNum = pageNum || 0;
    var page;
    var pages = this.querySelectorAll('qowt-page');
    if (pages && (page = pages[pageNum])) {

      if (page.isOverflowing()) {
        console.log('page %d is overflowing', pageNum);

        if (!page.flowInto) {
          var nextPage = page.createFlowInto();

          // TODO(jliebrand): can optimize by adding this to the DOM
          // *after* the flow is done; thereby saving layouts when
          // content is pushed in to the nextPage...
          this.appendChild(nextPage);
        }

        page.flow(page.isOverflowing);

      // } else if (page.isFlowing()) {
      //   page.absorb();
      }

    }
  },


});
