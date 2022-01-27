import "App.css";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDate,
  handleSteps,
  handleSubmit,
  clearForm,
} from "actions/createActions";

const Form = () => {
  const dispatch = useDispatch();
  const { date, steps, edit } = useSelector((state) => state.reducerSteps);

  const handleDateForm = ({ target: { value } }) => dispatch(handleDate(value));

  const handleStepsForm = ({ target: { value } }) =>
    dispatch(handleSteps(value));

  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(handleSubmit());
    dispatch(clearForm());
  };
  return (
    <form onSubmit={handleSubmitForm} className="form">
      <label className="labelDate" htmlFor="date">
        Дата(ДД.ММ.ГГ)
      </label>
      <label className="labelDistance" htmlFor="distance">
        Пройдено км
      </label>
      <input
        onChange={handleDateForm}
        type="date"
        className="inputDate"
        id="date"
        name="date"
        readOnly={edit && true}
        value={format(new Date(date), "yyyy-MM-dd")}
        required={true}
      />
      <input
        type="number"
        onChange={handleStepsForm}
        required={true}
        className="inputDistance"
        id="distance"
        name="distance"
        value={edit ? 1 : steps}
        readOnly={edit && true}
        placeholder="Number"
      />
      <button
        onSubmit={handleSubmitForm}
        className="submit"
        type="submit"
        disabled={edit && true}
      >
        Ok
      </button>
    </form>
  );
};
export default Form;
