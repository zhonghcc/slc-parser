
class SlcModel {
    constructor() {
        this.unit = null;
        this.step = null;
        this.version = null;
        this.sliceNums = null;
    }
    loadFromFile(file) {
        this.unit = 'file';
        this.step = '5';
        this.sliceNums = 10;
    }
    loadFromArray(arr){
        this._readHeader(arr);
        console.log(this);
    }
    _readHeader(arr){
        var i=0;
        var headerStr = "";
        while(i++<2048){
            var b = arr[i];
            if(b==0x0d){
                break;
            }
            var c = String.fromCharCode(b);
            headerStr+=c;
        }
        var headers = headerStr.split('\n');
        headers.forEach(header =>{
            var kv = header.split(' ');
            if(kv.length!=2){
                console.log("read header error line:",header);
                return;
            }else{
                let k = kv[0];
                let v = kv[1];
                switch(k){
                    case 'SLCVER':
                        this.version=v;break;
                    case '-UNITS':
                        this.unit = v;break;
                    default:
                        console.log("no match header:",header);
                }
            }
        });
    }
}


export default SlcModel;