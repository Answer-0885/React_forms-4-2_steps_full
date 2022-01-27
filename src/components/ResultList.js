import "App.css";
import React from "react";
import ItemResult from "./ItemResult";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";

const ResultList = () => {
  const { tableData } = useSelector((state) => state.reducerSteps);

  return (
    <React.Fragment>
      <div className="titleResult">
        <span>Дата(ДД.ММ.ГГ)</span>
        <span>Пройдено км</span>
        <span>Действия</span>
      </div>
      <ul className="resultList">
        {tableData.length > 0 ? (
          tableData.map(({ date, steps, id, edit }, idx) => (
            <ItemResult
              key={nanoid()}
              date={date}
              steps={steps}
              id={id}
              edit={edit}
              idx={idx}
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
