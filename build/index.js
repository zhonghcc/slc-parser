"use strict";

var _slcmodel = _interopRequireDefault(require("./slcmodel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var model = new _slcmodel.default(); // const xhr = new XMLHttpRequest();
// xhr.open("GET", "http://zhonghcc.com/5.slc", true);
// xhr.responseType = "arraybuffer";
// xhr.onload = function () {
//     console.log(xhr.response)
// }
// xhr.send();

model.loadFromFile(1);
console.log(model);