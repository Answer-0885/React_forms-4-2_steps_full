import "App.css";
import React from "react";
import ItemResult from "./ItemResult";

const ResultList = ({ submit, handleRemove, handleEdit }) => {
  return (
    <React.Fragment>
      <div className="titleResult">
        <span>Дата(ДД.ММ.ГГ)</span>
        <span>Пройдено км</span>
        <span>Действия</span>
      </div>
      <ul className="resultList">
        {submit.map(({ date, distance, id }) => (
          <ItemResult
            key={id}
            date={date}
            handleRemove={handleRemove}
            handleEdit={handleEdit}
            distance={distance}
            id={id}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};
export default ResultList;
