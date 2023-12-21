"use client";

import DynamicButton from "./components/buttons/DynamicButton";
import CampaignCard from "./components/cards/CampaignCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  CampaignSliderSettings,
  CategoryProductSliderSettings,
  HomeProductSliderSettings,
  JSONServerData,
} from "./utils/data";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Text } from "./assets/style/dynamicButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  Wrapper,
  Banner,
  BannerInfo,
  BannerText,
  BannerSubText,
  CategoryImageContainer,
  SeeAllText,
  TitleTag,
  FooterAbout,
} from "./assets/style";
import CategoryProductSlider from "./components/sliders/CategoryProductSlider";
import { useRouter } from "next/navigation";
import TodayLowPriceProducts from "./components/todayLowPriceProducts";
import {
  AllProductTypeBanner,
  getAllCategories,
  getAllCategoryProducts,
} from "./service/query";
import { useEffect, useState } from "react";
import { globalContext } from "./utils/states";
import { useLazyQuery, useQuery } from "@apollo/client";
import PageLoader from "./components/loader/pageLoader";
import { AllProducts } from "./service/query";
import { useDispatch, useSelector } from "react-redux";
import { updateProductData } from "./redux/slices/AllProductSlice";
import { SliderHeader } from "./assets/style/commonStyles";
import PopularProducts from "./components/popularProducts";
export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: AllProductsList, loading: AllProductsLoading } =
    useQuery(AllProducts);

  let count = 1;

  const getAllProducts = async (dispatch: any) => {
    try {
      // Assuming loadGreeting fetches data
      if (AllProductsList?.getAllProducts) {
        // data.getAllProducts.forEach((product: any) => {
        dispatch(updateProductData(AllProductsList.getAllProducts)); // Dispatch each product individually
        // });
      }
    } catch (error) {
      // Handle errors if any
    }
  };

  useEffect(() => {
    // setSliderData(CategoryProductsSlider?.getCategoryWithProductTypes);

    // getAllProducts(dispatch);
    // let allProducts = loadGreeting()
    // console.log("allProducts", AllProductsList?.getAllProducts);
    if (count === 1) {
      getAllProducts(dispatch);
      count = count + 1;
    }
  }, []);

  const {
    loading: AllCategoriesLoading,
    error,
    data: allCategories,
  } = useQuery(getAllCategories);

  // const { data: AllCategoryProducts } = useQuery(getAllCategoryProducts) as any;
  const { data: AllBanner, loading: AllProductTypeBannerLoading } = useQuery(
    AllProductTypeBanner
  ) as any;

  // if (AllCategoriesLoading && AllProductTypeBannerLoading)
  // return <PageLoader />;
  return (
    <Wrapper>
      <Banner>
        <BannerInfo>
          <BannerText>Dont miss out on tasty Grocery Deals</BannerText>
          <BannerSubText>
            Your Favourite grocery shop is now online
          </BannerSubText>
          <DynamicButton name="Shop Now" />
        </BannerInfo>
      </Banner>

      <div className="bannerCards">
        {AllBanner?.getAllBanner?.map((e: any) => (
          <CampaignCard key={e.id} e={e} />
        ))}
      </div>

      <div>
        <SliderHeader>
          <TitleTag variant="productTitle">Categories</TitleTag>
          <SeeAllText onClick={() => router.push(`/category`)}>
            See all{" "}
            <ArrowRightAltIcon
              sx={{ fontSize: "22px", position: "relative", top: "4px" }}
            />
          </SeeAllText>
        </SliderHeader>

        <CategoryProductSlider settings={CategoryProductSliderSettings}>
          {allCategories?.getAllCategories?.map((data: any) => (
            <CategoryImageContainer key={data?.id}>
              <div
                className="categoryCartBox"
                key={data.id}
                onClick={() => router.push(data?.defaultRoute)}
              >
                <div className="img-container">
                  <img src={data?.image} />
                </div>
                <div className="productName">
                  <Text fontSize="12px" fontWeight="600" padding="0 0 5px 0">
                    {data?.name}
                  </Text>
                  <Text fontSize="12px" fontWeight="600" padding="5px 0 0 0">
                    {data?.productsCount} Products
                  </Text>
                </div>
                <MoreVertIcon sx={{ fontSize: "29px", opacity: 0.5 }} />

                {/* <p
                  style={{
                    padding: "25px 0 10px 0",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                   
                </p> */}
              </div>
            </CategoryImageContainer>
          ))}
        </CategoryProductSlider>
      </div>

      {/* <CategoryImageContainer>
        {allCategories?.getAllCategories?.map((data: any) => (
          <div
            className="categoryCartBox"
            key={data.id}
            onClick={() => router.push(data?.defaultRoute)}
          >
            <div className="img-container">
              <img src={data?.image} />
            </div>
            <p
              style={{
                padding: "25px 0 10px 0",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              {data?.name}
            </p>
          </div>
        ))}
      </CategoryImageContainer> */}
      <TodayLowPriceProducts id={"65549be6b8cc555881cb43f3"} />
      <TodayLowPriceProducts id={"6555c9459ad354780c2e6c4c"} />
      <TitleTag variant="productTitle">Trending Products</TitleTag>
      <PopularProducts/>
      <FooterAbout>
        <div className="col">
          <div className="card mb-3 border-0">
            <div className="footerAboutContainer">
              <div className="col-md-2 text-dark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  className="footerAboutIcon"
                >
                  <path
                    fill="currentColor"
                    d="M21.5 15a3 3 0 0 0-1.9-2.78l1.87-7a1 1 0 0 0-.18-.87A1 1 0 0 0 20.5 4H6.8l-.33-1.26A1 1 0 0 0 5.5 2h-2v2h1.23l2.48 9.26a1 1 0 0 0 1 .74H18.5a1 1 0 0 1 0 2h-13a1 1 0 0 0 0 2h1.18a3 3 0 1 0 5.64 0h2.36a3 3 0 1 0 5.82 1a2.94 2.94 0 0 0-.4-1.47A3 3 0 0 0 21.5 15Zm-3.91-3H9L7.34 6H19.2ZM9.5 20a1 1 0 1 1 1-1a1 1 0 0 1-1 1Zm8 0a1 1 0 1 1 1-1a1 1 0 0 1-1 1Z"
                  ></path>
                </svg>
              </div>
              <div className="FooterAboutDetails">
                <div className="footerAboutContainerDetails">
                  <h5>Free delivery</h5>
                  <p className="card-text">
                    Enjoy free, swift delivery - every order, every time. Your
                    groceries, delivered fast, free, and reliably.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card mb-3 border-0">
            <div className="footerAboutContainer">
              <div className="col-md-2 text-dark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  className="footerAboutIcon"
                >
                  <path
                    fill="currentColor"
                    d="M19.63 3.65a1 1 0 0 0-.84-.2a8 8 0 0 1-6.22-1.27a1 1 0 0 0-1.14 0a8 8 0 0 1-6.22 1.27a1 1 0 0 0-.84.2a1 1 0 0 0-.37.78v7.45a9 9 0 0 0 3.77 7.33l3.65 2.6a1 1 0 0 0 1.16 0l3.65-2.6A9 9 0 0 0 20 11.88V4.43a1 1 0 0 0-.37-.78ZM18 11.88a7 7 0 0 1-2.93 5.7L12 19.77l-3.07-2.19A7 7 0 0 1 6 11.88v-6.3a10 10 0 0 0 6-1.39a10 10 0 0 0 6 1.39Zm-4.46-2.29l-2.69 2.7l-.89-.9a1 1 0 0 0-1.42 1.42l1.6 1.6a1 1 0 0 0 1.42 0L15 11a1 1 0 0 0-1.42-1.42Z"
                  ></path>
                </svg>
              </div>
              <div className="FooterAboutDetails">
                <div className="footerAboutContainerDetails">
                  <h5>100% secure payment</h5>
                  <p className="card-text">
                    Shop worry-free with our 100% secure payment system. Your
                    transactions, safeguarded at every step.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card mb-3 border-0">
            <div className="footerAboutContainer">
              <div className="col-md-2 text-dark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  className="footerAboutIcon"
                >
                  <path
                    fill="currentColor"
                    d="M22 5H2a1 1 0 0 0-1 1v4a3 3 0 0 0 2 2.82V22a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-9.18A3 3 0 0 0 23 10V6a1 1 0 0 0-1-1Zm-7 2h2v3a1 1 0 0 1-2 0Zm-4 0h2v3a1 1 0 0 1-2 0ZM7 7h2v3a1 1 0 0 1-2 0Zm-3 4a1 1 0 0 1-1-1V7h2v3a1 1 0 0 1-1 1Zm10 10h-4v-2a2 2 0 0 1 4 0Zm5 0h-3v-2a4 4 0 0 0-8 0v2H5v-8.18a3.17 3.17 0 0 0 1-.6a3 3 0 0 0 4 0a3 3 0 0 0 4 0a3 3 0 0 0 4 0a3.17 3.17 0 0 0 1 .6Zm2-11a1 1 0 0 1-2 0V7h2ZM4.3 3H20a1 1 0 0 0 0-2H4.3a1 1 0 0 0 0 2Z"
                  ></path>
                </svg>
              </div>
              <div className="FooterAboutDetails">
                <div className="footerAboutContainerDetails">
                  <h5>Quality guarantee</h5>
                  <p className="card-text">
                    Quality guaranteed in every item, every time. Uncompromising
                    standards, just for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card mb-3 border-0">
            <div className="footerAboutContainer">
              <div className="col-md-2 text-dark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  className="footerAboutIcon"
                >
                  <path
                    fill="currentColor"
                    d="M18 7h-.35A3.45 3.45 0 0 0 18 5.5a3.49 3.49 0 0 0-6-2.44A3.49 3.49 0 0 0 6 5.5A3.45 3.45 0 0 0 6.35 7H6a3 3 0 0 0-3 3v2a1 1 0 0 0 1 1h1v6a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-6h1a1 1 0 0 0 1-1v-2a3 3 0 0 0-3-3Zm-7 13H8a1 1 0 0 1-1-1v-6h4Zm0-9H5v-1a1 1 0 0 1 1-1h5Zm0-4H9.5A1.5 1.5 0 1 1 11 5.5Zm2-1.5A1.5 1.5 0 1 1 14.5 7H13ZM17 19a1 1 0 0 1-1 1h-3v-7h4Zm2-8h-6V9h5a1 1 0 0 1 1 1Z"
                  ></path>
                </svg>
              </div>
              <div className="FooterAboutDetails">
                <div className="footerAboutContainerDetails">
                  <h5>Daily offers</h5>
                  <p className="card-text">
                    Daily specials, endless savings, just a click away.
                    Unbeatable offers, every single day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FooterAbout>
    </Wrapper>
  );
}
