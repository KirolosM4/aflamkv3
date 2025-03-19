import React from "react";
import MainNav from "./component/mainNav";
import HeaderHome from "./componentHome/HeaderHome";
import Home from "./Home";

const App = () => {
  return(
    <div className="bg-black">
      <MainNav/>
      <Home/>
    </div>
  )
}

export default App;