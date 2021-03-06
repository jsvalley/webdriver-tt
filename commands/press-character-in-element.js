'use strict';
let SeleniumWebdriver = require('selenium-webdriver');
var webtestDriver = require('../src/web-test-driver');
const RE_STR  = '["]?([^\"]+)["]?'; // e.g. foo.bar, "foo.bar"

/**
 * e.g. enter text 'foo bar' into .foo.bar
 */
module.exports = {
  name: 'press chracter in element',
  help: 'press <character> into "<selector>',
  regExp: new RegExp(`^press ${RE_STR} into ${RE_STR}`),
  func: /** must return a Promise, so that it can be chained with next command*/
    function(character, selector) {

      return webtestDriver.findBy('css', selector)
        .then(element => {
          let key = character;
          if (character.match(/^[A-Z][A-Z_]+$/)) {
            key = SeleniumWebdriver.Key[key];
          }
          //TODO. combination keys. e.g. ALT+ENTER
          element.sendKeys(key);
        });
    }
};
