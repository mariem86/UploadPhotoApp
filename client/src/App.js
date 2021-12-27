import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";

const App = () => {
  useEffect(() => {
    get();
  }, []);

  const [image, setImg] = useState("");
  const [photo, setPhoto] = useState("");
  const [list, setList] = useState([]);
  const get = async () => {
    try {
      const res = await axios.get("/api/photos");
      setList([...list, ...res.data]);
    } catch (error) {
      alert("Error get ");
    }
  };
  const handleChange = e => {
    const file = e.target.files[0];
    setPhoto(file);
    previewImage(e);
  };

  const previewImage = e => {
    const file = e.target.files;
    const reader = new FileReader();
    reader.onload = e => setImg(e.target.result);

    const blob = new Blob(file, { type: "application/octet-binary" });
    console.log(blob);
    reader.readAsDataURL(blob);
  };

  const uploadImg = async () => {
    try {
      const formData = new FormData();
      formData.append("photo", photo);
      const res = await axios.post("/api/photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setList([...list, res.data]);
      setImg("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <input type="file" name="photo" onChange={handleChange} />
      <input type="submit" value="Save" onClick={uploadImg} />
      <img
        src={image || logo}
        alt="fail"
        style={{ width: "150px", height: "150px", borderRadius: "50%" }}
      />

      <div className="Gallery">
        {list.map(el => (
          <img
            src={`/api/photos/${el._id}` || logo}
            alt="fail"
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
