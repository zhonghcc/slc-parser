"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class SlcModel {
  constructor() {
    this.unit = null;
    this.step = null;
    this.sliceNums = null;
  }

  loadFromFile(file) {
    this.unit = 'file';
    this.step = '5';
    this.sliceNums = 10;
  }

}

var _default = SlcModel;
exports.default = _default;