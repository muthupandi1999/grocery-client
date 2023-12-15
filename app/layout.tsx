"use client";
import StyledComponentsRegistry from "./lib/registry";
import { ThemeProvider } from "styled-components";
import { ChildContainer, GlobalStyle } from "./assets/style";
import { light } from "./assets/style/themeColor";
import HeaderComponent from "./components/parts/headerComponent";
import GlobalContext from "./utils/states";
import FooterComponent from "./components/parts/FooterComponent";
import { usePathname } from "next/navigation";
import { ApolloWrapper } from "./apolloWrapper/wraper";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const pathhArr = path.split("/");

  return (
    <html>
      <head>
        <title>E-commerce</title>
        <meta
          name="description"
          content="Shop online for groceries and get your order delivered at your doorstep in minutes. Enjoy instant delivery with"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Montserrat:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&family=Public+Sans:wght@300;400;500;600;700&family=Quicksand:wght@300;400;500;600;700&family=Radio+Canada:wght@300;400;500;600;700&family=Rubik:wght@300;400;500;600;700;800&family=Zilla+Slab:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        /> */}
        {/* <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Poppins:wght@300;400;500;600;700&family=Public+Sans:wght@300;400;500;600;700&family=Quicksand:wght@300;400;500;600;700&family=Radio+Canada:wght@300;400;500;600;700&family=Rubik:wght@300;400;500;600;700;800&display=swap');
        </style> */}
      </head>
      <body cz-shortcut-listen="true">
        <StyledComponentsRegistry>
          <ThemeProvider theme={light}>
            <GlobalStyle />
            <GlobalContext>
              <ApolloWrapper>
                <Provider store={store}>
                  <HeaderComponent />
                  <ChildContainer paddingTop="0px">{children}</ChildContainer>
                  {pathhArr[pathhArr.length - 1] !== "category" && !pathhArr.includes("orders") &&
                    !pathhArr.includes("search") && <FooterComponent />}
                </Provider>
              </ApolloWrapper>
            </GlobalContext>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
