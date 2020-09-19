import SlcModel from './slcmodel'
import convert from 'xml-js'
class SvgConvert{
    constructor(slcModel,foreground,background,width,height){
        this.model = slcModel;
        this.foreground = foreground;
        this.background = background;
        this.width = width;
        this.height = height;
    }
    convert(index){
        let svg = {
            type:"element",
            name:"svg",
            attributes:{
                height:this.height,
                width:this.width,
                style:"background-color:"+this.background+";",
                xmlns:"http://www.w3.org/2000/svg",
                "xmlns:xlink":"http://www.w3.org/1999/xlink"
            },
            elements:[]
        }

        let doc = {
            elements:[
            ]
        }
        doc.elements.push(svg);
        let trans = "";
        let rect = {
            type:"element",
            name:"g",
            attributes:{
                transform:trans
            },
            elements:[]
        };
        svg.elements.push(rect);
        let layer = this.model.layers[index];
        let realheight = layer.xxyy[3]-layer.xxyy[2];
        let realwidth = layer.xxyy[1]-layer.xxyy[0];
        let scale = 1;
        if(realheight/realwidth>this.height/this.width){
            scale = this.height/realheight;
        }else{
            scale = this.width/realwidth;
        }
        trans+="rotate("+scale+","+scale+");";
        let boundaries = layer.boundaries;
        for(let i=0;i<boundaries.length;i++){
            let path = "M ";
            let vertexs = boundaries[i].list;
            for(let j=0;j<vertexs.length;j++){
                path += vertexs[j].x+" ";
                path += vertexs[j].y+" ";
            }
            path+="z";
            let pathelement = {
                type:"element",
                name:"path",
                attributes:{
                    d:path,
                    fill:boundaries[i].outer?this.foreground:this.background
                }
            }
            rect.elements.push(pathelement);
        }
        let xml = convert.js2xml(doc,{compact:false,fullTagEmptyElement:true});
        // console.log(convert.xml2json(xml,{compact:false}));
        console.log(xml);
    }
}

export default SvgConvert;