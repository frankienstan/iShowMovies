import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ fetchMoviesByCategory }) => {
  const [activeCategory, setActiveCategory] = useState("trending");

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    fetchMoviesByCategory(category);
  };

  return (
    <div className="sidebar">
      <button
        className={activeCategory === "trending" ? "active" : ""}
        onClick={() => handleCategoryClick("trending")}
      >
        Trending
      </button>

      <button
        className={activeCategory === "topRated" ? "active" : ""}
        onClick={() => handleCategoryClick("topRated")}
      >
        Top Rated
      </button>

      <button
        className={activeCategory === "newReleases" ? "active" : ""}
        onClick={() => handleCategoryClick("newReleases")}
      >
        New Releases
      </button>
    </div>
  );
};

export default Sidebar;
