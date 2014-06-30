/* jshint newcap: false */
Polymer('qowt-doc', {
  /* jshint newcap: true */
  created: function() {
    this.setAttribute('contenteditable', 'true');
  },
  attached: function() {
    PubSub.subscribe('page-changed', this.handlePageChanged_.bind(this));
  },
  ready: function() {
  },
  domReady: function() {
  },

  paginate: function(page) {
    if (page === undefined) {
      // get the first page
      page = this.querySelector('qowt-page');
    }
    if (page instanceof QowtPage) {

      if (!page.flowInto) {
        var nextPage = page.createFlowInto();

        // TODO(jliebrand): can optimize by adding this to the DOM
        // *after* the flow is done; thereby saving layouts when
        // content is pushed in to the nextPage...
        this.appendChild(nextPage);
      }

      page.flow(page.isOverflowing.bind(page));

      if (nextPage && nextPage.isEmpty()) {
        if (nextPage.parentNode) {
          nextPage.parentNode.removeChild(nextPage);
        }
      }
    }
  },

  // ---------------------- PRIVATE ---------------------

  handlePageChanged_: function(details) {
    // TODO(jliebrand): could double check that page is in the dom
    // although it always should be...
    this.paginate(details.page);
  }


});
