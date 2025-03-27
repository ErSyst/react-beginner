import React from "react";

export const Collection = ({ images, name }) => {
  return (
    <div className="collection">
      <img className="collection_big" src={images[0]} alt="Item" />
      <div className="collection_bottom">
        <img className="collection_mini" src={images[1]} alt="Item" />
        <img className="collection_mini" src={images[2]} alt="Item" />
        <img className="collection_mini" src={images[3]} alt="Item" />
      </div>
      <h4>{name}</h4>
    </div>
  );
};
