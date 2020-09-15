
class SlcModel {
    constructor() {
        this.unit = null;
        this.step = null;
        this.version = null;
        this.sliceNums = null;
        this.p = 0;
    }
    loadFromFile(file) {
        this.unit = 'file';
        this.step = '5';
        this.sliceNums = 10;
    }
    loadFromArray(arr){
        this.p=0;
        this._readHeader(arr);
        this._readTable(arr);
        console.log(this);
    }
    _readHeader(arr){
        var headerStr = "";
        while(this.p++<2048){
            var b = arr[this.p];
            if(b==0x0d){
                if(arr[this.p+1]==0x0a&&arr[this.p+2]==0x1a){
                    this.p = this.p+3;
                    break;
                }else{
                    console.log("read header error,break file");
                    return;
                }
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
        //skip space
        this.p+=256;
    }
    _readTable(arr){
        let size = arr[this.p++];
        console.log("total entry size=",size);
    }
}


export default SlcModel;