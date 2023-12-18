import React, { useEffect, useState } from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import HomeIcon from "@mui/icons-material/Home";
import WalletIcon from "@mui/icons-material/Wallet";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SettingSidebar() {
  const sideBarMenus = [
    {
      label: "My Orders",
      route: "/account/orders",
      icon: <ShoppingBagIcon className="icons" />,
    },
    {
      label: "Address",
      route: "/account/addresses",
      icon: <HomeIcon className="icons" />,
    },
    {
      label: "My Wallet",
      route: "/account/myWallet",
      icon: <WalletIcon className="icons" />,
    },
    {
      label: "Settings",
      route: "/account/settings",
      icon: <SettingsIcon className="icons" />,
    },
  ];

  const path = usePathname();
  // useEffect(() => {
  //   handleItemClick("myOrders");
  // }, []);
  return (
    <div className="userSetting">
      <ul className="leftSideText">
        {sideBarMenus.map((e: any, index: number) => (
          <Link href={e?.route} key={index}>
            <li className={path === e?.route ? "active" : ""}>
              {e?.icon}
              {e?.label}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default SettingSidebar;
