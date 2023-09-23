import React, { useState, useEffect } from "react";
import Navbar from "./components/homePage/Navbar";
import CarouselComponent from "./components/homePage/Carousel";
import AppRoutes from "./Routes/AppRoutes";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Initialize a state to keep track of dish counts
  const [dishCounts, setDishCounts] = useState({});

  const [dishName, setDishName] = useState("");

  // Function to update the total cart count
  const updateTotalCartCount = () => {
    // Calculate the total count by summing all dish counts
    const totalCount = Object.values(dishCounts).reduce(
      (acc, count) => acc + count,
      0
    );
    return totalCount;
  };

  return (
    <div className="App">
      <Navbar cartCount={updateTotalCartCount()} />{" "}
      {isHomePage && (
        <CarouselComponent
          dishName={dishName}
          updateCartCount={(dishId, newCount) => {
            setDishCounts((prevCounts) => ({
              ...prevCounts,
              [dishId]: newCount,
            }));
          }}
        />
      )}
      <AppRoutes />
    </div>
  );
};

export default App;
