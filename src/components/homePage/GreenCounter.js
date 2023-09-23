import React from "react";
import "../../styles/greenCounter.css";

const GreenCounter = ({ dishAvailability, dishId, count, setCount }) => {
  const handleIncrement = () => {
    if (dishAvailability) {
      const newCount = count + 1;
      setCount(newCount);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
    }
  };

  return (
    <div
      key={dishId}
      className={dishAvailability ? "green-counter" : "not-available"}
    >
      {dishAvailability ? (
        <>
          <button onClick={handleDecrement}>-</button>
          <div>{count}</div>
          <button onClick={handleIncrement}>+</button>
        </>
      ) : (
        <p>Not Available</p>
      )}
    </div>
  );
};

export default GreenCounter;
