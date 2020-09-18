import SlcModel from './slcmodel'
import { SVG } from '@svgdotjs/svg.js'
// import {JSDOM} from 'jsdom'
class SvgConvert{
    constructor(slcModel,foreground,background){
        this.model = slcModel;
        this.foreground = foreground;
        this.background = background;
    }
    convert(index){
        let layer = this.model.layers[index];
        // let dom = new JSDOM();
        let svg = SVG();
        let rect = svg.rect(800,600);
        svg.add(rect);
        let boundaries = layer.boundaries;
        for(let i=0;i<boundaries.length;i++){
            let path = "M ";
            let vertexs = boundaries[i].list;
            for(let j=0;j<vertexs.length;j++){
                path += vertexs[j].x+" ";
                path += vertexs[j].y+" ";
            }
            path+="z";
            svg.path(path).fill(boundaries[i].outer?this.foreground:this.background);
        }
        let svgOutput = svg.toString();
        console.log(svgOutput);
    }
}

export default SvgConvert;