// import {
//   FlexBox,
//   FooterContainer,
//   SCLINK,
//   SCTitle,
// } from "@/app/assets/style";
// import { JSONServerData } from "@/app/utils/data";
// import { Grid } from "@mui/material";
// import Link from "next/link";
// import React from "react";
// import { AllCategory } from "@/app/assets/style/interface";
// import { getAllCategoryWithTypes } from "@/app/service/api/data";

// const FooterComponent = () => {
//   const { allCategories } = getAllCategoryWithTypes();
//   const CategoryLinks: AllCategory = allCategories?.getAllCategories;
//   console.log("productTypesLinks",CategoryLinks);

//   return (
//     <FooterContainer container>
//       <Grid item sm={12} xl={3.8}>
//         <SCTitle $variant="600">Useful Links</SCTitle>

//         <Grid rowGap={1} my={2} container>
//           {JSONServerData.useFullLinks.map((data, i) => (
//             <Grid  item xs={12} md={4} key={i}>
//               <SCLINK href={""} $variant="A14CAPSHover">
//                 {data}
//               </SCLINK>
//             </Grid>
//           ))}
//         </Grid>
//       </Grid>
//       <Grid item xl={8.2}>
//         <FlexBox $variant="between" $disable={false}>
//           <SCTitle $variant="600">Categories </SCTitle>
//           <SCLINK $variant="GR" href={"/category"}>
//             see all
//           </SCLINK>{" "}
//         </FlexBox>
//         <Grid container  rowGap={1} my={2}>
//           {CategoryLinks?.map((data) => (
//             <Grid  item xs={12} md={4} key={data?.id}>
//               <SCLINK  href={`/productType/${data?.id}/${data?.productTypes?.[0]?.id}`} $variant="A14CAPSA14CAPSHover">
//                 {data.name}
//               </SCLINK>
//             </Grid>
//           ))}
//         </Grid>
//       </Grid>
//     </FooterContainer>
//   );
// };

// export default FooterComponent;

import {
  FooterContainer,
  LinksTitleTag,
  Rights,
  StyledLink,
} from "@/app/assets/style";
import { JSONServerData } from "@/app/utils/data";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import { useQuery } from "@apollo/client";
// import { getAllCategories } from "@/app/service/query";
// import { CategoryI } from "@/app/assets/style/interface";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import SendIcon from "@mui/icons-material/Send";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const FooterComponent = () => {
  // const router = useRouter();
  // const { loading, error, data: allCategories } = useQuery(getAllCategories);
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <FooterContainer container>
        <span className="animation"></span>
        {/* <Grid sx={{ padding: "40px 0 0 0" }} xl={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <LinksTitleTag>Categories</LinksTitleTag>

            <Link href={"/category"}>
              <h3
                style={{
                  fontWeight: "600",
                  fontSize: "16px",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                  paddingLeft: "20px",
                  fontFamily: "'Montserrat', sans-serif",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                see all
                <ChevronRightIcon
                  sx={{
                    fontSize: "24px",
                    position: "relative",
                    top: "1px",
                    right: "3px",
                  }}
                />
              </h3>
            </Link>
          </div>
        </Grid>
        <Grid sx={{ margin: "0px !important" }} container my={2}>
          {allCategories?.getAllCategories?.map((data: CategoryI, i: any) => (
            <Grid key={i} xs={12} md={2.5}>
              <Link key={data.id} href={data?.defaultRoute}>
                <StyledLink>{data.name}</StyledLink>
              </Link>
            </Grid>
          ))}
        </Grid> */}
        <div className="footerSecContainer">
          <img
            src="https://grostore.themetags.com/public/frontend/default/assets/img/shapes/tomato.svg?v=v3.0.0"
            alt="tomato"
            className="tomatoAnimation"
          />
          <img
            src="https://grostore.themetags.com/public/frontend/default/assets/img/shapes/pata-lg.svg?v=v3.0.0"
            alt="pata"
            className="animation2"
          />
          <img
            src="https://grostore.themetags.com/public/frontend/default/assets/img/shapes/pata-xs.svg?v=v3.0.0"
            alt="pata"
            className="animation3"
          />
          <img
            src="https://grostore.themetags.com/public/frontend/default/assets/img/shapes/frame-circle.svg?v=v3.0.0"
            alt="frame"
            className="animation4"
          />
          <img
            src="https://grostore.themetags.com/public/frontend/default/assets/img/shapes/leaf.svg?v=v3.0.0"
            alt="leaf"
            className="animation5"
          />

          <img
            src="https://grostore.themetags.com/public/frontend/default/assets/img/shapes/leaf.svg?v=v3.0.0"
            alt="pata"
            className="animation6"
          />
          <img
            src="https://grostore.themetags.com/public/frontend/default/assets/img/shapes/pata-xs.svg?v=v3.0.0"
            alt="pata"
            className="animation7"
          />
          <img
            src="https://grostore.themetags.com/public/frontend/default/assets/img/shapes/tomato-slice.svg?v=v3.0.0"
            alt="tomato slice"
            className="animation8"
          />
          <img
            src="https://grostore.themetags.com/public/frontend/default/assets/img/shapes/tomato-half.svg?v=v3.0.0"
            alt="tomato"
            className="animation9"
          />
          <Grid className="footerSection" sx={{ padding: "40px 0" }} container>
            <Grid xs={12} md={3.5}>
              <div style={{ paddingBottom: "10px", marginTop: "-7px" }}>
                <img
                  src="https://demo.templatesjungle.com/foodmart/images/logo.png"
                  alt=""
                />
              </div>
              {/* <LinksTitleTag>git basket</LinksTitleTag> */}
              <Link href={"/"}>
                <StyledLink>
                  Your one-stop shop for fresh groceries delivered at your
                  convenience.Experience quality and ease with Git Basket,
                  delivering the freshest produce to your doorstep.
                </StyledLink>
              </Link>
            </Grid>
            <Grid xs={12} md={2.5}>
              <LinksTitleTag>industries we serve</LinksTitleTag>
              <Link href={"/"}>
                <StyledLink>partner</StyledLink>
                <StyledLink>express</StyledLink>
                <StyledLink>seller</StyledLink>
                <StyledLink>spotlight</StyledLink>
                <StyledLink>warehouse</StyledLink>
                <StyledLink>deliver</StyledLink>
              </Link>
            </Grid>
            <Grid xs={12} md={2.5}>
              <LinksTitleTag>core service</LinksTitleTag>
              <Link href={"/"}>
                <StyledLink>privacy</StyledLink>
                <StyledLink>terms</StyledLink>
                <StyledLink>FAQs</StyledLink>
                <StyledLink>security</StyledLink>
                <StyledLink>mobile</StyledLink>
                <StyledLink>contact</StyledLink>
              </Link>
            </Grid>
            <Grid xs={12} md={1.5}>
              <LinksTitleTag>Company</LinksTitleTag>
              <Link href={"/"}>
                <StyledLink>About</StyledLink>
                <StyledLink>Careers</StyledLink>
                <StyledLink>Blog</StyledLink>
                <StyledLink>Press</StyledLink>
                <StyledLink>Lead</StyledLink>
                <StyledLink>Value</StyledLink>
              </Link>
            </Grid>
            <Grid xs={12} md={2}>
              <h3 className="subscripe">Subscripe</h3>
              <div className="subscripeInput">
                <input type="text" />
                <SendIcon className="subscripeIcon" />
              </div>
              <h3 className="followUs">follow us</h3>
              <p className="followIcons">
                <FacebookOutlinedIcon className="Icon" />
                <FacebookOutlinedIcon className="Icon" />
                <FacebookOutlinedIcon className="Icon" />
              </p>
            </Grid>
            <p>© QuickBasketHub</p>
          </Grid>
        </div>
      </FooterContainer>
      {/* <Rights> */}

      {/* <p>
          <FacebookOutlinedIcon className="Icon" />
          <FacebookOutlinedIcon className="Icon" />
          <FacebookOutlinedIcon className="Icon" />
          <FacebookOutlinedIcon className="Icon" />
          <FacebookOutlinedIcon className="Icon" />
        </p> */}
      {/* </Rights> */}
    </div>
  );
};

export default FooterComponent;
