import {
  HANDLE_DATE,
  CANCEL_EDIT_MODE,
  HANDLE_EDIT_MODE,
  HANDLE_KEY,
  HANDLE_REMOVE,
  HANDLE_SAVE_EDIT_CHANGE,
  HANDLE_STEPS,
  HANDLE_SUBMIT,
  CLEAR_FORM,
} from "actions/typeActions";

export const handleDate = (value) => ({ type: HANDLE_DATE, payload: value });
export const handleSteps = (value) => ({ type: HANDLE_STEPS, payload: value });
export const handleSubmit = () => ({ type: HANDLE_SUBMIT });
export const clearForm = () => ({ type: CLEAR_FORM });
export const handleSaveEditChange = (id) => ({
  type: HANDLE_SAVE_EDIT_CHANGE,
  payload: id,
});
export const cancelEditMode = (id) => ({ type: CANCEL_EDIT_MODE, payload: id });
export const handleEditMode = (idx) => ({
  type: HANDLE_EDIT_MODE,
  payload: idx,
});
export const handleRemove = (id) => ({ type: HANDLE_REMOVE, payload: id });
export const handleKey = () => ({ type: HANDLE_KEY });
