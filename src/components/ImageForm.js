import { useEffect, useRef } from "react";
import "./css/imageForm.css";

const ImageForm = (props) => {
  const { addImage, imageToEdit, currentAlbum, updateImage, setImageToEdit } =
    props;

  const titleRef = useRef();
  const urlRef = useRef();

  // call when imageToEdit changes
  useEffect(() => {
    // set value to the input field to edit
    if (imageToEdit) {
      titleRef.current.value = imageToEdit.title;
      urlRef.current.value = imageToEdit.url;
    }
  }, [imageToEdit]);

  // clear input function
  function clearInput() {
    titleRef.current.value = "";
    urlRef.current.value = "";
  }

  // handle adding of image
  function handleSubmit(e) {
    e.preventDefault();

    const title = titleRef.current.value;
    const url = urlRef.current.value;

    if (imageToEdit) {
      // upateImage is function to update image
      updateImage(title, url);
      setImageToEdit("");
    } else {
      // addImage is function to add image
      addImage(title, url);
    }

    clearInput();
  }

  return (
    <>
      <div id="image-form">
        <h2>
          {imageToEdit ? "Edit image" : `Add new image to ${currentAlbum.name}`}
        </h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" ref={titleRef} />
          <input type="text" placeholder="Image Url" ref={urlRef} />
          <div>
            <button
              className="clear-btn"
              type="button"
              onClick={() => clearInput()}
            >
              Clear
            </button>
            <button className="add-btn">
              {imageToEdit ? "Edit" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ImageForm;
