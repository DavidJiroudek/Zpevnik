import { useState } from "react";
import { increment } from "../Redux/reducers/tagCounter";
import calculatePosition from "./CalculatePosition";
import {displayChord} from "./DisplayTags";

//adds given tag to innerhtml
const addTag = (tagType, tagValue, tagSufix, counter, dispatch)=> {//params:  tagState, setTagState, counter, setCounter, setEditMenuState
    if (document.getSelection) {
        var sel = document.getSelection();
        var parentEl = sel.getRangeAt(0).commonAncestorContainer.parentElement;
        var name = parentEl.className;

        while (name != 'verse') {
           parentEl = parentEl.parentElement;
           name = parentEl.className;
           if(name == 'App'){
               alert("Špatné označení")
                return null;
           }
        }
        dispatch(increment());
        let textVal = parentEl.innerHTML;
        let startOffset = getSelectionOffsetRelativeTo(parentEl, true);
        let endOffset = getSelectionOffsetRelativeTo(parentEl, false);
        let calculOffset;
        let tag;
        let endTag;
        //tagType resolver
        switch (tagType) {
          case "ch":
            if(endOffset - startOffset === 0){
              alert("Označte pouze jeden znak pro vložení této značky");
              return null;
            }
            
            calculOffset = calculatePosition(startOffset, startOffset+1, textVal);
            tag = createChordStartTag(tagType, tagValue, tagSufix, counter);
            endTag = createEndTag(tagType);
            parentEl.innerHTML = textVal.substring(0, calculOffset.startPosition) + tag + textVal.substring(calculOffset.startPosition, calculOffset.endPosition) + endTag + textVal.substring(calculOffset.endPosition, textVal.length);
            break;
          case "dyn":
            calculOffset = calculatePosition(startOffset, startOffset, textVal);
            tag = createDynTag(tagType, tagValue, counter);
            endTag = createEndTag(tagType);
            parentEl.innerHTML = textVal.substring(0, calculOffset.startPosition) + tag + textVal.substring(calculOffset.startPosition, calculOffset.endPosition) + endTag + textVal.substring(calculOffset.endPosition, textVal.length);
            console.log(parentEl.innerHTML);
            break;
        
          default:
            return null;
        }

        displayChord(counter, dispatch);

    }
}




const createChordStartTag = (tagType, tagValue, tagSufix, counter) =>{
  if(tagSufix === ""){
    return "<" + tagType + " chordValue = "+ tagValue + " sufix = ''" + " id = " + counter + " >";
  }
    return "<" + tagType + " chordValue = "+ tagValue + " sufix = " + tagSufix + " id = " + counter + " >";
}
const createDynTag = (tagType, tagValue, counter)=>{
  return "<" + tagType + " dynType = "+ tagValue + " id = " + counter + ">";
}

const createEndTag = (tagType) =>{
    return "</" + tagType +">";
}
  



//calculates relative offet of selection
  const getSelectionOffsetRelativeTo = (parentElement, isStart, currentNode) =>{
  
    var currentSelection, currentRange,
        offset = 0,
        prevSibling,
        nodeContent;
        
    if (!currentNode && isStart === true){
      currentSelection = window.getSelection();
      currentRange = currentSelection.getRangeAt(0);
      currentNode = currentRange.startContainer;
      offset += currentRange.startOffset;
    }
    if (!currentNode && isStart === false){
        currentSelection = window.getSelection();
        currentRange = currentSelection.getRangeAt(0);
        currentNode = currentRange.startContainer;
        offset += currentRange.endOffset;
      }
      
    if (currentNode === parentElement){
      return offset;
    }
    
    if (!parentElement.contains(currentNode)){
      return -1;
    }
    
    while ( prevSibling = (prevSibling  || currentNode).previousSibling ){
      nodeContent = prevSibling.innerText || prevSibling.nodeValue || "";
      offset += nodeContent.length;
    }
    
    return offset + getSelectionOffsetRelativeTo( parentElement, isStart, currentNode.parentNode);
  
  }



export default addTag