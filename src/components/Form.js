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
        className="inputDate"
        id="date"
        name="date"
        value={form.date}
      />
      <input
        onChange={handleChange}
        className="inputDistance"
        id="distance"
        name="distance"
        value={form.distance}
      />
      <button onSubmit={handleSubmit} className="submit" type="submit">
        Ok
      </button>
    </form>
  );
};
export default Form;
