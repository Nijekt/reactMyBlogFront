import axios from "../../axios.js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FullPost = () => {
  const [data, setData] = useState("");
  const { id } = useParams();
  console.log("ID", id);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`posts/${id}`);
        console.log(data);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      <img src={`http://localhost:4444${data.imageUrl}`} alt="" /> <br />
      {data.title} <br />
      {data.tags ? data.tags.join(",") : ""} <br />
      {data.text} <br />
      {data.createdAt}
    </div>
  );
};

export default FullPost;
