import "App.css";
import Form from "components/Form";
import ResultList from "components/ResultList";
const App = () => {
  return (
    <div className="container">
      <Form />
      <ResultList />
      <i className="fa fa-pencil fa-2x fa-flip-horizontal" aria-hidden="true" />
    </div>
  );
};

export default App;
