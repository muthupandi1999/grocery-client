import React, { useState, useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { LoginViaPhone, OtpValidationForPhone } from "@/app/service/query";
import { LoginModelContainer, VerifyBox } from "@/app/assets/style";
import { useMutation } from "@apollo/client";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import OtpInput from "react-otp-input";
import toast from "react-hot-toast";

function LoginCard({ onClose }: Readonly<{ onClose: any }>) {
  const [otpVerificationPage, setOtpVerificationPage] = useState(false);
  const [loginSuc, setLoginSuc] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isColorChange, setIsColorChange] = useState(false);
  const [otp, setOtp] = useState("");

  // const formatNumber = (value: any) => {
  //   return value.replace(/[^\d]/g, "");
  // };
  const PhoneNoInput = (e: any) => {
    // var reg = new RegExp('^[0-9]$');
    setPhoneNumber(e.target.value);
    let mobileNo = e.target.value;
    console.log("leng", mobileNo);
    if (mobileNo.length === 10) {
      setIsColorChange(true);
    } else {
      setIsColorChange(false);
    }
  };

  const [LoginPhone] = useMutation(LoginViaPhone, {
    variables: { phoneNo: phoneNumber },
  });
  const [OtpVerifyPhone] = useMutation(OtpValidationForPhone);

  useEffect(() => {
    if (otp.length === 6) {
      OtpVerifyPhone({
        variables: { phoneNo: phoneNumber, otp: otp },
      }).then((res: any) => {
        let { data, accessToken, refreshToken } = res.data.loginPhoneNoOtpValidation;
        let Credentials: any = {
          userId: data?.id,
          phoneNo: data?.phoneNo,
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
        localStorage.setItem("Credentials", JSON.stringify(Credentials));
        setLoginSuc(true);
        setTimeout(() => {
          onClose();
        }, 2000);
        
      }).catch((err:any) => {
        console.log(err)
      })
    }
  }, [otp]);

  return (
    <LoginModelContainer>
      {!otpVerificationPage && !loginSuc && (
        <>
          <div className="imageBox">
            <img
              src="https://res.cloudinary.com/dmmsjhioj/image/upload/v1701078189/Grocery/shopping-basket-icon_1025-352_jyfiod.png"
              alt=""
            />
          </div>
          <h3>India s last minute app</h3>
          <h4>
            <a href="#">Log in</a> or <a href="#">Sign up</a>
          </h4>
          <div className="PhoneNoBox">
            <input
              className="PhoneNoInput"
              placeholder="Enter mobile number"
              type="number"
              maxLength={10}
              value={phoneNumber.slice(0,10)}
              onChange={PhoneNoInput}
            />
            <span className="phoneNoPrefix">+91</span>
          </div>

          <button
            onClick={() => {
              if (phoneNumber.length === 10) {
                // Add validation for phone number length
                LoginPhone()
                  .then((res: any) => {
                    console.log("Login response", res);
                    alert(res?.data?.loginViaPhone?.otp);
                    setOtpVerificationPage(true);
                    setIsColorChange(false);
                  })
                  // .catch((error: any) => {
                  //   console.error("Login error", error);
                  // });
              }
            }}
            className={
              isColorChange ? "loginButton phoneNoColorChange" : "loginButton"
            }
          >
            Continue
          </button>
          <p className="policy">
            By continuing, you agree to our Terms of service & Privacy policy
          </p>
          <KeyboardBackspaceIcon onClick={onClose} className="backicon" />
        </>
      )}
      {otpVerificationPage && !loginSuc && (
        <VerifyBox>
          <div className="title">Otp Verification</div>
          <div className="verifyDetails">
            <p>We have a send a verification code to</p>
            <h3>+91 {phoneNumber}</h3>
            <div className="otpBox">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span></span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>
            <a className="resentText" href="#">
              Resend Code
            </a>
          </div>
          <KeyboardBackspaceIcon
            onClick={() => setOtpVerificationPage(false)}
            className="backiconVerify"
          />
        </VerifyBox>
      )}
      {loginSuc && (
        <div className="successpage">
          <CheckCircleIcon className="successIcon" />
          <h3>Successfully logged in!</h3>
        </div>
      )}
    </LoginModelContainer>
  );
}

export default LoginCard;
