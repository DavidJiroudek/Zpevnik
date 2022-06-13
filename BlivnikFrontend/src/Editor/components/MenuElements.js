import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChord, changeChords } from "../../Redux/reducers/activeChordsState";
import ActiveChords from "../ActiveChordMenu";
import "../css/MenuElements.css";
import addTag from "../TagHelper";
const tones = "C;D;E;F;G;A;H"
const signs = ";#;♭"
const basicSufixes = ';7;mi;mi7;sus;dim;maj;maj7';
const cadence = ["C;F;G;G:7;A:mi;D:mi;E:mi","G;C;D;D:7;E:mi;A:mi;D:mi","D;G;A;A:7;H:mi;Emi;F#:mi", "A;D;E;E:7;F#:mi;A:mi;H:mi","E;A;H;H:7;C#:mi;E:mi;F#:mi", "F;B;C;C:7;D:mi;G:mi;A:mi"];
const dynamics = "fff;ff;f;mf;mp;p;pp;ppp"

//renders elements o chord menu
const MenuElements = () => {
    const dispatch = useDispatch();
    const counter = useSelector(state => state.tagCounter.value)


    const [formData, setFormData] = useState({   tone: "C",
                                                sign: "",
                                                sufix: ""});

    const parsedCadendes = parseCadenceData(cadence)
//i.split(';').map(j=>createChordElement(j.split(':')[0], j.split(':')[1] !== undefined? j.split(':')[1] : "", stateParams))


    return (<span className="chordMenu">
            <form>
                <select>
                    <option value={""} onClick={()=>dispatch(changeChords([]))}>Žádná kadence</option>

                    {parsedCadendes.map(i=><option key={i.textValue} onClick={() => dispatch(changeChords(i.chords))} value={i.textValue}>{i.textValue}</option>)}
                    
                </select>
            </form>
            <form>
                <select name="tone" onChange={(e)=>setFormData({...formData,tone:e.target.value})}>
                {tones.split(';').map(i=> <option value={i} key={i}>{i}</option>)}
                </select>
                <select name="sign" onChange={(e)=>setFormData({...formData,sign:e.target.value})}>
                {signs.split(';').map(i=> <option value={i} key={i}>{i}</option>)}
                </select>
                <select name="sufix" onChange={(e)=>setFormData({...formData,sufix:e.target.value})}>
                {basicSufixes.split(';').map(i=> <option value={i} key={i}>{i}</option>)}
                </select>
                <input type="button"  value="Přidat" onClick={() => dispatch(addChord({tone: formData.tone + formData.sign, sufix:formData.sufix}))}></input>
            </form>
            <div className="dynMenu">
            {dynamics.split(";").map(i=><span className="menuElement" key={i} id={i} onClick={() => addTag("dyn", i, "", counter, dispatch)}>{i}</span>)}
            </div>
                <ActiveChords/>
            </span>);
}




const parseCadenceData = (cadences) =>{
    const result = [];
    for (const i of cadences) {
        const first = i.split(';');
        const cad = {
            textValue: i.replaceAll(";", " ").replaceAll(":", ""),
            chords: []
        }
        for (const k of first) {
            cad.chords.push({  tone: k.split(':')[0],
                        sufix: k.split(':')[1] !== undefined? k.split(':')[1] : "",
                        })
        }
        result.push(cad);
    }
    return result
}
// const createParams = (tagState, setTagState, setEditMenuState, counter, setCounter) =>{
//     return({
//         tagState,
//         setTagState,
//         setEditMenuState,
//         counter,
//         setCounter
// })
// }
export default MenuElements;
//agfraergraegrvregaergerag
//tagState, setTagState, setEditMenuState, counter, setCounter