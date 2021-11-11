import "App.css";
import React from "react";
import ItemResult from "./ItemResult";
import { nanoid } from "nanoid";
const ResultList = ({ tableData, handleRemove, handleEdit, edit }) => {
  return (
    <React.Fragment>
      <div className="titleResult">
        <span>Дата(ДД.ММ.ГГ)</span>
        <span>Пройдено км</span>
        <span>Действия</span>
      </div>
      <ul className="resultList">
        {tableData.length > 0 ? (
          tableData.map(({ date, steps, id }) => (
            <ItemResult
              key={nanoid()}
              date={date}
              handleRemove={handleRemove}
              handleEdit={handleEdit}
              steps={steps}
              id={id}
              edit={edit}
            />
          ))
        ) : (
          <li className="noData">No data to display</li>
        )}
      </ul>
    </React.Fragment>
  );
};
export default ResultList;
