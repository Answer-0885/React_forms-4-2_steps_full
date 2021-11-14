import "App.css";
import React from "react";
import cn from "classnames";
import { format } from "date-fns";
const ItemResult = ({
  id,
  date,
  steps,
  handleRemove,
  handleEditMode,
  edit,
  isEdit,
  handleDate,
  handleSteps,
  cancelEditMode,
  handleSaveEditChange,
  idx,
  stepsAll,
  dateState,
}) => {
  return edit ? (
    <div className="form-edit">
      <input
        onChange={handleDate}
        type="date"
        className="inputDate"
        id="date"
        name="date"
        value={format(new Date(dateState), "yyyy-MM-dd")}
        required={true}
      />
      <input
        type="number"
        onChange={handleSteps}
        required={true}
        className="inputDistance"
        id="distance"
        name="distance"
        value={isEdit ? stepsAll : steps}
        placeholder="Number"
      />
      <button onClick={() => cancelEditMode(idx)} className="submit">
        cancel
      </button>
      <button className="submit" onClick={() => handleSaveEditChange(id)}>
        save
      </button>
    </div>
  ) : (
    <li className={cn("itemResult", { "itemResult activeItem": edit })}>
      <span>{format(new Date(date), "dd-MM-yyyy")}</span>
      <span>{steps}</span>
      <div className="icons">
        <i
          className={cn("fa fa-pencil  fa-flip-horizontal", {
            " fa-pencil-square-o": edit,
          })}
          aria-hidden="true"
          onClick={(e) => !isEdit && handleEditMode(idx, e)}
        />
        <i
          className="fa fa-times"
          onClick={() => !isEdit && handleRemove(id)}
          aria-hidden="true"
        />
      </div>
    </li>
  );
};
export default ItemResult;
