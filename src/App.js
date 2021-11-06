import "App.css";
import Form from "components/Form";
import ResultList from "components/ResultList";
import { useState } from "react";
import { nanoid } from "nanoid";

const App = () => {
  const dataDefault = {
    id: "",
    date: "",
    distance: "",
  };
  const [form, setForm] = useState(dataDefault);
  const [submit, setSubmit] = useState([]);
  const handleChange = ({ target }) => {
    const value = target.value;
    setForm({ ...form, [target.name]: value });
  };
  const validateItem = (submit, form) => {
    return submit.map((elem) => {
      if (elem.id === form.id) {
        elem = form;
      } else if (elem.date === form.date) {
        elem.distance = Number(elem.distance) + Number(form.distance);
      }
      return elem;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const idxEdit = submit.findIndex(({ id }) => id === form.id);
    const idxDate = submit.findIndex(({ date }) => date === form.date);
    const editItem = validateItem(submit, form);
    form.id = nanoid();
    idxDate !== -1 && setSubmit((submit[idxDate] = editItem));
    idxEdit !== -1 && setSubmit((submit[idxEdit] = editItem));
    idxDate === -1 && idxEdit === -1 && setSubmit([...submit, form]);
    setForm(dataDefault);
  };

  const handleRemove = (idItem) => {
    const updateSubmit = submit.filter(({ id }) => id !== idItem);
    setSubmit(updateSubmit);
  };

  const handleEdit = (idItem, date, distance) => {
    setForm({ id: idItem, date: date, distance: distance });
  };

  return (
    <div className="container">
      <div className="title">Учёт тренировок</div>
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        form={form}
      />
      <ResultList
        handleEdit={handleEdit}
        handleRemove={handleRemove}
        submit={submit}
      />
    </div>
  );
};

export default App;
