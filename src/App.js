import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import AlbumPage from "./components/AlbumPage";
import ImagePage from "./components/ImagePage";

function App() {
  const [currentAlbum, setCurrentAlbum] = useState();

  // get current album on page refresh or on loading page
  useEffect(() => {
    const album = localStorage.getItem("currentAlbum");
    if (album) {
      setCurrentAlbum(JSON.parse(album));
    }
  }, []);

  return (
    <>
      <Navbar />
      {currentAlbum ? (
        <ImagePage
          currentAlbum={currentAlbum}
          setCurrentAlbum={setCurrentAlbum}
        />
      ) : (
        <AlbumPage setCurrentAlbum={setCurrentAlbum} />
      )}
    </>
  );
}

export default App;
