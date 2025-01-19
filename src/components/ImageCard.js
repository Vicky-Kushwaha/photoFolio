import "./css/imageCard.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseInit";
import { toast } from "react-toastify";

const ImageCard = ({ image, setImagePreview, handleImageEdit }) => {
  // hadleDelete function delete image from firebase
  async function handleDelete() {
    try {
      const docRef = doc(db, "images", image.id);
      await deleteDoc(docRef);
      toast.success("Image deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  return (
    <>
      <div id="image-card">
        <img
          className="photo"
          src={image.url}
          alt={image.title}
          onClick={() => setImagePreview(image)}
        />

        <div>
          <p>{image.title}</p>
          <div className="action">
            <EditIcon
              className="icon delete"
              onClick={() => handleImageEdit(image)}
            />
            <DeleteIcon className="icon edit" onClick={handleDelete} />
          </div>
          {/* <a href={image.url} download target="_blank" className="downloadBtn">
            Download
          </a> */}
        </div>
      </div>
    </>
  );
};

export default ImageCard;
