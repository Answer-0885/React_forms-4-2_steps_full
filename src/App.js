import "App.css";
import Form from "components/Form";
import ResultList from "components/ResultList";
import { useState } from "react";
import { nanoid } from "nanoid";

const App = () => {
  const [form, setForm] = useState({
    id: "",
    date: "",
    distance: "",
  });
  const [submit, setSubmit] = useState([]);
  const handleChange = ({ target }) => {
    const value = target.value;
    setForm({ ...form, [target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateSubmit = submit.filter(({ id }) => id === form.id);
    const idx = submit.indexOf(updateSubmit);
    const sub2 = submit.map((elem) => {
      if (elem.id === form.id) {
        elem = form;
      }
      return elem;
    });
    if (updateSubmit.length > 0) {
      setSubmit((submit[idx] = sub2));
    } else {
      form.id = nanoid();
      setSubmit([...submit, form]);
    }

    setForm({ date: "", distance: "" });
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
