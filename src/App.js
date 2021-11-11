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
    setEdit(false);
  };
  const sumSteps = (foundId) => {
    return tableData.reduce((acc, item) => {
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
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (steps <= 0 || !date) {
      return;
    }
    const foundId = tableData.find((d) => d.id === formattedDate)?.id;

    if (foundId && !edit) {
      setTableData(sumSteps(foundId));
    } else if (edit) {
      const updateData = tableData.map((el) => {
        if (el.id === foundId) {
          el.steps = steps;
          el.id = formattedDate;
          el.date = formattedDate;
        }
        return el;
      });
      setTableData(updateData);
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

  const handleEdit = (idItem, dateItem, distance) => {
    setDate(format(new Date(dateItem), "dd-MM-yyyy"));
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
