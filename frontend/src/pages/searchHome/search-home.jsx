import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import styles from './searchHome.module.css';

const SearchHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [suggestions] = useState([
    "Tomato", "Onion", "Garlic", "Potato", "Carrot", "Broccoli", "Spinach", "Bell Pepper"
    // Add more ingredient suggestions here
  ]);

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
            {suggestions
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
