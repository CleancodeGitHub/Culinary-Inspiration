import React, { useState } from 'react';
import { ChefHat, Loader2, Utensils, Shuffle, Heart } from 'lucide-react';
import { MealType } from './types';

const FAVORITE_RECIPES = [
  {
    id: 1,
    name: "Classic Margherita Pizza",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=800&q=80",
    category: "Italian",
    description: "A timeless Neapolitan pizza with fresh basil, mozzarella, and tomatoes"
  },
  {
    id: 2,
    name: "Japanese Ramen",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    category: "Japanese",
    description: "Rich and comforting noodle soup with tender chashu pork"
  },
  {
    id: 3,
    name: "Mediterranean Grilled Salmon",
    image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=800&q=80",
    category: "Mediterranean",
    description: "Fresh salmon with herbs, lemon, and olive oil"
  }
];

function App() {
  const [meal, setMeal] = useState<MealType | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'random' | 'favorites'>('random');

  const getMeal = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json();
      setMeal(data.meals[0]);
    } catch (error) {
      console.error('Error fetching meal:', error);
    }
    setLoading(false);
  };

  const getIngredients = (meal: MealType) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}` as keyof MealType];
      const measure = meal[`strMeasure${i}` as keyof MealType];
      
      if (ingredient) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <ChefHat className="w-16 h-16 text-orange-500 animate-bounce" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4 font-serif">
            Culinary Inspiration
          </h1>
          <p className="text-xl text-gray-600 mb-8 italic">
            Discover your next memorable meal
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('random')}
              className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300
                ${activeTab === 'random' 
                  ? 'bg-orange-500 text-white shadow-lg scale-105' 
                  : 'bg-white text-gray-700 hover:bg-orange-100'}`}
            >
              <Shuffle className="w-5 h-5 mr-2" />
              Random Recipe
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300
                ${activeTab === 'favorites' 
                  ? 'bg-rose-500 text-white shadow-lg scale-105' 
                  : 'bg-white text-gray-700 hover:bg-rose-100'}`}
            >
              <Heart className="w-5 h-5 mr-2" />
              Favorite Dishes
            </button>
          </div>

          {activeTab === 'random' && (
            <button
              onClick={getMeal}
              disabled={loading}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600
                       text-white font-semibold py-4 px-10 rounded-full shadow-lg transform transition-all 
                       duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed 
                       flex items-center justify-center mx-auto"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <>
                  <Utensils className="w-5 h-5 mr-2" />
                  Discover New Recipe
                </>
              )}
            </button>
          )}
        </div>

        {activeTab === 'favorites' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn">
            {FAVORITE_RECIPES.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-2xl shadow-xl overflow-hidden transform 
                                            transition-all duration-300 hover:scale-105">
                <div className="h-48 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm font-semibold text-orange-500 mb-2 block">
                    {recipe.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.name}</h3>
                  <p className="text-gray-600">{recipe.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'random' && meal && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="rounded-xl overflow-hidden shadow-lg mb-6 transform transition-all duration-300 hover:scale-105">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-[400px] object-cover"
                  />
                </div>

                <div className="space-y-4">
                  {meal.strCategory && (
                    <p className="text-gray-700">
                      <span className="font-semibold">Category:</span> {meal.strCategory}
                    </p>
                  )}
                  {meal.strArea && (
                    <p className="text-gray-700">
                      <span className="font-semibold">Cuisine:</span> {meal.strArea}
                    </p>
                  )}
                  {meal.strTags && (
                    <div className="flex flex-wrap gap-2">
                      {meal.strTags.split(',').map((tag) => (
                        <span
                          key={tag}
                          className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 font-serif">{meal.strMeal}</h2>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">Ingredients</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {getIngredients(meal).map((ingredient, index) => (
                      <li key={index} className="text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">Instructions</h3>
                  <div className="prose prose-orange">
                    {meal.strInstructions.split('\n').map((instruction, index) => (
                      instruction.trim() && (
                        <p key={index} className="text-gray-600 mb-2">
                          {instruction}
                        </p>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {meal.strYoutube && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                  Video Recipe
                </h3>
                <div className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}`}
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;