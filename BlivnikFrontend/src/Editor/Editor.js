import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeTags } from "../Redux/reducers/tagState";
import ChordArea from "./ChordArea";
import EditMenu from "./components/EditMenu";
import MenuElements from "./components/MenuElements"
import "./css/Editor.css";
import { rerenderTags } from "./DisplayTags";



//renders second stage of adding a new song -> adding chords
const Editor = (props) =>{
const dispatch = useDispatch();
    useEffect(() => {
      dispatch(changeTags(rerenderTags()));
  },[]);
    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
          dispatch(changeTags(rerenderTags()));
        },1000)

        window.addEventListener('resize', debouncedHandleResize);

        return _ => {
            window.removeEventListener('resize', debouncedHandleResize)}
    });
    return(
        <div>
            <ChordArea/>
            <div className="editArea" id="editArea">{props.processedText}</div>
            <div className="menu">
            <MenuElements/>
            <EditMenu/>
            </div>
            <button className="sendingButton" onClick={() => saveSong(props)}>Odeslat</button>
        </div>
    );

//            <MenuElements tags = {tagState} setTags = {setTagState} editMenuState/>
}

function saveSong(data){
    const testData = {
      songName: data.songName,
      interpret: data.interpret,
      priority: data.priority,
      capo: data.capo,
      processedText: document.getElementById("editArea").innerHTML
    }

  fetch('http://localhost:9000/saveSong', {  

  method: 'POST', 
  headers: { 'Content-Type': 'application/json', AuthToken: localStorage.getItem("loginToken") },
  body: JSON.stringify(testData) 

}).then(response => response.text())
  .then(response => {window.location.href = '/SongList'});//data => this.setState({ postId: data.id })
}

function debounce(fn, ms) {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
  }

export default Editor;