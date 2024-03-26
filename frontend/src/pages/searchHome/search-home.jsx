import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import styles from './searchHome.module.css';

const SearchHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Fetch or import the recipe data
    import('../../../../tool/recipes.json')
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("Data is not in the expected format.");
        }
        const allIngredients = data.reduce((acc, recipe) => {
          return acc.concat(recipe.ingredients);
        }, []);

        // Filter out duplicate ingredients
        const uniqueIngredients = Array.from(new Set(allIngredients));

        setSuggestions(uniqueIngredients);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleTagClick = (ingredient) => {
    setSearchQuery('');
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...selectedIngredients];
    updatedIngredients.splice(index, 1);
    setSelectedIngredients(updatedIngredients);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search for ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className={styles.suggestions}>
            {loading && <span>Loading...</span>}
            {error && <span>Error: {error.message}</span>}
            {!loading && !error && suggestions
              .filter((ingredient) => ingredient.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((ingredient, index) => (
                <span
                  key={index}
                  className={styles.tag}
                  onClick={() => handleTagClick(ingredient)}
                >
                  {ingredient}
                </span>
              ))}
          </div>
        </div>
        <div className={styles.selectedIngredients}>
          {selectedIngredients.map((ingredient, index) => (
            <span key={index} className={styles.selectedTag} onClick={() => handleRemoveIngredient(index)}>
              {ingredient}
              <span className={styles.closeIcon}>×</span>
            </span>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchHome;
