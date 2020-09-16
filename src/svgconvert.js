import SlcModel from './slcmodel'
import svg from 'svg-builder'
class SvgConvert{
    constructor(slcModel,foreground,background){
        this.model = slcModel;
        this.foreground = foreground;
        this.background = background;
    }
    convert(index){
        let layer = this.model.layers[index];
        let builder = svg.newInstance();
        builder.width(800);
        builder.height(600);
        builder.rect({width:800,height:600,fill:this.background});
        let boundaries = layer.boundaries;
        for(let i=0;i<boundaries.length;i++){
            let path = "M ";
            let vertexs = boundaries[i].list;
            for(let j=0;j<vertexs.length;j++){
                path += vertexs[j].x*50+400+" ";
                path += vertexs[j].y*50+200+" ";
            }
            path+="z";
            builder.path({d:path,fill:boundaries[i].outer?this.foreground:this.background});
        }
        // builder.path({d:'M 100 100 L 300 100 L 200 300 z',stroke:'#FF0000'})
        let svgOutput = builder.render();
        console.log(svgOutput);
    }
}

export default SvgConvert;