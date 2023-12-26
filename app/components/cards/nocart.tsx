import {
  CardContainer,
  CustomAddButton,
  CustomH3,
  CustomSpan,
  HTMLImgtag,
  ImgTag,
} from "@/app/assets/style";
import React from "react";

function Nocart({ onClose, open }: { onClose: () => boolean; open: boolean }) {
  return (
    <CardContainer $variant="cartEmptyCard" $slider={true}>
      <div
        style={{
          width: 150,
          height: 145,
          margin: "10px 0",
        }}
      >
        <HTMLImgtag
          src="https://cdn.grofers.com/assets/ui/empty_states/emp_empty_cart.png"
          alt=""
        />
      </div>
      <CustomH3>You don't have any items in your cart</CustomH3>
      <CustomSpan>Your favourite items are just a click away</CustomSpan>
      <CustomAddButton
        onClick={onClose}
        disabled={false}
        $count={1}
        $disable={false}
      >
        Start Shopping
      </CustomAddButton>
    </CardContainer>
  );
}

export default Nocart;
