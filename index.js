const SlcModel = require ('./slcmodel');
var model = new SlcModel();
model.loadFromFile(1);
console.log(model);