import { useDispatch, useSelector } from "react-redux";
import { changeEditMenu } from "../Redux/reducers/editMenuState";
import "./css/ChordArea.css"; 


const ChordArea = () => {
const tags = useSelector((state) => state.tagState.value)
const dispatch = useDispatch();
    return(<div className = "chordArea" id="chordArea">{tags.map(i=><span style={i.style} className={i.className} id={i.id} onClick={typeSwitch(dispatch, i.className, i.tagId)} key={i.key} >{i.textValue}</span>)}</div>);

}
const typeSwitch = (dispatch, key, id) =>{
    switch (key) {
        case "chordSign":           
            return ()=>{dispatch(changeEditMenu({type:"chord", id}))}

        case "verseSign":       
            return ()=>{dispatch(changeEditMenu({type:"verse", id}))}

        case "dynSign":       
            return ()=>{dispatch(changeEditMenu({type:"dyn", id}))}
        default:
            return ()=>{};
    }

}

export default ChordArea;