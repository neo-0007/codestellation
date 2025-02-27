import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/dashboard";
import Register from "./pages/Register";
// import Loader from "./components/Loader";

function App() {

  // useEffect(() => {
    // const handlePageLoad = () => {
    //   setIsAppLoading(false); // Stop showing loader once page has loaded
    // };

    // Set a small delay to mimic realistic loading behavior
    // const timeout = setTimeout(handlePageLoad, 5000); 

    // return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  // }, []);

  // if (status === "loading" || status === "idle" || isAppLoading) {
  //   return <Loader />
  // }

  return (
      <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
