import "App.css";
import React from "react";
import cn from "classnames";
const ItemResult = ({ id, date, steps, handleRemove, handleEdit, edit }) => {
  return (
    <li className="itemResult">
      <span>{date}</span>
      <span>{steps}</span>
      <div className="icons">
        <i
          className={cn("fa fa-pencil  fa-flip-horizontal", {
            " fa-pencil-square-o": edit,
          })}
          aria-hidden="true"
          onClick={() => handleEdit(id, date, steps)}
        />
        <i
          className="fa fa-times"
          onClick={() => !edit && handleRemove(id)}
          aria-hidden="true"
        />
      </div>
    </li>
  );
};
export default ItemResult;
