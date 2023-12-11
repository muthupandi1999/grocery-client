import { AddressBox } from "@/app/assets/style/addressModelStyles";
import React from "react";

function AddressModel({onClose}:Readonly<{onClose:any}>) {
  let userDta: any = localStorage?.getItem("Credentials");
  let data: any = JSON.parse(userDta);

  const Logout = () => {
    localStorage.clear();
    onClose();
  }

  return (
    <AddressBox>
      <div className="userHeaderInfo">
        <h4>My Account</h4>
        <h6>{data?.phoneNo}</h6>
      </div>
      <div>
        <ul className="UserInfo">
          <li className="UserInfoList">My Orders</li>
          <li className="UserInfoList">Saved Address</li>
          <li className="UserInfoList">
            <div id="userWallet">
              <p>My Wallet</p>
              <p>$0</p>
            </div>
          </li>
          <li className="UserInfoList">FAQ s</li>
          <li onClick={() => Logout()} className="UserInfoList">Log Out</li>
        </ul>
      </div>
      <div className="QrInfo">
        <div className="QrInfoImage">
          <img
            src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"
            alt=""
          />
        </div>
        <div className="QrInfoDetails">
          <p>Simple way to get groceries in minutes</p>
          <h6>Scan the QR code and download blinkit app</h6>
        </div>
      </div>
    </AddressBox>
  );
}

export default AddressModel;
