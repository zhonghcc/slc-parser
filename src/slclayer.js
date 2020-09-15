import SlcBoundary from './slcboundary'
class SlcLayer{
    constructor(zlayer,nums){
        this.zlayer = zlayer;
        this.nums = nums;
        this.boundaries = [];
    }
    addBoundary(boundary){
        this.boundaries.push(boundary);
    }
}

export default SlcLayer;