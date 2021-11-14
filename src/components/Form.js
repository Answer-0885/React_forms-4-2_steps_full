import "App.css";
import { format } from "date-fns";

const Form = ({ handleDate, handleSubmit, handleSteps, steps, date, edit }) => {
  return (
    <form onSubmit={handleSubmit} className="form">
      <label className="labelDate" htmlFor="date">
        Дата(ДД.ММ.ГГ)
      </label>
      <label className="labelDistance" htmlFor="distance">
        Пройдено км
      </label>
      <input
        onChange={handleDate}
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
        onChange={handleSteps}
        required={true}
        className="inputDistance"
        id="distance"
        name="distance"
        value={edit ? 1 : steps}
        readOnly={edit && true}
        placeholder="Number"
      />
      <button
        onSubmit={handleSubmit}
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
