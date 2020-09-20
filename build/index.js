"use strict";

var _slcmodel = _interopRequireDefault(require("./slcmodel"));

var _svgconvert = _interopRequireDefault(require("./svgconvert"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var model = new _slcmodel.default(); // const xhr = new XMLHttpRequest();
// xhr.open("GET", "http://zhonghcc.com/5.slc", true);
// xhr.responseType = "arraybuffer";
// xhr.onload = function () {
//     console.log(xhr.response)
// }
// xhr.send();

_axios.default.get('http://zhonghcc.com/5.slc', {
  // axios.get('http://zhonghcc.com/ceshi1.slc',{
  responseType: 'arraybuffer'
}).then(response => {
  // console.log(typeof(response.data));
  // console.log(Object.keys(response.data));
  // console.log(response.data[0]);
  // console.log(response);
  console.log("start process model");
  model.loadFromArray(response.data);
  let convert = new _svgconvert.default(model, '#FFFFFF', '#000000', 800, 600, 15.0, 8.4);
  convert.convert(0);
}).catch(function (error) {
  console.log(error);
}); // model.loadFromFile(1);
// console.log(model);