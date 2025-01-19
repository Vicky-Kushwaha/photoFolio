import { useState, useEffect } from "react";
import "./css/albumPage.css";
import AlbumForm from "./AlbumForm";
import AlbumCard from "./AlbumCard";
import Spinner from "react-spinner-material";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseInit";
import { toast } from "react-toastify";

const AlbumPage = ({ setCurrentAlbum }) => {
  const [albums, setAlbums] = useState([]);
  const [albumForm, setAlbumForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // get albums from firebase
  function getAlbum() {
    setLoading(true);
    try {
      // fetch real time data on every change in data without refreshing the page
      onSnapshot(collection(db, "photofolio"), (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        // set albums to local state
        setAlbums(data);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  }

  // fetch album on mounting component
  useEffect(() => {
    getAlbum();
  }, []);

  // add album to firebase
  async function createAlbum(albumName) {
    try {
      const docRef = collection(db, "photofolio");
      await addDoc(docRef, { name: albumName });
      toast.success("Album added successfully");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  return (
    <>
      <section id="album-page">
        {/* render form to add album conditionally */}
        {albumForm && <AlbumForm createAlbum={createAlbum} />}

        {/* heading start here */}
        <div id="heading-btn-container">
          <h2>Your albums</h2>
          <button
            className={albumForm ? "cancel" : ""}
            onClick={() => setAlbumForm(!albumForm)}
          >
            {albumForm ? "Cancel" : "Add album"}
          </button>
        </div>

        {/* Album list start here */}
        <div id="album-list">
          {loading ? (
            <div style={{ width: "100%" }}>
              <Spinner
                radius={40}
                color={"#333"}
                stroke={4}
                visible={true}
                style={{ margin: "auto" }}
              />
            </div>
          ) : (
            albums.map((album, index) => (
              <AlbumCard
                key={index}
                album={album}
                setCurrentAlbum={setCurrentAlbum}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default AlbumPage;
