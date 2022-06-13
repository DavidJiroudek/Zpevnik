import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Editor/css/Editor.css"
import {rerenderTags} from "../Editor/DisplayTags";
import ChordView from "./ChordView";

//component for showing song with tags
const Song = () => {
    let {id} = useParams();
    const [displayedTags, setdisplayedTags] = useState([]);
    const[songHtml, setSongHtml] = useState("");

    //load html of song
    useEffect(() => {
        fetch('http://localhost:9000/browseSongs/getSongData?songId=' + id,{  

            method: 'GET', 
            headers: { 'Content-Type': 'text/plain' }
          
          }).then(response => response.json())
      .then((result) => {
                setSongHtml(result)
                setTimeout(() => {setdisplayedTags(rerenderTags())}, 200);});
    },[]);

    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            setdisplayedTags(rerenderTags());
        },1000)

        window.addEventListener('resize', debouncedHandleResize);

        return _ => {
            window.removeEventListener('resize', debouncedHandleResize)}
    });

return(
    <>
    <div className="editArea" id="editArea" dangerouslySetInnerHTML={{__html: songHtml.processedText}}>{}</div>
    <ChordView signs = {displayedTags}/>
    {localStorage.getItem("loginToken") !== null?<button className="sendingButton" onClick={() => removeSong(id)}>Smazat píseň</button>:null}
    </>
    );

}
const removeSong = (id) =>{
    fetch('http://localhost:9000/browseSongs/removeSong?songId=' + id,{  

        method: 'GET', 
        headers: { 'Content-Type': 'text/plain', AuthToken: localStorage.getItem("loginToken") }
      
      }).then(response => response.text())
  .then((result) => {alert(result)});
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



export default Song;