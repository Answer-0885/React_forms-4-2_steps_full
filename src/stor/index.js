import { combineReducers, createStore } from "redux";
import { reducerSteps } from "reducers/reducerSteps";

const reducer = combineReducers({
  reducerSteps: reducerSteps,
});
const store = createStore(reducer);

export { store };
