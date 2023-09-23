import React, { useState, useEffect } from "react";
import "../../styles/navbar.css";
import { fetchRestaurantNames } from "../../services/ApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ cartCount }) => {
  // Receive cartCount as a prop
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchRestaurantNames();
        setRestaurantData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div>
          {restaurantData.map(
            (restaurant, index) => restaurant.restaurant_name
          )}
        </div>
      </div>
      <div className="navbar-right">
        <div className="my-orders"> My Orders</div>
        <FontAwesomeIcon icon={faShoppingCart} />
        <div className="cart-counter">{cartCount}</div>{" "}
      </div>
    </div>
  );
};

export default Navbar;
