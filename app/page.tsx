"use client";

import DynamicButton from "./components/buttons/DynamicButton";
import CampaignCard from "./components/cards/CampaignCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CampaignSliderSettings } from "./utils/data";
import {
  Wrapper,
  Banner,
  BannerInfo,
  BannerText,
  BannerSubText,
  CategoryListContainer,
  CategoryListWrapper,
  LoaderFlexContainer,
  SCTitle,
  SCIMGTAG,
  SCLINK,
  SCCategoryImgBox,
  FooterAbout,
} from "./assets/style";
import CategoryProductSlider from "./components/sliders/CategoryProductSlider";
import { useRouter } from "next/navigation";
import { AllCategory, BannerArrProps } from "./assets/style/interface";
import HomeProductSliders from "./components/sliders/HomeProductSliders";
import CampaignCardLoader from "./Loading UI/campaignCardLoader";
import CategoryListWrapperLoader from "./Loading UI/categoryListWrapperLoader";
import { getAllCategoryWithTypes, getBanner } from "./service/api/data";
import { useEffect, useState, useContext } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { getAllBanners, getProductsByCategoryId } from "./service/query";
import { MyContext } from "../app/myContext";
import {
  setCategoryProducts,
  setUpdateCategoryProducts,
} from "./myContext/action";
import ProductCardLoader from "./Loading UI/productCardLoader";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {

  const [
    getBanners,
    { data: allBanners, loading: bannerLoader },
  ] = useLazyQuery(getAllBanners,{
    fetchPolicy:"no-cache"
  });

  const { allCategories, allCategoryLoader } = getAllCategoryWithTypes();
  const [sliderDatas, setSliderDatas] = useState([]);
  const staticCategoryId = [
    "65549be6b8cc555881cb43f3",
    "6555c9459ad354780c2e6c4c",
  ];
  const { cartItems, categoryProducts, dispatch } = useContext(MyContext);
  const [getProductsByCategory, { loading }] = useLazyQuery(
    getProductsByCategoryId
  );

  useEffect(() => {
    const cloneData = JSON.parse(JSON.stringify(sliderDatas));
    const intialLoad = async () => {
      staticCategoryId.map(async (value) => {
        const response = await getProductsByCategory({
          variables: { getCategoryWithProductTypesId: value, sliceCount: 10 },
        });
        cloneData.push(response?.data?.getCategoryWithProductTypes);
        setCategoryProducts(
          dispatch,
          response?.data?.getCategoryWithProductTypes
        );
      });
      setSliderDatas(cloneData);
    };

    intialLoad();

    getBanners();
  }, []);

  useEffect(() => {
    setUpdateCategoryProducts(dispatch);
  }, [cartItems]);

  return (
    <Wrapper>
      <Banner>
        <BannerInfo>
          <BannerText>Don't miss out on tasty Grocery Deals</BannerText>
          <BannerSubText>
            Your Favourite grocery shop is now online
          </BannerSubText>
          <DynamicButton name="Shop Now" />
        </BannerInfo>
      </Banner>

      <CategoryProductSlider settings={CampaignSliderSettings}>
        {bannerLoader
          ? [0, 1, 2, 3, 4].map((_, id) => <CampaignCardLoader key={id} />)
          : allBanners &&
            allBanners?.getAllBanner?.map((e) => (
              <CampaignCard key={e.id} e={e} />
            ))}
      </CategoryProductSlider>

      <CategoryListContainer>
        {allCategories?.getAllCategories?.map((data: AllCategory) => (
          <SCLINK
            $variant=""
            href={`/productType/${data?.id}/${data?.productTypes?.[0]?.id}`}
            key={data?.id}
          >
            <CategoryListWrapper $Loader={allCategoryLoader}>
              <SCCategoryImgBox $variant="w-100">
                <SCIMGTAG src={data?.image} />
              </SCCategoryImgBox>

              <SCTitle $variant="H16CAT600">{data?.name}</SCTitle>
            </CategoryListWrapper>
          </SCLINK>
        ))}
        {allCategoryLoader && (
          <CategoryListWrapperLoader loaderState={allCategoryLoader} />
        )}
      </CategoryListContainer>
      {loading && (
        <LoaderFlexContainer>
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <ProductCardLoader key={i} />
            ))}
        </LoaderFlexContainer>
      )}
      {categoryProducts?.map((data) => (
        <HomeProductSliders key={data?.id} data={data} />
      ))}
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
                  Daily specials, endless savings, just a click away. Unbeatable
                  offers, every single day.
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
