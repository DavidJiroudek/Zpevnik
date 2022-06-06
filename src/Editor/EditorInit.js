import React, { useState } from "react";
import "./css/EditorInit.css";
import Editor from "./Editor";



let textEditEnabled = true;
let givenText = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nEtiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu.\nMaecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui.\n\nPraesent id justo in neque elementum ultrices. Excepteur\nsint occaecat cupidatat non proident,\nsunt in culpa qui officia deserunt mollit anim id est laborum.\nQuisque tincidunt scelerisque libero.";
let finalResponce;

//generates verses and rows from plain text
const processText = (attr, state) => {
    textEditEnabled = false;
    var splited = document.getElementById("textEditArea").value.split('\n\n');
    var m = 0;
    var n = 0;


    //beacuse warning of unrecognized element -- didnt work
    // let rofl = [];
    // splited.forEach(i => {
    //     rofl.push(React.createElement("verse", {versevalue: m++ +1, className:'verse', id:'verse' + m, key:'verse' + m}, i.split('\n').map(j => j = <div className='row' id={'row' + n++} key={'row' + n++} >{"   "+j+"   "}</div>)));
    // });
   
    attr.processedText = splited.map(i => i = <verse versetype = "verse" versevalue = {m++ +1} className='verse' id={'verse' + m} key={'verse' + m} >{i.split('\n').map(j => j = <div className='row' id={'row' + n++} key={'row' + n++} >{"   "+j+"   "}</div>)}</verse>);
    finalResponce = attr;
    state(false);

}

  const songAttributes = (state) =>{
  const attr = {
    songName: document.getElementById("songName").value,
    interpret: document.getElementById("interpret").value,
    priority: document.getElementById("priority").value,
    capo: document.getElementById("capo").value,
    processedText: null
    }
    processText(attr, state);
  }
//renders first step of adding a new song
const EditorInit = () => {
    const [editEnabled, setEditEnabled] = useState(true);
    const [priority, setPriority] = useState(1);
    const [capo, setCapo] = useState(0);
    if (editEnabled) {
        return (
        <div>
            <div className="songProps">

                <input type="text" id="songName" placeholder ="Název písně"></input>
                <input type="text" id="musicAuthor" placeholder="Autor hudby" ></input>
                <input type="text" id="textAuthor" placeholder="Autor textu" ></input>
                <input type="text" id="interpret" placeholder="Interpret" ></input>
                <input type="text" id="url" placeholder="Youtube URL" ></input>
                <div>
                <p>Priorita: {priority}</p>
                <input type="range" id="priority" min="1" max="5" defaultValue="1" onChange={(e) => setPriority(e.target.value)}></input>
                </div>
                <div>
                <p>Capo: {capo}</p>
                <input type="range" id="capo" min="0" max="10" defaultValue="0" onChange={(e) => setCapo(e.target.value)}></input>
                </div>
                <div><label htmlFor="publicable">Publikovatelné před 10 h: </label><input type="checkbox" id="publicable" defaultChecked></input></div>

            </div>
            <textarea id = "textEditArea" className="songEditArea" defaultValue={givenText} ></textarea>
            <span className="isEditBtn" onClick={()=>{songAttributes(setEditEnabled)}}>Přidat akordy</span>

        </div>
        );

    } else {
        return (

            <Editor {...finalResponce}/>
            
        );
    }

}

export default EditorInit;