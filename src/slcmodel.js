
import SlcSampleTable from './slcsampletable'
import SlcLayer from './slclayer'
import {SlcBoundary,SlcVertex} from './slcboundary'
class SlcModel {
    constructor() {
        this.unit = null;
        this.step = null;
        this.version = null;
        this.sliceNums = null;
        this.p = 0;
        this.sampleTables = [];
        this.layers = [];
        this.xxyy = [];
    }
    loadFromFile(file) {
        this.unit = 'file';
        this.step = '5';
        this.sliceNums = 10;
    }
    loadFromArray(arr){
        let start = new Date().getTime();
        this.p=0;
        this._readHeader(arr);
        this._readTable(arr);
        this._readData(arr);
        this.box();
        this.sliceNums = this.layers.length;
        console.log(this);
        console.log("read model cost:",new Date().getTime()-start);
    }
    box(){
        let first = this.layers[0];
        this.xxyy = first.xxyy;
        for(let i=0;i<this.layers.length;i++){
            let curxxyy = this.layers[i].xxyy;
            if(curxxyy[0]<this.xxyy[0]){
                this.xxyy[0] = curxxyy[0];
            }
            if(curxxyy[1]>this.xxyy[1]){
                this.xxyy[1] = curxxyy[1];
            }
            if(curxxyy[2]<this.xxyy[2]){
                this.xxyy[2] = curxxyy[2];
            }
            if(curxxyy[3]>this.xxyy[3]){
                this.xxyy[3] = curxxyy[3];
            }
        }
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
    _readData(arr){
        while(true){
            let zlayer = this._readFloat(arr);
            let boundaryNums = this._readInteger(arr);
            // console.log(zlayer,boundaryNums);
            if(boundaryNums==0xFFFFFFFF){
                console.log("get the end of file success return");
                return;
            }else{
                let layer = new SlcLayer(zlayer,boundaryNums);
                // console.log(layer);
                for(let i=0;i<boundaryNums;i++){
                    let boundary = this._readBoundary(arr);
                    layer.addBoundary(boundary);
                }
                layer.box();
                this.layers.push(layer);
            }
        }
    }
    _readBoundary(arr){
        let nums = this._readInteger(arr);
        let gaps = this._readInteger(arr);
        let boundary = new SlcBoundary(nums,gaps);
        for(let i=0;i<nums;i++){
            let x = this._readFloat(arr);
            let y = this._readFloat(arr);
            let vertex = new SlcVertex(x,y);
            boundary.addVertex(vertex);
        }
        boundary.adjustOuter();
        boundary.box();
        return boundary;
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
    _readInteger(arr){
        let len = 4;
        var buf = new ArrayBuffer(len);
        var bufView = new Uint8Array(buf);
        for(let i=0;i<len;i++){
            bufView[i]=arr[this.p+i];
        }

        var dataview = new DataView(buf,0,4);
        this.p+=4;
        //little endian
        var f = dataview.getUint32(0,true);
        return f;
    }
}


export default SlcModel;