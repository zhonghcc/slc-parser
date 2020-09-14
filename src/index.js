import SlcModel from './slcmodel';
import axios from 'axios';
var model = new SlcModel();
// const xhr = new XMLHttpRequest();
// xhr.open("GET", "http://zhonghcc.com/5.slc", true);
// xhr.responseType = "arraybuffer";
// xhr.onload = function () {
//     console.log(xhr.response)
// }
// xhr.send();
axios.get('http://zhonghcc.com/5.slc')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
model.loadFromFile(1);
console.log(model);