import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  [images, setImages] = useState([]);
  [index, setIndex] = useState(0);
  // [newPage, setNewPage] = useState(false);
  useEffect(() => {
    let ignore = false;

    fetch("https://api.thecatapi.com/v1/images/search?limit=10", {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not access resource");
        }
        // console.log(res);
        return res.json();
      })
      .then((data) => {
        if (!ignore) {
          setImages(data);
        }
      })
      .catch((error) => console.error(error));

    return () => {
      ignore = true;
    };
  }, []);
  pageSize = 10;

  function handleButtonClick() {
    setIndex((i) => {
      let newInd = i + 1;
      if (newInd >= pageSize - 1) {
        // setNewPage((n) => !n);
        return 0;
      }
      return newInd;
    });
    console.log(index);
  }

  return (
    <div className="App">
      <div>
        <button type="button" onClick={handleButtonClick}>
          New Image please
        </button>
      </div>
      <div>
        {images[index] ? (
          <img src={images[index].url} height="500" />
        ) : (
          "Loading please be patient"
        )}
      </div>
    </div>
  );
}
