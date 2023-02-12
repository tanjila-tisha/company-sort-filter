import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import CompanyList from "./components/CompanyList";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1 className="text-3xl font-bold underline">Company Portal</h1>
        <CompanyList />
      </div>
    </Provider>
  );
}

export default App;
