import { ProductTimerCard } from "@/app/assets/style";
import React from "react";

function DeleverTime({ time }) {
  return (
    time && (
      <ProductTimerCard $variant="">
        <img
          style={{ width: 11, height: 11 }}
          src="https://cdn.grofers.com/assets/eta-icons/15-mins.png"
          alt=""
        />
        <span>{time} MINS</span>
      </ProductTimerCard>
    )
  );
}

export default DeleverTime;
