import "./css/navbar.css";
import photoFolioIcon from "./images/photoFolio-icon.png";

function Navbar() {
  return (
    <>
      <header>
        <img src={photoFolioIcon} alt="photofolio-icon" />
        <h1>PhotoFolio</h1>
      </header>
    </>
  );
}

export default Navbar;
