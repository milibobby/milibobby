import React from "react";
import { useParams } from "react-router-dom";

const CustomizationPage = () => {
  const { dishName } = useParams();

  return (
    <div className="customization-page">
      <h1>Customization for {decodeURIComponent(dishName)}</h1>
    </div>
  );
};

export default CustomizationPage;
