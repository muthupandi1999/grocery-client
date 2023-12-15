import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import HomeIcon from "@mui/icons-material/Home";
import WalletIcon from "@mui/icons-material/Wallet";
import SettingsIcon from "@mui/icons-material/Settings";
import Orders from "./manages/orders";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
export const OrderListWrapper = styled.div`
  max-width: 1440px;
  margin: auto;
  background: #edf1f7;
  .userInfoContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 85%;
    margin: auto;
    padding: 25px 0;
    .userDetails h4 {
      font-size: 32px;
      font-weight: 600;
    }
    .userDetails h5 {
      padding-top: 5px;
      font-size: 16px;
      font-weight: 500;
    }
    div button {
      border: 1px solid hsl(0deg 0% 87.87%);
      padding: 12px 20px;
      text-transform: uppercase;
      display: inline-block;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      background: transparent;
      &:hover {
        background: linear-gradient(
          135deg,
          rgb(33, 167, 131) 0%,
          rgb(192, 223, 125) 100%
        );
        border: 1px solid transparent;
        color: #fff;
        transition-duration: 0.3s background;
      }
    }
  }
  .userInfo {
    background: #fff;
    padding: 30px;
    display: flex;
    .userSetting {
      height: 613px;
      background: #edf1f7;
      padding: 20px 0;
      width: 30%;
      ul li {
        padding: 15px 15px;
        margin-left: 20px;
        cursor: pointer;
        display: flex;
        position: relative;
        align-items: center;
        color: #282c3f;
        font-weight: 600;
        font-size: 16px;
      }
      ul li.active {
        background: #fff;
      }
      ul li .icons {
        color: #fff;
        background: #282c3f;
        font-size: 35px;
        padding: 8px;
        border-radius: 50%;
        margin-right: 20px;
      }
    }
    .UserSettingInfo {
      padding: 30px 0 0 30px;
    }
  }
`;
function sucessPayment() {
  const [activeItem, setActiveItem] = useState("My Orders");
  
  // State to track active item

  const handleItemClick = (itemName: any) => {
    setActiveItem(itemName); // Update active item on click
  };
  useEffect(() => {
    handleItemClick("myOrders");
  }, []);
  return (
    <OrderListWrapper>
      <div className="userInfoContainer">
        <div className="userDetails">
          <h4>Muthupandi M</h4>
          <h5>8489215350</h5>
        </div>
        <div>
          <button>Edit profile</button>
        </div>
      </div>
      <div className="userInfo">
        <div className="userSetting">
          <ul className="leftSideText">
            <li
              className={activeItem === "myOrders" ? "active" : ""}
              onClick={() => handleItemClick("myOrders")}
            >
              <ShoppingBagIcon className="icons" />
              My Orders
            </li>
            <li
              className={activeItem === "address" ? "active" : ""}
              onClick={() => handleItemClick("address")}
            >
              <HomeIcon className="icons" />
              Address
            </li>
            <li
              className={activeItem === "myWallet" ? "active" : ""}
              onClick={() => handleItemClick("myWallet")}
            >
              <WalletIcon className="icons" />
              My Wallet
            </li>
            <li
              className={activeItem === "settings" ? "active" : ""}
              onClick={() => handleItemClick("settings")}
            >
              <SettingsIcon className="icons" />
              Settings
            </li>
          </ul>
        </div>
        <div className="UserSettingInfo">
          <Orders />
        </div>
      </div>
    </OrderListWrapper>
  );
}

export default sucessPayment;
