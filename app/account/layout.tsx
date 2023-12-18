"use client";

import OrderHeader from "./orderHeader";
import { OrderListWrapper } from "./page";
import SettingSidebar from "./settingSidebar";


export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OrderListWrapper>
      <OrderHeader />
      <div className="userInfo">
        <SettingSidebar />
        <div style={{padding:"15px 30px", width:"100%"}}>
        {children}
        </div>
        
      </div>
    </OrderListWrapper>

    // // <body>
    //   {/* <OrderListWrapper>
    //     <OrderHeader/>
    //     <div className="userInfo">
    //         <SettingSidebar/>
    //     </div>
    // </OrderListWrapper> */}

    // {/* </body> */}
  );
}
