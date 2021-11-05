import "App.css";
import React from "react";

const ItemResult = ({ id, date, distance, handleRemove, handleEdit }) => {
  return (
    <li className="itemResult">
      <span>{date}</span>
      <span>{distance}</span>
      <div className="icons">
        <i
          className="fa fa-pencil  fa-flip-horizontal"
          aria-hidden="true"
          onClick={() => handleEdit(id, date, distance)}
        />
        {"  "}
        <i
          className="fa fa-times"
          onClick={() => handleRemove(id)}
          aria-hidden="true"
        />
      </div>
    </li>
  );
};
export default ItemResult;
