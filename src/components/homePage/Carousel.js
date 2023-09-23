import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { fetchRestaurantData } from "../../services/ApiService";
import "../../styles/carousel.css";
import GreenCounter from "./GreenCounter";
import { useNavigate, Link } from "react-router-dom";

const CarouselComponent = ({ updateCartCount }) => {
  const [menuCategories, setMenuCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchRestaurantData();
        const menuCategories = data[0].table_menu_list.map((category) => ({
          ...category,
        }));
        setMenuCategories(menuCategories);
        if (menuCategories.length > 0) {
          setSelectedCategory(menuCategories[0].menu_category);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  // Create a state object to manage counts for each dish
  const [dishCounts, setDishCounts] = useState({});

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  // Function to update the total cart count
  const updateTotalCartCount = () => {
    const totalCount = Object.values(dishCounts).reduce(
      (acc, count) => acc + count,
      0
    );
    return totalCount;
  };

  return (
    <div className="carousel-container">
      <div className="category-list">
        {menuCategories.map((category, index) => (
          <div
            key={index}
            className={`category-item ${
              selectedCategory === category.menu_category ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category.menu_category)}
          >
            {category.menu_category}
          </div>
        ))}
      </div>
      <div className="carousel-wrapper">
        <Carousel
          showThumbs={false}
          className="custom-carousel"
          showStatus={false}
        >
          {menuCategories
            .filter((category) => category.menu_category === selectedCategory)
            .map((category, index) => (
              <div key={index}>
                {category.category_dishes.map((dish, dishIndex) => (
                  <div
                    key={dishIndex}
                    className={`dish-container ${
                      dish.dish_Availability === "Not Available"
                        ? "dish-not-available"
                        : ""
                    }`}
                  >
                    <div className="dish-header">
                      <div className="dish-bullet">
                        <div className={`dish-circle`}></div>
                      </div>
                      <div className="dish-name">
                        <h3>{dish.dish_name}</h3>
                      </div>
                    </div>
                    <div className="dish-details">
                      <div className="dish-content">
                        <div className="dish-price">
                          <p>{dish.dish_price} SAR</p>
                        </div>
                        <p
                          className={
                            dish.dish_Availability === "Not Available"
                              ? "not-available-text"
                              : ""
                          }
                        >
                          {dish.dish_description}
                        </p>
                        <GreenCounter
                          dishAvailability={dish.dish_Availability}
                          dishId={dish.dish_id}
                          count={dishCounts[dish.dish_id] || 0}
                          setCount={(newCount) => {
                            setDishCounts({
                              ...dishCounts,
                              [dish.dish_id]: newCount,
                            });
                            updateCartCount(dish.dish_id, newCount);
                          }}
                        />
                        {dish.addonCat.length > 0 && (
                          <Link
                            to={`/customization/${encodeURIComponent(
                              dish.dish_name
                            )}`}
                            className="customization-link"
                          >
                            Customization Available
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="dish-calories">
                      <p>Calories: {dish.dish_calories}</p>
                    </div>
                    <div className="dish-image">
                      <img src={dish.dish_image} alt={dish.dish_name} />
                    </div>
                    <hr className="dish-divider" />
                  </div>
                ))}
              </div>
            ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselComponent;
