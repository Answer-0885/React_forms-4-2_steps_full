import "App.css";
import Form from "components/Form";
import ResultList from "components/ResultList";
import { useState } from "react";
import { format } from "date-fns";

const App = () => {
  const dataDefault = {
    id: "",
    date: new Date(),
    distance: "",
    edit: false,
  };
  const [form, setForm] = useState(dataDefault);
  const [tableData, setTableData] = useState([]);
  const formattedDate = format(new Date(form.date), "dd-MM-yyyy");

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.distance <= 0 || !form.date) {
      return;
    }
    const foundId = tableData.find((d) => d.id === formattedDate?.id);
    if (foundId) {
      const updateTableData = tableData.reduce((acc, item) => {
        if (item.id === foundId) {
          return [
            ...acc,
            {
              ...item,
              [item.distance]: Number(item.distance) + Number(form.distance),
            },
          ];
        }
        return [...acc, item];
      }, []);
      setTableData(updateTableData);
    } else {
      setTableData([
        ...tableData,
        {
          id: formattedDate,
          date: formattedDate,
          distance: form.distance,
        },
      ]);
    }
    setForm(dataDefault);
  };

  const handleRemove = (idItem) => {
    const updateSubmit = tableData.filter(({ id }) => id !== idItem);
    setTableData(updateSubmit);
  };

  const handleEdit = (idItem, date, distance) => {
    setForm({ id: idItem, date: date, distance: distance, edit: true });
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
        tableData={tableData}
      />
    </div>
  );
};

export default App;
