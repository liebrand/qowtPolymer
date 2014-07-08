/* jshint newcap: false */
Polymer('qowt-styles', {
  /* jshint newcap: true */
  created: function() {
    this.createRulesContainer_();
  },
  domReady: function() {
  },
  addStyle: function(style) {
    this.styles_[style.name] = style;
    this.updateCssRules_();
  },

  // ---------------------------
  styles_: {},

  createRulesContainer_: function() {
    if (this.rulesElement) {
      this.removeChild(this.rulesElement);
    }
    this.rulesElement = document.createElement('style');
    this.appendChild(this.rulesElement);
  },

  getRules_: function(styleName) {
    var resolvedRules = {};
    var thisStyle = this.styles_[styleName];
    var basedOn = thisStyle.basedOn;
    if (basedOn) {
      // recurse
      resolvedRules = this.getRules_(basedOn);
    }

    for(var rule in thisStyle.rules) {
      // this will overwrite basedOn rules (like we want)
      resolvedRules[rule] = thisStyle.rules[rule];
    }
    return resolvedRules;
  },

  updateCssRules_: function() {
    // could be made smarter to not blow ALL styles away each time
    this.createRulesContainer_();



    // now write each style (obviously use the CssManager for this!)
    var cssString = '';
    for(var styleName in this.styles_) {

      cssString += '.' + styleName + ' {';

      var rules = this.getRules_(styleName);

      for(var key in rules) {
        cssString += key + ': ' + rules[key] + '; ';
      }
      cssString += '} ';

    }

    this.rulesElement.textContent = cssString;
  }
});
