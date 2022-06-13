import { useDispatch, useSelector } from "react-redux"
import addTag from "./TagHelper";

const ActiveChords = () =>{
    const chords = useSelector(state => state.activeChordsState.value)
    const counter = useSelector(state => state.tagCounter.value)
    const dispatch = useDispatch();
// i.chords.map(j=><span className="menuElement" key={j.tone+j.sufix} id={j.tone+j.sufix} onClick={
//     () => addTag("ch", j.tone, j.sufix, counter, dispatch, setCounter)} >{j.tone+j.sufix}</span>)


//     ()=>{setActiveChords([...activeChords, <span className="menuElement" key={formData.tone + formData.sign +formData.sufix} id={formData.tone + formData.sign + formData.sufix} onClick={
//         () => addTag("ch", formData.tone + formData.sign, formData.sufix, counter, dispatch, setCounter)} >{formData.tone + formData.sign +formData.sufix}</span>])}
return(<span className='activeChords'>{chords.map(i => <span className="activeChordsElement" key={i.tone + i.sufix} id={i.tone + i.sufix} onClick={() => addTag("ch", i.tone, i.sufix, counter, dispatch)}>{i.tone + i.sufix}</span>)}</span>)
}

export default ActiveChords