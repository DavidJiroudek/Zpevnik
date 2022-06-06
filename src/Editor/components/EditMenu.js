import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeEditMenu } from "../../Redux/reducers/editMenuState";
import { addTag, changeTags, removeTagById } from "../../Redux/reducers/tagState";
import "../css/EditMenu.css"

const EditMenu = ()=>{
    const tagState = useSelector((state) => state.tagState.value)
    const dispatch = useDispatch();
    const menuData = useSelector((state) => state.editMenuState.value)

    const element = menuData === null ? null : document.getElementById(menuData.id);
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
                        <button onClick={()=>menuData.unwrap()}>Smazat</button>
                    </div>
                    </span>
            )

        case "verse":
            return(
                <span className="editMenu">
                    <div className="verseMenu">
                    <button onClick={()=>{  element.setAttribute("verseValue", "ref")
                                            element.setAttribute("verseType", "ref")
                                            dispatch(changeEditMenu(null));
                                            console.log(tagState);
                                            let clonedChord = {}
                                             for (let i = 0; i < tagState.length; i++) {
                                                if(tagState[i].tagId === menuData.id){
                                                    clonedChord = {...tagState[i]}
                                                    dispatch(removeTagById(tagState[i].id))
                                                    break;
                                                }     
                                            }
                                            clonedChord.textValue = "ref)"
                                            dispatch(addTag(clonedChord))
                                          }}>Ref</button>
                    <button>Ref*</button>
                    <button>Int</button>
                    <button>Int*</button>
                    <input type="number"></input>
                    </div>
                </span>
            )
        default:
            return(
            <span className="editMenu">

            </span>
            )
    }

}
export default EditMenu;