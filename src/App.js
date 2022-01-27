import "App.css";
import Form from "components/Form";
import ResultList from "components/ResultList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleKey } from "actions/createActions";

const App = () => {
  const { edit } = useSelector((state) => state.reducerSteps);
  const dispatch = useDispatch();
  /**
   * Функция handleKey очень простая
   * если мы нажали на escape - с окна снимается прослушчик событий
   * и мы больше не следим за нажатиями клавиш, так как нам надо следить
   * за нажатием клавиш лишь в режиме редактирования! Если нет режима редактирования
   * то и следить незачем. Ну и по клику на escape вызывается хук setEdit и отменяет глобальный режим редактирования
   * и также надо пройти по всем записям и отменить edit true у которой есть;
   */
  const handleEscKey = (e) => {
    console.log("e.keyCode", e.keyCode);
    if (e.keyCode === 27) {
      window.removeEventListener("keydown", handleEscKey);
      dispatch(handleKey());
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
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [edit]);

  return (
    <div className="container">
      <div className="title">Учёт тренировок</div>
      <Form />
      <ResultList />
    </div>
  );
};

export default App;
