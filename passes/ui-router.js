// Copied from https://raw.githubusercontent.com/werk85/astral-angular-annotate-ui-router/master/passes/state.js

var annotateInjectable = require('../lib/annotate-injectable');
var deepApply = require('../lib/deep-apply');

var uiRouterAnnotatorPass = module.exports = {};
uiRouterAnnotatorPass.name = 'angular:annotator:ui-router';
uiRouterAnnotatorPass.prereqs = [
  'angular:annotator:mark'
];

uiRouterAnnotatorPass.run = function (ast, info) {
  deepApply(ast, [{
    "type": "CallExpression",
    "callee": {
      "type": "MemberExpression",
      "object": {
        "ngModule": true
      },
      "property": {
        "type": "Identifier",
        "name": "config"
      }
    }
  }], function (routeChunk) {
    deepApply(routeChunk, [{
      "type": "CallExpression",
      "callee": {
        "type": "MemberExpression",
        "property": {
          "type": "Identifier",
          "name": "state"
        }
      },
      "arguments": [ {},
      {
        "type": "ObjectExpression"
      }
      ]
    }], function (stateChunk) {
      // templateProvider annotations
      deepApply(stateChunk, [{
        "type": "Property",
        "key": {
          "type": "Identifier",
          "name": "templateProvider"
        },
        "value": {
          "type": "FunctionExpression"
        }
      }], function (templateProviderIdentifierChunk) {
        templateProviderIdentifierChunk.value = annotateInjectable(templateProviderIdentifierChunk.value);
      });

      // controller annotations
      deepApply(stateChunk, [{
        "type": "Property",
        "key": {
          "type": "Identifier",
          "name": "controller"
        },
        "value": {
          "type": "FunctionExpression"
        }
      }], function (controllerIdentifierChunk) {
        controllerIdentifierChunk.value = annotateInjectable(controllerIdentifierChunk.value);
      });

      // controllerProvider annotations
      deepApply(stateChunk, [{
        "type": "Property",
        "key": {
          "type": "Identifier",
          "name": "controllerProvider"
        },
        "value": {
          "type": "FunctionExpression"
        }
      }], function (controllerProviderIdentifierChunk) {
        controllerProviderIdentifierChunk.value = annotateInjectable(controllerProviderIdentifierChunk.value);
      });

      // onEnter annotations
      deepApply(stateChunk, [{
        "type": "Property",
        "key": {
          "type": "Identifier",
          "name": "onEnter"
        },
        "value": {
          "type": "FunctionExpression"
        }
      }], function (onEnterIdentifierChunk) {
        onEnterIdentifierChunk.value = annotateInjectable(onEnterIdentifierChunk.value);
      });

      // onExit annotations
      deepApply(stateChunk, [{
        "type": "Property",
        "key": {
          "type": "Identifier",
          "name": "onExit"
        },
        "value": {
          "type": "FunctionExpression"
        }
      }], function (onExitIdentifierChunk) {
        onExitIdentifierChunk.value = annotateInjectable(onExitIdentifierChunk.value);
      });

      // resolve annoations
      deepApply(stateChunk, [{
        "type": "Property",
        "key": {
          "type": "Identifier",
          "name": "resolve"
        },
        "value": {
          "type": "ObjectExpression"
        }
      }], function (resolveChunk) {
        deepApply(resolveChunk, [{
          "type": "Property",
          "key": {
            "type": "Identifier"
          },
          "value": {
            "type": "FunctionExpression"
          }
        }], function (resolveIdentifierChunk) {
          resolveIdentifierChunk.value = annotateInjectable(resolveIdentifierChunk.value);
        });
      });

      // views annotations
      deepApply(stateChunk, [{
        "type": "Property",
        "key": {
          "type": "Identifier",
          "name": "views"
        },
        "value": {
          "type": "ObjectExpression"
        }
      }], function (viewsChunk) {
        deepApply(viewsChunk, [{
          "type": "Property",
          "key": {
            "type": "Identifier"
          },
          "value": {
            "type": "ObjectExpression"
          }
        }], function (viewsIdentifierChunk) {
          deepApply(viewsIdentifierChunk, [{
            "type": "Property",
            "key": {
              "type": "Identifier",
              "name": "controller"
            },
            "value": {
              "type": "FunctionExpression"
            }
          }], function (controllerIdentifierChunk) {
            controllerIdentifierChunk.value = annotateInjectable(controllerIdentifierChunk.value);
          });
        });
      });
    });
  });
};
