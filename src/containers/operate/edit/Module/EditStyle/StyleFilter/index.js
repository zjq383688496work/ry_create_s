
/**
 * @Author: Along
 * @Date:   2018-06-06

 */

 //文字行高自适应
export function lineHightAdaptation(data,val,key) {
	if((data.name == "text" || data.name == "button") && key == "fontSize"){
		data.data.style.text.lineHeight = val*1.5;
	}
	return data
}
 //自适应图片大小的1/2
export function imageAdaptation(data,attribute) {
	if(attribute && attribute.indexOf("*")>-1){
		if((data.name == "picture"&&data.data.type != "weatherLogo") || data.name == "video" || data.name == "button"){
			const width = parseInt(attribute.split("*")[0]);
			const height = parseInt(attribute.split("*")[1]) 
			data.data.layout.width = parseInt(width/2);
			data.data.layout.height = parseInt(height/2);
		}
	}
	return data 
}
//展示跟屏端一样的显示大小
export function bigStyle(data){
 	let { layout,style } = data
 	Object.keys(layout).map(_=>{
 		if(getAttr(layout[_]) == 'Number'){
 			layout[_] *= 2
 		}
 	})
 	strMake(style)
 	return data
}

//递归解析数据
 function strMake(style){
 	Object.keys(style).map(_=>{
 		if(getAttr(style[_]) == 'Number'){
 			_ != 'opacity' ? style[_] *= 2 : null
 		}else if(getAttr(style[_]) == 'Object'){
 			strMake(style[_])
 		}
 	}) 
 }
 //保存时为真实的数据大小，即1/2大小
 export function smallStyle(){

 }
