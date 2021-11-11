import "App.css";
import Form from "components/Form";
import ResultList from "components/ResultList";
import { useState } from "react";
import { format } from "date-fns";

const App = () => {
  const [date, setDate] = useState(new Date());
  const [steps, setSteps] = useState(1);
  const [edit, setEdit] = useState(false);

  const [tableData, setTableData] = useState([]);
  const formattedDate = format(new Date(date), "dd-MM-yyyy");

  const handleDate = ({ target }) => {
    setDate(target.value);
  };
  const handleSteps = ({ target }) => {
    setSteps(target.value);
  };
  const clearForm = () => {
    setDate(new Date());
    setSteps(1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (steps <= 0 || !date) {
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
              steps: Number(item.steps) + Number(steps),
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
          steps,
        },
      ]);
    }
    clearForm();
  };
  console.log(tableData);
  const handleRemove = (idItem) => {
    const updateSubmit = tableData.filter(({ id }) => id !== idItem);
    setTableData(updateSubmit);
  };

  const handleEdit = (idItem, date, distance) => {
    setDate(date);
    setEdit(true);
    setSteps(distance);
  };

  return (
    <div className="container">
      <div className="title">Учёт тренировок</div>
      <Form
        handleDate={handleDate}
        handleSteps={handleSteps}
        handleSubmit={handleSubmit}
        date={date}
        steps={steps}
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
