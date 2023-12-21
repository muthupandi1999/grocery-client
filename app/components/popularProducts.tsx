import React from 'react'
import PopuplarProductCard from './cards/popuplarProductCard'

function PopularProducts() {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:"20px", marginTop:"30px"
        }}>
      <PopuplarProductCard/>
      <PopuplarProductCard/>
      <PopuplarProductCard/>
      <PopuplarProductCard/>
      <PopuplarProductCard/>
      <PopuplarProductCard/>
      <PopuplarProductCard/>
      <PopuplarProductCard/>
    </div>
  )
}

export default PopularProducts
