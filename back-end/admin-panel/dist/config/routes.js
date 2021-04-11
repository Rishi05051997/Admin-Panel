'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _associate = require('../api/controllers/associate.controller');

var _associate2 = _interopRequireDefault(_associate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = exports.router = _express2.default.Router();

// associates routes
router.get('/associates', _associate2.default.finadAll);
router.post('/associates', _associate2.default.create);
//# sourceMappingURL=routes.js.map