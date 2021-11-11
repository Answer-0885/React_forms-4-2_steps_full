import "App.css";
import React from "react";
import ItemResult from "./ItemResult";

const ResultList = ({ tableData, handleRemove, handleEdit }) => {
  return (
    <React.Fragment>
      <div className="titleResult">
        <span>Дата(ДД.ММ.ГГ)</span>
        <span>Пройдено км</span>
        <span>Действия</span>
      </div>
      <ul className="resultList">
        {tableData.length > 0 ? (
          tableData.map(({ date, distance, id }) => (
            <ItemResult
              key={id}
              date={date}
              handleRemove={handleRemove}
              handleEdit={handleEdit}
              distance={distance}
              id={id}
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
