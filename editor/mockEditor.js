
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

  }

  function _handleTextInput(evt) {

  }

  function _handleClipboard(evt) {

  }

  function _handleDrop(evt) {

  }




})();