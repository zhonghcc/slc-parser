
import SlcSampleTable from './slcsampletable'
class SlcModel {
    constructor() {
        this.unit = null;
        this.step = null;
        this.version = null;
        this.sliceNums = null;
        this.p = 0;
        this.sampleTables = [];
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
        this._readData(arr);
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
        for(let i=0;i<size;i++){
            let zmin = this._readFloat(arr);
            let thickness = this._readFloat(arr);
            let linewidth = this._readFloat(arr);
            this._readFloat(arr);
            let sampleTable = new SlcSampleTable(zmin,thickness,linewidth);
            this.sampleTables.push(sampleTable);
            console.log(sampleTable);
        }
    }
    _readFloat(arr){
        let len = 4;
        var buf = new ArrayBuffer(len);
        var bufView = new Uint8Array(buf);
        for(let i=0;i<len;i++){
            bufView[i]=arr[this.p+i];
        }

        var dataview = new DataView(buf,0,4);
        this.p+=4;
        //little endian
        var f = dataview.getFloat32(0,true);
        return f;
    }
    _readData(arr){

    }
}


export default SlcModel;