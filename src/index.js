import SlcModel from './slcmodel';
import SvgConvert from './svgconvert';
import axios from 'axios';
var model = new SlcModel();
// const xhr = new XMLHttpRequest();
// xhr.open("GET", "http://zhonghcc.com/5.slc", true);
// xhr.responseType = "arraybuffer";
// xhr.onload = function () {
//     console.log(xhr.response)
// }
// xhr.send();
axios.get('http://zhonghcc.com/5.slc',{
// axios.get('http://zhonghcc.com/ceshi1.slc',{
  responseType:'arraybuffer'
})
  .then(response => {
    // console.log(typeof(response.data));
    // console.log(Object.keys(response.data));
    // console.log(response.data[0]);
    // console.log(response);
    console.log("start process model")
    model.loadFromArray(response.data);
    let convert = new SvgConvert(model,'#FFFFFF','#000000',800,600,15.0,8.4);
    convert.convert(0);
  })
  .catch(function (error) {
    console.log(error);
  });
// model.loadFromFile(1);
// console.log(model);