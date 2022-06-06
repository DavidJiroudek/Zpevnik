import "../Editor/css/ChordArea.css"


const ChordView = ({signs}) => {
    return(<div className = "chordArea" id="chordArea">{signs.map(i=><span style={i.style} className={i.className} id={i.id} key={i.key} >{i.textValue}</span>)}</div>);

}

export default ChordView;