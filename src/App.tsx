import React from "react";
import Header from "./components/Header";
import "./App.css";
import Main from "./components/Main";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Main />
      </div>
    </Provider>
  );
}

export default App;
