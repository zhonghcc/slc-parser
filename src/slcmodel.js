
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


export default SlcModel;