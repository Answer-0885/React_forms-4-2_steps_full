import "App.css";
import React from "react";
import ItemResult from "./ItemResult";
import { nanoid } from "nanoid";
const ResultList = ({
  tableData,
  handleRemove,
  handleEditMode,
  handleSaveEditChange,
  isEdit,
  handleDate,
  handleSteps,
  handleSubmit,
  cancelEditMode,
  stepsAll,
  editDate,
  editSteps,
}) => {
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
              stepsAll={stepsAll}
              handleRemove={handleRemove}
              handleEditMode={handleEditMode}
              steps={steps}
              id={id}
              edit={edit}
              isEdit={isEdit}
              handleDate={handleDate}
              handleSteps={handleSteps}
              handleSubmit={handleSubmit}
              cancelEditMode={cancelEditMode}
              idx={idx}
              editDate={editDate}
              editSteps={editSteps}
              handleSaveEditChange={handleSaveEditChange}
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
