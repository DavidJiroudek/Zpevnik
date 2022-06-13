import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeEditMenu } from "../../Redux/reducers/editMenuState";
import { addTag, changeTags, removeTagById } from "../../Redux/reducers/tagState";
import "../css/EditMenu.css"
import { rerenderTags } from "../DisplayTags";

const EditMenu = ()=>{
    const tagState = useSelector((state) => state.tagState.value)
    const dispatch = useDispatch();
    const menuData = useSelector((state) => state.editMenuState.value)
    const element = menuData === null ? null : document.getElementById(menuData.id);
    const params = {tagState,
                    dispatch,
                    menuData,
                    element}
    if(element ===null){
        return(
            <span className="editMenu">

            </span>
            )
    }
    switch (menuData.type) {
        case "chord":
            return(
                <span className="editMenu">
                    <div className="chordMenu">
                        <button onClick={() => deleteTagAndSign(params)}>Smazat</button>
                    </div>
                    </span>
            )

        case "verse":
            return(
                <span className="editMenu">
                    <div className="verseMenu">
                    <button onClick={()=>{setVerseType("verse", "verse", params)}}>Sloka</button>
                    <button onClick={()=>{setVerseType("R", "ref", params)}}>Ref</button>
                    <button>Ref*</button>
                    <button onClick={()=>{setVerseType("I", "int", params)}}>Int</button>
                    <button>Int*</button>
                    <button onClick={()=>{setVerseType("Rec", "rec", params)}}>Rec</button>
                    <button>Rec*</button>
                    <input type="number"></input>
                    </div>
                </span>
            )
        case "dyn":
        default:
            return(
            <span className="editMenu">
                <div className="chordMenu">
                    <button onClick={() => deleteTagAndSign(params)}>Smazat</button>
                </div>
            </span>
            )
    }
}

const setVerseType = (verseValue, verseType, {tagState, dispatch, menuData, element}, number) =>{
    element.setAttribute("verseValue", verseValue)
    element.setAttribute("verseType", verseType)
    dispatch(changeEditMenu(null));
    // const result = tagState.filter(i=>i.tagId === menuData.id)[0]
    // let clonedResult = {...result};
    // clonedResult.textValue = verseValue + number + ")";
    recalculateVerses(dispatch);
}

const deleteTagAndSign = ({tagState, dispatch, menuData, element}) => {
    element.outerHTML = element.innerHTML
    dispatch(removeTagById(tagState.filter(i=>i.tagId === menuData.id)[0].id))
}


const recalculateVerses = (dispatch) =>{
    const types = [{verseType:"verse", verseValue:""}, {verseType:"int", verseValue:"I"}, {verseType:"rec", verseValue:"Rec"}]
    const parts = document.getElementsByTagName("verse");
    for (const type of types) {
        let counter = 1;
        for (const iterator of parts) {
            if(iterator.getAttribute("verseType") === type.verseType){
                iterator.setAttribute("verseValue", type.verseValue + ((counter === 1 && type.verseType !== "verse") ? "" : counter))
                counter++;
            }
        }
    }

    dispatch(changeTags(rerenderTags()));
}
export default EditMenu;