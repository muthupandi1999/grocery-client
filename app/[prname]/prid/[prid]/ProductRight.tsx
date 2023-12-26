import { BiSolidRightArrow } from "react-icons/bi";
import { VariantSelectorOfferCard, companyBenefits } from "../../../utils/data";
import { AddButton } from "../../../components/buttons/Buttons";
import {
  BreadCrumbsLink,
  ProductPriceWrapper,
  ProductRightSection,
  SCLINK,
  SCTitle,
  TitleTag,
  VariantSelector,
  VariantSelectorContainer,
  VariantSelectorOfferCardWrapper,
} from "../../../assets/style";
import { Breadcrumbs } from "@mui/material";
import PriceTag from "@/app/components/elements/price";
import DeleverTime from "@/app/components/elements/DeleverTime";
import { useEffect } from "react";
import { IProductsById } from "@/app/myContext";
interface PROPS {
  data: IProductsById;
  variantDetails: {
    id?: string;
  };
  selectVariant: (variant: any) => void;
}
function ProductRight({ data, variantDetails, selectVariant }: PROPS) {
  console.log("for Right section", data);
  useEffect(() => {
    const selectProductWithQuantity = data?.product?.variant?.find(
      (variant) => variant?.AddToCart?.[0]?.quantity > 0
    );
    if (selectProductWithQuantity) {
      selectVariant(selectProductWithQuantity);
    } else {
      selectVariant(data?.product?.variant?.[0]);
    }
  }, [data]);

  return (
    <ProductRightSection>
      <div className="productInfo">
        <Breadcrumbs>
          <BreadCrumbsLink underline="none" color="black" href="/">
            Home
          </BreadCrumbsLink>
          <BreadCrumbsLink
            underline="none"
            color="black"
            href={`/productType/${data?.category?.id}/${data?.subCategory?.id}`}
          >
            {data?.category?.name}
          </BreadCrumbsLink>
          <BreadCrumbsLink
            underline="none"
            color="inherit"
            sx={{ cursor: "no-drop" }}
          >
            {data?.product?.name}
          </BreadCrumbsLink>
        </Breadcrumbs>
        <TitleTag $variant="productTitle">{data?.product?.name}</TitleTag>
        <DeleverTime time={45} />
        <hr style={{borderColor:"rgb(0,0,0,0.1)"}}/>

        {/* <div className="viewCategory">
          <a
            href={`/category-id/${data?.category?.id}`}
          >
            View all by {data?.category?.name}
            <BiSolidRightArrow className="right-arrow" />
          </a>
        </div> */}
        {data?.product?.variant?.length === 1 ? (
         
          <div className="product-info-details">
            <div>
              <p className="quantity">
                {data?.product?.variant?.[0]?.values +
                  " " +
                  data?.product?.variant?.[0]?.unit}
              </p>
              {data?.product?.discount ? (
                <ProductPriceWrapper
                  $discount={data?.product?.discount ? true : false}
                >
                  <PriceTag
                    price={data?.product?.variant?.[0]?.price}
                    discount={data?.product?.discount}
                    $variant={"productPage"}
                  />
                  <span className="offerCard">
                    {data?.product?.discount}% OFF
                  </span>
                </ProductPriceWrapper>
              ) : (
                <ProductPriceWrapper $discount={false}>
                  <p className="price">
                    MRP <span>₹ {data?.product?.variant?.[0]?.price}</span>{" "}
                  </p>
                </ProductPriceWrapper>
              )}
            </div>

            <div>
              <AddButton
                data={data?.product?.variant?.[0]}
                variant="productCard"
                productId={data?.product?.id}
              />
            </div>
          </div>
        
        ) : (
          <>
            <SCLINK $variant="" href={""}>
              Select Unit
            </SCLINK>
            <VariantSelectorContainer>
              {data?.product?.variant?.map((variant) => (
                <VariantSelector
                  $selectedVariant={variant?.id === variantDetails?.id}
                  onClick={() => selectVariant(variant)}
                >
                  <SCTitle $variant="H12600">
                    {variant?.values + " " + variant?.unit}
                  </SCTitle>
                  <PriceTag
                    price={variant?.price}
                    discount={20}
                    $variant={"productPage"}
                  />
                  <VariantSelectorOfferCardWrapper>
                    {VariantSelectorOfferCard}
                    <span>20% OFF</span>
                  </VariantSelectorOfferCardWrapper>
                </VariantSelector>
              ))}
            </VariantSelectorContainer>
            <AddButton
              variantDetails={variantDetails}
              variant="variantCard"
              productId={data?.product?.id}
            />
          </>
        )}
      </div>
      <div className="benefits">
        <h4 style={{}}>Why shop from blinkit?</h4>
        <div className="benefitlistContainer">
          {companyBenefits.map((data, index) => (
            <div key={index} className="list-wrapper">
              <div className="icon">
                <img src={data?.iconSrc} alt="" />
              </div>
              <div className="content">
                <p>{data.benifitName}</p>
                <span>{data.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProductRightSection>
  );
}

export default ProductRight;
