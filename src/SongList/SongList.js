import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SongList.css"


//side for all current songs
const SongList = () => {
    const [songList, setSongList] = useState();
    useEffect(() => {
    fetch('http://localhost:9000/browseSongs/getAllSongs').then(response => response.json())
  .then((result) => {setSongList(result.map(i=>i = <Link className="songLink" to= {`/song/${i._id}`} >{i.songName}</Link>))});
},[]);


return(
    <div className="songList">{songList}</div>
    
    );

}

export default SongList;