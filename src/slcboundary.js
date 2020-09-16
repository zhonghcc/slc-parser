class SlcBoundary{
    constructor(nums,gaps,list){
        this.nums = nums;
        this.gaps = gaps;
        this.outer = true;
        this.list = [];
    }
    addVertex(vertex){
        this.list.push(vertex);
    }
    adjustOuter(){
        //get rightmost point
        let index = 0;
        let right = this.list[index];
        let max=right.x;
        for(let i=0;i<this.list.length;i++){
            let cur = this.list[i];
            let x = cur.x;
            if(x>max){
                right = cur;
                max = x;
                index = i;
            }
        }
        let p1=this.list[index==0?this.list.length-1:index-1];
        let p2=this.list[index];
        let p3=this.list[index==this.list.length-1?0:index+1];
        let v1=[p2.x-p1.x,p2.y-p1.y];
        let v2=[p3.x-p2.x,p3.y-p2.y];
        let z = v1[0]*v2[1]-v1[1]*v2[0];
        // console.log("boundary z ",z);
        this.outer = z>0;
    }
}
class SlcVertex{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}

export  {SlcBoundary,SlcVertex};