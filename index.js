const SlcModel = require ('./slcmodel');
var model = new SlcModel();
const xhr = new XMLHttpRequest();
xhr.open("GET", "http://zhonghcc.com/5.slc", true);
xhr.responseType = "arraybuffer";
xhr.onload = function () {
    console.log(xhr.response)
}
xhr.send();
model.loadFromFile(1);
console.log(model);