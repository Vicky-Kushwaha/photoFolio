import { useRef } from "react";
import "./css/albumForm.css";

const AlbumForm = ({ createAlbum }) => {
  const albumRef = useRef();

  function clearInput() {
    albumRef.current.value = "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (albumRef.current.value) {
      // createAblum function add album to firebase
      createAlbum(albumRef.current.value);
      clearInput();
    }
  }

  return (
    <>
      <div id="album-form">
        <h2>Create an album</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="album name" ref={albumRef} />
          <button
            className="clear-btn"
            type="button"
            onClick={() => clearInput()}
          >
            Clear
          </button>
          <button className="create-btn">Create</button>
        </form>
      </div>
    </>
  );
};

export default AlbumForm;
