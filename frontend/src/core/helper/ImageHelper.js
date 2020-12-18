import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageurl = product
    ? `${API}/product/image/${product._id}`
    : `https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png`;
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageurl}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;
