require('angular'); // Don't assign result...angular/browserify doesn't like it...

module.exports = {
  'ssp-generator': angular.module('ssp-generator', [])
    .directive('generator',   require('./modules/ssp-generator/directives/generator/directive'))
};