import SlcModel from './slcmodel'
import svg from 'svg-builder'
class SvgConvert{
    constructor(slcModel){
        this.model = slcModel;
    }
    convert(index){
        let layer = this.model.layers[index];
        let builder = svg.newInstance();
        builder.width(800);
        builder.height(600);
        builder.path({d:'M 100 100 L 300 100 L 200 300 z',stroke:'#FF0000'})
        let svgOutput = builder.render();
        console.log(svgOutput);
    }
}

export default SvgConvert;