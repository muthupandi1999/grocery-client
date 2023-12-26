import React from "react";
import { Text, SubText } from "../cart";
import { AddButton } from "@/app/components/buttons/Buttons";
import {
  ProductWrapper,
  ProductImageContainer,
  ProductImage,
  ProductInfoDetails,
  SCTitle,
} from "@/app/assets/style";
import { useRouter } from "next/navigation";

function CartProductCart({ e, onClose }: any) {
  const router = useRouter();

  return (
    <ProductWrapper
      onClick={() => {
        router.push(`/product/prid/${e?.id}`);
        onClose();
      }}
    >
      <ProductImageContainer>
        <ProductImage src={e?.image}></ProductImage>
      </ProductImageContainer>
      <ProductInfoDetails>
        <SCTitle $variant="H13UNIT">{e?.name}</SCTitle>
        <SCTitle $variant="H13UNIT">
          {`${e?.selectedvariant?.values} ${e?.selectedvariant?.unit}`}
        </SCTitle>
        <Text style={{ fontSize: "12px" }}>${e?.selectedvariant?.price}</Text>
      </ProductInfoDetails>
      <AddButton variant={"cartCard"} data={e} productId={e?.id} />
    </ProductWrapper>
  );
}

export default CartProductCart;
