import "App.css";
import Form from "components/Form";
import ResultList from "components/ResultList";
import { useState, useEffect } from "react";
import { format } from "date-fns";

const App = () => {
  const [date, setDate] = useState(new Date());
  const [steps, setSteps] = useState(1);
  const [edit, setEdit] = useState(false);

  const [tableData, setTableData] = useState([]);
  const formattedDate = format(new Date(date), "yyyy-MM-dd");

  /**
   * Функция handleKey очень простая
   * если мы нажали на escape - с окна снимается прослушчик событий
   * и мы больше не следим за нажатиями клавиш, так как нам надо следить
   * за нажатием клавиш лишь в режиме редактирования! Если нет режима редактирования
   * то и следить незачем. Ну и по клику на escape вызывается хук setEdit и отменяет глобальный режим редактирования
   * и также надо пройти по всем записям и отменить edit true у которой есть;
   */
  const handleKey = (e) => {
    console.log("e.keyCode", e.keyCode);
    if (e.keyCode === 27) {
      window.removeEventListener("keydown", handleKey);
      setEdit(false);
      const updatedData = tableData.map((item) =>
        item.edit ? { ...item, edit: false } : item
      );
      setTableData(updatedData);
    }
  };

  /**
   * хук useEffect - это как наблюдатель
   * в нашем случае, он следит за edit - и как только
   * edit меняется он вызывается, в нашем случае
   * как только edit true на все окно навешивается событие
   * и мы получаем коды всех клавиш и на каждый клик
   * вызывается функция handleKey
   */
  useEffect(() => {
    console.log("вызываем хук useEffect только когда изменился edit!");
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [edit]);

  const handleDate = ({ target: { value } }) => {
    if (
      format(new Date(value), "yyyy-MM-dd") > format(new Date(), "yyyy-MM-dd")
    ) {
      alert("Дата не может быть больше текущей даты");
    } else {
      setDate(value);
    }
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
      item.edit = false;
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
          el.edit = false;
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

  const handleRemove = (idItem) => {
    const updateSubmit = tableData.filter(({ id }) => id !== idItem);
    setTableData(updateSubmit);
  };

  /**
   * отключаем режим редактирования у конкретной записи
   */
  const cancelEditMode = (id) => {
    const updatedData = [...tableData];
    updatedData[id].edit = false;
    setTableData(updatedData);
    setEdit(false);
  };

  /**
   * Включаем режим редактирования у конкретной записи
   * также включаем глобальный режим редактирования,
   * чтобы понимать, что наше приложение редактируется
   */
  const handleEditMode = (id) => {
    const updatedData = [...tableData];
    updatedData[id].edit = true;
    setTableData(updatedData);
    setEdit(true);
  };

  /**
   * Функция для сохранения записи, после редактирования (вызывается по клику на кнопку save)
   */
  const handleSaveEditChange = (idItem) => {
    const foundedItem = tableData.find((el) => el.id === idItem);
    foundedItem.steps = steps;
    foundedItem.edit = false;
    setEdit(false);
    // твоя реализация
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
        edit={edit}
      />
      <ResultList
        stepsAll={steps}
        handleEditMode={handleEditMode}
        handleRemove={handleRemove}
        tableData={tableData}
        isEdit={edit}
        handleDate={handleDate}
        handleSteps={handleSteps}
        cancelEditMode={cancelEditMode}
        handleSaveEditChange={handleSaveEditChange}
      />
    </div>
  );
};

export default App;
