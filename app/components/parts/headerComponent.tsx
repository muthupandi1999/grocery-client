"use client";

import {
  AccountHeader,
  AccountMenuWrapper,
  AccountPopupWrapper,
  Button,
  CustomLinkTag,
  CustomSpan,
  HeaderContainer,
  HeaderRightSec,
  HeaderRow,
  ImgTag,
  LocationSec,
  LocationWrapper,
  LogoSec,
  NavListItem,
  SCLINK,
  SearchBox,
  SearchSec,
  TitleTag,
} from "../../assets/style";
//Images
import logo from "../../assets/img/logo.png";
import { ExpandMore, Login, Search, ShoppingCart } from "@mui/icons-material";
import {
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Backdrop, Drawer, Modal } from "@mui/material";
import CartDrawer from "../cart";
import { IoMdContact } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { globalContext } from "@/app/utils/states";
import { gql, useQuery } from "@apollo/client";
import { MyContext } from "../../myContext";
import { setAuthStatus, setCartItems } from "@/app/myContext/action";
import LoginPage from "../../auth/login";
import { IoMdArrowDropdown } from "react-icons/io";
import CustomPopper from "../elements/Popper";
import { CartTotalItems, SetCartArrFunc } from "@/app/helperFunctions";
import { USER_ID } from "@/app/utils/variables";
import { fetchCartItems } from "@/app/service/api/data";
import { getCartCount } from "@/app/service/query";

const HeaderComponent = ({ accountAnchor, openfunc, closeFunc }) => {
  const [open, setOpen] = useState(false);
  const [startSearch, setStartSearch] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const router = useRouter();
  const { defaultRoutes, search, setSearch } = useContext(globalContext);
  const { dispatch, cartItems, authStatus } = useContext(MyContext);
  const [showLogin, setShowLogin] = useState<boolean>(false);

  const { cartProducts, cartLoader, cartRefetch } = fetchCartItems({
    userId: USER_ID,
    index: null,
    limit: null,
  });

  useEffect(() => {
    if (startSearch) {
      router.push(`/search/${search}`);
    }
  }, [search]);
  const path = usePathname();
  const pathArr = path.split("/");
  useEffect(() => {
    if (defaultRoutes?.length === 0) {
      setSearch("");
    }
  }, [defaultRoutes]);
  const authToken = localStorage.getItem("token");
  useEffect(() => {
    if (authToken) {
      setAuthStatus(dispatch, true);
    } else {
      setAuthStatus(dispatch, false);
    }
  }, [authToken]);

  useEffect(() => {
    console.log("homeCart", cartProducts);

    if (cartProducts?.getAddToCartsByUserId?.carts?.length > 0) {
      SetCartArrFunc(cartProducts, dispatch);
    }
  }, [cartProducts]);
  const userNumber = localStorage.getItem("userNumber");
  return (
    <HeaderContainer>
      <HeaderRow>
        <LogoSec>
          <SCLINK $variant="" href={"/"}>
            <ImgTag $imgfit="contain" src={logo} alt="logo" />
          </SCLINK>
        </LogoSec>
        {!pathArr?.includes("search") && (
          <LocationWrapper>
            <LocationSec>
              <h4 className="title">Delivery in 17 minutes</h4>
              <div className="contentSec">
                <p className="content">
                  36P6+65H, 1st Main St, Y Block, Anna Nagar, Chennai, Tamil
                  Nadu 600040, India
                </p>
                <ExpandMore />
              </div>
            </LocationSec>
            <div className="login">
              <IoMdContact size={32} color={"black"} />
            </div>
          </LocationWrapper>
        )}

        <SearchSec>
          <SearchBox>
            <input
              onFocus={() => setStartSearch(true)}
              onBlur={() => setStartSearch(false)}
              onClick={() => {
                if (!search) router.push("/search");
              }}
              type="text"
              placeholder="Search for atta dal and more"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <Search className="searchIcon" />
          </SearchBox>
        </SearchSec>

        <HeaderRightSec>
          {!pathArr.includes("search") && (
            <>
              {!authStatus ? (
                <button
                  onClick={() => setShowLogin(true)}
                  className="buttonLink"
                >
                  <Login />
                  Login
                </button>
              ) : (
                <button className="buttonLink" onClick={openfunc}>
                  Account
                  <IoMdArrowDropdown />
                </button>
              )}

              <CustomPopper
                anchorEL={accountAnchor}
                closeFunc={closeFunc}
                variant="accountPopper"
              >
                <AccountPopupWrapper>
                  <AccountHeader>
                    <TitleTag $variant="">My Account</TitleTag>
                    <CustomSpan>{userNumber}</CustomSpan>
                  </AccountHeader>
                  <div>
                    <AccountMenuWrapper>
                      <SCLINK $variant="link" href={"/account/orders"} onClick={() => closeFunc()}>
                        My Orders
                      </SCLINK>
                      <SCLINK $variant="link" href={"/account/addresses"}  onClick={() => closeFunc()}>
                        Saved Address
                      </SCLINK>

                      <SCLINK $variant="link" href={"/account/myWallet"}  onClick={() => closeFunc()}>
                        My Wallet
                      </SCLINK>
                      <SCLINK $variant="link" href={""}  onClick={() => closeFunc()}>
                        FAQ's
                      </SCLINK>

                      <SCLINK
                        onClick={() => {
                          localStorage.removeItem("token");
                          closeFunc();
                          if (pathArr.includes("checkout")) {
                            router.push("/");
                          }
                        }}
                        $variant="link"
                        href={""}
                      >
                        Log Out
                      </SCLINK>
                    </AccountMenuWrapper>
                  </div>
                </AccountPopupWrapper>
              </CustomPopper>

              <LoginPage open={showLogin} onClose={() => setShowLogin(false)} />
            </>
          )}
          {!pathArr.includes("checkout") && (
            <Button $icon="left" onClick={handleOpen}>
              <ShoppingCart className="cart-icon" />
              <span>{CartTotalItems(cartItems)} item My Cart</span>
            </Button>
          )}

          <Drawer
            sx={{
              background: "1f1f1f",
              "& .css-1160xiw-MuiPaper-root-MuiDrawer-paper": {
                backgroundColor: "#f5f7fc",
              },
            }}
            anchor="right"
            open={open}
            onClose={handleClose}
          >
            <CartDrawer
              open={open}
              anchor="right"
              onClose={handleClose}
              openLogin={() => setShowLogin(true)}
              cartLoader={cartLoader}
            />
          </Drawer>
        </HeaderRightSec>
      </HeaderRow>
    </HeaderContainer>
  );
};

export default HeaderComponent;
