import { useEffect, useState } from "react";
import "./css/imageCarousel.css";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const ImageCarousel = ({ imagePreview, setImagePreview, images }) => {
  const [index, setIndex] = useState();

  // set index of selected image on mounting
  useEffect(() => {
    const i = images.findIndex((image) => image.id === imagePreview.id);
    setIndex(i);
  }, []);

  function handleNext() {
    if (index < images.length - 1) {
      setImagePreview(images[index + 1]);
      setIndex(index + 1);
    }
  }

  function handlePrev() {
    if (index > 0) {
      setImagePreview(images[index - 1]);
      setIndex(index - 1);
    }
  }

  return (
    <>
      <div id="carousel-container">
        <CloseIcon className="cancel" onClick={() => setImagePreview("")} />
        <div className="caurosel-img-container">
          <ArrowBackIosIcon className="prev arrowBtn" onClick={handlePrev} />
          <img src={imagePreview.url} alt={imagePreview.title} />
          <ArrowForwardIosIcon className="next arrowBtn" onClick={handleNext} />
        </div>
      </div>
    </>
  );
};

export default ImageCarousel;
