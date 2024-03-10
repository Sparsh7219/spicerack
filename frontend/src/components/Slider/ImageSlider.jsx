import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React, { useState } from 'react';
import Styles from './slider.module.css'


function ImageSlider({ imageurls }) {
  const [imageIndex, setImageIndex] = useState(0);

  function showNextImage() {
    setImageIndex(index =>{
      if(index === imageurls.length-1) return 0
      return index + 1
    })
  }
  function showPrevImage() {
    setImageIndex(index =>{
      if(index === 0) return imageurls.length -1
      return index - 1
    })
  }
  return (
    <div style={{width:"100%",height: "100%",position:"reltive"}}>
      <img src={imageurls[imageIndex]} alt='food' className={Styles.imgsliderimg}  />
      <button className={Styles.imgsliderbtn} style={{left : "0"}} onClick={showPrevImage}><ArrowBackIosIcon /></button>
      <button className={Styles.imgsliderbtn} style={{right : "0"}} onClick={showNextImage}><ArrowForwardIosIcon  /></button>
    </div>
  );
}

export default ImageSlider;
