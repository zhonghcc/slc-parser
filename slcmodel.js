
function SlcModel(){
    this.unit=null;
    this.step=null;
    this.sliceNums=null;

}

SlcModel.prototype.loadFromFile = function (file){
    this.unit='file';
    this.step='5';
    this.sliceNums =10;
}

module.exports = SlcModel;