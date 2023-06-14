import React from "react";
import Table from "../components/Table";
import Navbar from "../components/Navbar";
const Home = () => {
  return (
    <div className="container-fluid">
      <div className="container my-4">
        <Navbar />
        <Table />
      </div>
    </div>
  );
};

export default Home;
