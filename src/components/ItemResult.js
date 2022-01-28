import "App.css";
import React from "react";
import cn from "classnames";
import { format } from "date-fns";
import {
  handleDate,
  handleSteps,
  handleSaveEditChange,
  handleEditMode,
  cancelEditMode,
  handleRemove,
} from "actions/createActions";
import { useSelector, useDispatch } from "react-redux";

const ItemResult = ({ id, date, steps, idx, edit }) => {
  const dispatch = useDispatch();
  const { editDate, editSteps } = useSelector((state) => state.reducerSteps);
  const handleDateForm = ({ target: { value } }) => dispatch(handleDate(value));
  const handleStepsForm = ({ target: { value } }) =>
    dispatch(handleSteps(value));

  const handleSaveEdit = (id) => dispatch(handleSaveEditChange(id));

  const cancelEditModeSteps = (id) => dispatch(cancelEditMode(id));
  const handleEditModeSteps = (idx) => dispatch(handleEditMode(idx));
  const handleRemoveItem = (id) => dispatch(handleRemove(id));

  return edit ? (
    <div className="form-edit">
      <input
        onChange={handleDateForm}
        type="date"
        className="inputDate"
        id="date"
        name="date"
        value={format(new Date(editDate), "yyyy-MM-dd")}
        required={true}
      />
      <input
        type="number"
        onChange={handleStepsForm}
        required={true}
        className="inputDistance"
        id="distance"
        name="distance"
        value={edit && editSteps}
        placeholder="Number"
      />
      <button onClick={() => cancelEditModeSteps(idx)} className="submit">
        cancel
      </button>
      <button className="submit" onClick={() => handleSaveEdit(id)}>
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
          onClick={() => !edit && handleEditModeSteps(idx)}
        />
        <i
          className="fa fa-times"
          onClick={() => !edit && handleRemoveItem(id)}
          aria-hidden="true"
        />
      </div>
    </li>
  );
};
export default ItemResult;
