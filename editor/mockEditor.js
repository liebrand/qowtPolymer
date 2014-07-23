
(function() {

  // this "editor" is nothing more than a mock; it merely makes sure
  // content is "unflowed" BEFORE the edit happens.
  // The real solution for editing is to have
  // "Pagination as an operational transform" but that is not part of
  // the initial move to Polymer Elements.

  // TODO(jliebrand): this requires the "unflow" to work;
  // first make sure "flow" for ALL content (including tables!) works!

  document.addEventListener('keydown', _handleKeyDown);
  document.addEventListener('textInput', _handleTextInput);
  document.addEventListener('paste', _handleClipboard);
  document.addEventListener('cut', _handleClipboard);
  document.addEventListener('drop', _handleDrop);

  function _handleKeyDown(evt) {
    // debugger;
    // var topLevelElements = [];
    // var sel = window.getSelection();
    // if (sel.rangeCount > 0) {
    //   var range = sel.getRangeAt(0);
    //   var walker = RangeUtils.createWalker(range);
    //   while (walker.nextNode()) {
    //     var node = walker.referenceNode;
    //     while(node && !(node.parentNode instanceof QowtSection)) {
    //       node = node.parentNode;
    //     }
    //     if (node && node.parentNode instanceof QowtSection) {
    //       topLevelElements.push(node);
    //     }
    //     topLevelElements = ArrayUtils.unique(topLevelElements);
    //   }
    // }

    // var i;
    // // make sure all pages ignore any changes we make during unflow since
    // // we do NOT want to paginate because of unflowing...
    // var pages = document.querySelectorAll('qowt-page');
    // for (i = 0; i < pages.length; i++) {
    //   pages[i].ignoreMutations();
    // }

    // // unflow all relevant top level elements
    // topLevelElements.forEach(function(element) {
    //   if (element.supports && element.supports('flow') &&
    //       element.isFlowing()) {
    //     element.unflow();
    //   }
    // });

    // // and now re-enable the pages listening for mutations again so
    // // that the subsequent edit that will happen WILL be picked up, and
    // // it WILL cause a re-paginate
    // for (i = 0; i < pages.length; i++) {
    //   pages[i].listenForMutations();
    // }
  }

  function _handleTextInput(evt) {

  }

  function _handleClipboard(evt) {

  }

  function _handleDrop(evt) {

  }




})();