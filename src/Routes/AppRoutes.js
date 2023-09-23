import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomizationPage from "../components/CustomizationPage";
import CarouselComponent from "../components/homePage/Carousel";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/customization/:dishName" element={<CustomizationPage />} />
      <Route path="/menu" element={<CarouselComponent />} />
    </Routes>
  );
};

export default AppRoutes;
