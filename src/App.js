import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouterPage from "./Routes/RouterPage";
import { hotjar } from 'react-hotjar';

function App() {



  return (
    <BrowserRouter>
      <div className="App">
        <RouterPage />
      </div>
    </BrowserRouter>
  );
}

export default App;
