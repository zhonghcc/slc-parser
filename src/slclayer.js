import SlcBoundary from './slcboundary'
class SlcLayer{
    constructor(zlayer,nums){
        this.zlayer = zlayer;
        this.nums = nums;
        this.boundaries = [];
        this.xxyy = [];
    }
    box(){
        let first = this.boundaries[0];
        this.xxyy = first.xxyy;
        for(let i=0;i<this.boundaries.length;i++){
            let curxxyy = this.boundaries[i].xxyy;
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
    addBoundary(boundary){
        this.boundaries.push(boundary);
    }
}

export default SlcLayer;