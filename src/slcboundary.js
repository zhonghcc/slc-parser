class SlcBoundary{
    constructor(nums,gaps,list){
        this.nums = nums;
        this.gaps = gaps;
        this.list = [];
    }
    addVertex(vertex){
        this.list.push(vertex);
    }
}
class SlcVertex{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}

export  {SlcBoundary,SlcVertex};