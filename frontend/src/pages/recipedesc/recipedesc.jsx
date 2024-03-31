import React from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { Grid, Paper, Container } from '@mui/material';
import styles from './RecipeDesc.module.css'; // Import the CSS module

const RecipeDesc = () => {
  return (
    <div>
      <Navbar/>
      <Container className={styles.container}>
        <Grid container spacing={1}>
          {/* First Box */}
          <Grid item xs={4}>
            <Paper className={styles.box}>
              box1
            </Paper>
          </Grid>
          {/* Second Box */}
          <Grid item xs={4}>
            <Paper className={styles.box}>
              Box 2
            </Paper>
          </Grid>
          {/* Third Box */}
          <Grid item xs={4}>
            <Paper className={styles.box}>
              Box 3
            </Paper>
          </Grid>
        </Grid>
        {/* Rectangle */}
        <div className={styles.rectangle}>
          Rectangle
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default RecipeDesc;
