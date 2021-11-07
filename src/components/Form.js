import "App.css";

const Form = ({ handleChange, handleSubmit, form }) => {
  return (
    <form onSubmit={handleSubmit} className="form">
      <label className="labelDate" htmlFor="date">
        Дата(ДД.ММ.ГГ)
      </label>
      <label className="labelDistance" htmlFor="distance">
        Пройдено км
      </label>
      <input
        onChange={handleChange}
        type="date"
        className="inputDate"
        id="date"
        name="date"
        value={form.date}
        required={true}
      />
      <input
        type="number"
        onChange={handleChange}
        required={true}
        className="inputDistance"
        id="distance"
        name="distance"
        value={form.distance}
        placeholder="Number"
      />
      <button onSubmit={handleSubmit} className="submit" type="submit">
        Ok
      </button>
    </form>
  );
};
export default Form;
