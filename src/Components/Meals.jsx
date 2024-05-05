import React from "react";
import Mealitem from "./Mealitem";
import useHttp from "../Hooks/useHttp";
import Error from "./Error";


const requestConfig = {};

export default function Meals() {
  const {
    data: loadMeals,
    loading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

//   console.log(loadMeals);

  if (loading) {
    return <p  className="center">Fetching Data...</p>;
  }

  if (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return <Error title="Failed to fetch meals" message={errorMessage} />;
  }

  return (
    <ul id="meals">
      {loadMeals.map((meal) => (
        <Mealitem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
