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
import { format } from "date-fns";

const initialState = {
  date: new Date(),
  steps: 1,
  isEdit: false,
  editSteps: 0,
  editDate: 0,
  tableData: [],
};
const reducerSteps = (state = initialState, action) => {
  const formattedDate = format(new Date(state.date), "yyyy-MM-dd");
  const sumSteps = (foundId) => {
    return state.tableData.reduce((acc, item) => {
      if (item.id === foundId) {
        return [
          ...acc,
          {
            ...item,
            steps: Number(item.steps) + Number(state.steps),
          },
        ];
      }
      item.edit = false;
      return [...acc, item];
    }, []);
  };

  switch (action.type) {
    case HANDLE_DATE:
      if (
        format(new Date(action.payload), "yyyy-MM-dd") >
        format(new Date(), "yyyy-MM-dd")
      ) {
        alert("Дата не может быть больше текущей даты");
      } else {
        return !state.isEdit
          ? { ...state, date: action.payload }
          : { ...state, editDate: action.payload };
      }
    case HANDLE_STEPS:
      return !state.isEdit
        ? action.payload >= 0 && { ...state, steps: action.payload }
        : action.payload >= 0 && {
            ...state,
            editSteps: action.payload,
          };

    case HANDLE_SUBMIT:
      if (state.steps <= 0 || !state.date) {
        return;
      }
      const foundId = state.tableData.find((d) => d.id === formattedDate)?.id;

      if (foundId && !state.isEdit) {
        return { ...state, tableData: sumSteps(foundId) };
      } else if (state.isEdit) {
        const updateData = state.tableData.map((el) => {
          if (el.id === foundId) {
            el.steps = state.steps;
            el.id = formattedDate;
            el.date = formattedDate;
            el.edit = false;
          }
          return el;
        });
        return { ...state, tableData: updateData };
      } else {
        return {
          ...state,
          tableData: [
            ...state.tableData,
            {
              id: formattedDate,
              date: formattedDate,
              steps: state.steps,
            },
          ],
        };
      }
    case CLEAR_FORM:
      return { ...state, date: new Date(), steps: 1, isEdit: false };

    case HANDLE_EDIT_MODE:
      const id = action.payload;
      const updatedData = [...state.tableData];
      updatedData[action.payload].edit = true;
      return {
        ...state,
        editSteps: updatedData[id].steps,
        editDate: updatedData[id].date,
        tableData: updatedData,
        isEdit: true,
      };
    case HANDLE_SAVE_EDIT_CHANGE:
      const idItem = action.payload;
      const foundedItem = state.tableData.find((el) => el.id === idItem);
      foundedItem.steps = state.editSteps;
      foundedItem.date = state.editDate;
      foundedItem.id = state.editDate;
      foundedItem.edit = false;
      return { ...state, isEdit: false, steps: 1 };
    case CANCEL_EDIT_MODE:
      const data = [...state.tableData];
      const idElem = action.payload;
      data[idElem].edit = false;
      return {
        ...state,
        tableData: data,
        isEdit: false,
        steps: 1,
        date: new Date(),
      };
    case HANDLE_REMOVE:
      const itemId = action.payload;
      const updateSubmit = state.tableData.filter(({ id }) => id !== itemId);
      return { ...state, tableData: updateSubmit };
    case HANDLE_KEY:
      const dataUpdated = state.tableData.map((item) =>
        item.edit ? { ...item, edit: false } : item
      );
      return { ...state, isEdit: false, tableData: dataUpdated };

    default:
      return state;
  }
};
export { reducerSteps };
