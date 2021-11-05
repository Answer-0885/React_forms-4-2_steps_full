import "App.css";
const Form = () => {
  return (
    <form type="submit" className="form">
      <label className="labelDate" htmlFor="date">
        Дата(ДД.ММ.ГГ)
      </label>
      <label className="labelDistance" htmlFor="distance">
        Пройдено км
      </label>
      <input className="inputDate" id="date" name="date" />
      <input className="inputDistance" id="distance" name="distance" />
      <button className="submit" type="submit">
        Ok
      </button>
    </form>
  );
};
export default Form;
