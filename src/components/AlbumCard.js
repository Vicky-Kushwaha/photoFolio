import "./css/albumCard.css";
import albumIcon from "./images/album-icon.png";

const AlbumCard = ({ album, setCurrentAlbum }) => {
  // set current album to local state
  function handleSetAlbum() {
    setCurrentAlbum(album);
    // set current album to localStorage to get on page refresh
    localStorage.setItem("currentAlbum", JSON.stringify(album));
  }

  return (
    <div id="album-card" onClick={handleSetAlbum}>
      <div>
        <img src={albumIcon} alt="album-icon" />
      </div>
      <p>{album.name}</p>
    </div>
  );
};

export default AlbumCard;
