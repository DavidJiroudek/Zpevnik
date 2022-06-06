import { addTag } from '../Redux/reducers/tagState';
import tagsData from "./components/TagsData";

//function to show sing of tag immediately after adding in editor 
export const displayChord = (counter, dispatch) =>{
    const element = document.getElementById(counter);
    const data = tagsData(element);
    dispatch(addTag(combineData(data)));
}

export const rerenderTags = () =>{
    const allElements = document.getElementById("editArea").getElementsByTagName("*")
    const jsxData = [];
      for (let i of allElements) {
        const data = tagsData(i);
        if(data !== null){
          jsxData.push(combineData(data))
        }
      }
    return(jsxData);
    
}

const combineData=(data)=>{
    return({style:data.style, id:data.tagId +"Sign", className:data.className, key:data.tagId +"Sign",tagId:data.tagId , textValue:data.value + data.sufix, params:data.params})

}