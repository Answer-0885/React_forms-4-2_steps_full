import "App.css";
import React, { Fragment } from "react";
const ResultList = () => {
  return (
    <React.Fragment>
      <div className="titleResult">
        <span>Дата(ДД.ММ.ГГ)</span>
        <span>Пройдено км</span>
        <span>Действия</span>
      </div>
      <div className="resultList">
        <span>Список результатов</span>
      </div>
    </React.Fragment>
  );
};
export default ResultList;
