import { useState, useRef, useReducer, useEffect } from "react";
import "./css/imagePage.css";
import ImageForm from "./ImageForm";
import ImageCard from "./ImageCard";
import backIcon from "./images/back.png";
import searchIcon from "./images/search.png";
import clearIcon from "./images/clear.png";
import ImageCarousel from "./ImageCarousel";
import Spinner from "react-spinner-material";
import {
  onSnapshot,
  collection,
  addDoc,
  doc,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebaseInit";
import { toast } from "react-toastify";

// image reducer function to perform multiple operation
const imageReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "GET_IMAGE": {
      return {
        images: payload.images,
        filterImages: payload.images,
      };
    }

    case "SEARCH": {
      return {
        ...state,
        filterImages: payload.filterImages,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

const ImagePage = ({ setCurrentAlbum, currentAlbum }) => {
  const [imageForm, setImageForm] = useState();
  const [searchInput, setSearchInput] = useState(false);
  const [imagePreview, setImagePreview] = useState(false);
  const [imageToEdit, setImageToEdit] = useState();
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(imageReducer, {
    images: [],
    filterImages: [],
  });
  const searchInputRef = useRef();

  // fetch images of selected album on mounting
  useEffect(() => {
    getImages();
  }, []);

  // run on any changes in serchInput
  useEffect(() => {
    if (searchInput) {
      searchInputRef.current.value = "";
      searchInputRef.current.focus();
    } else {
      getImages();
    }
  }, [searchInput]);

  // get image from firebase
  function getImages() {
    setLoading(true);
    const collectionRef = collection(db, "images");
    // query option to fetch images from selected album
    const queryOption = query(
      collectionRef,
      where("album", "==", currentAlbum.id)
    );

    // fetch image from firebase on any change in image data
    onSnapshot(queryOption, (snapshot) => {
      const images = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      dispatch({ type: "GET_IMAGE", payload: { images: images } });
      setLoading(false);
    });
  }

  // toggle searchInput field
  function toggleSearch() {
    setSearchInput(!searchInput);
  }

  // go back to album page
  function handleBack() {
    setCurrentAlbum("");
    // update localStorage on going back
    localStorage.setItem("currentAlbum", "");
  }

  // filter images on the basis of image title
  function handleSearch(e) {
    const searchValue = e.target.value.toLowerCase().trim(); // Case-insensitive search

    if (searchValue) {
      const filteredData = state.images.filter((image) =>
        image.title.toLowerCase().includes(searchValue)
      );
      dispatch({ type: "SEARCH", payload: { filterImages: filteredData } });
    } else {
      // Reset to show all images when the search input is cleared
      dispatch({ type: "SEARCH", payload: { filterImages: state.images } });
    }
  }

  // toggle image form
  function toggleCancel() {
    setImageForm(!imageForm);
    setImageToEdit("");
  }

  // add image to firebase
  async function addImage(title, url) {
    try {
      if (url) {
        const collectionRef = collection(db, "images");
        await addDoc(collectionRef, { title, url, album: currentAlbum.id });
        toast.success("Image added successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  // set image data to imageToEdit state variable
  function handleImageEdit(image) {
    setImageToEdit(image);
    setImageForm(true);
  }

  // upadate selected images
  async function updateImage(title, url) {
    try {
      if (url) {
        const docRef = doc(db, "images", imageToEdit.id);
        await setDoc(docRef, { title, url, album: currentAlbum.id });
        toast.success("Images updated successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  return (
    <>
      <section id="imagePage">
        {/* image form start here and render conditionally */}
        {imageForm && (
          <ImageForm
            addImage={addImage}
            imageToEdit={imageToEdit}
            setImageToEdit={setImageToEdit}
            currentAlbum={currentAlbum}
            updateImage={updateImage}
          />
        )}

        {/* heading start here */}
        <div id="heading-btn-container">
          <div className="backIcon-container" onClick={handleBack}>
            <img id="back-icon" src={backIcon} alt="back-icon" />
          </div>
          {/* h2 element render conditionally */}
          {state.images.length ? (
            <h2>Images in {currentAlbum.name}</h2>
          ) : (
            <h2>No images in this album</h2>
          )}

          {/* search container start here */}
          <div className="search-container">
            {searchInput && (
              <input
                type="text"
                placeholder="Title..."
                ref={searchInputRef}
                onChange={handleSearch}
              />
            )}
            {searchInput ? (
              <img
                id="search-icon"
                src={clearIcon}
                alt="clear-icon"
                onClick={toggleSearch}
              />
            ) : (
              <img
                id="search-icon"
                src={searchIcon}
                alt="search-icon"
                onClick={toggleSearch}
              />
            )}
            <button
              className={imageForm ? "cancel" : ""}
              onClick={toggleCancel}
            >
              {imageForm ? "Cancel" : "Add image"}
            </button>
          </div>
        </div>

        {/* image list start here */}
        <div id="image-list">
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
            state.filterImages.map((image, index) => (
              <ImageCard
                key={index}
                image={image}
                setImagePreview={setImagePreview}
                handleImageEdit={handleImageEdit}
              />
            ))
          )}
        </div>
      </section>

      {/* image carousel start here */}
      {imagePreview && (
        <ImageCarousel
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          images={state.images}
        />
      )}
    </>
  );
};

export default ImagePage;
