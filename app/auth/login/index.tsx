import CustomModal from "@/app/components/elements/Modal";
import React, { SetStateAction, useEffect, useState } from "react";
import LoginLogo from "../../assets/icons/loginlogo.png";
import Image from "next/image";
import {
  CustomH3,
  CustomInput,
  CustomPTag,
  CustomSpan,
  DisableText,
  InputWrapper,
  LoginButton,
  LoginWrapper,
  LogoImageContainer,
  OTPPageHeader,
  SCLINK,
  TitleTag,
} from "@/app/assets/style";
import { IoIosArrowRoundBack } from "react-icons/io";
import OtpInput from "react-otp-input";
import { useMutation } from "@apollo/client";
import { getLoginOtp, submitLoginDetails } from "@/app/service/mutation";
import { LoginError, LoginSuccess, OTPToast } from "@/app/toast";
import { error } from "console";
interface IProps {
  open: SetStateAction<boolean>;
  onClose: () => boolean;
}
function Index({ open, onClose }: IProps) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpPage, setOtpPage] = useState(false);
  const [getOtp] = useMutation(getLoginOtp);
  const [getLoginCredentials] = useMutation(submitLoginDetails);

  const [maxTime, setMaxTime] = useState(30);
  useEffect(() => {
    if (!open) {
      setMobileNumber("");
      setOtpPage(false);
    }
  }, [open]);
  async function GET_LOGIN_OTP() {
    const { data } = await getOtp({
      variables: {
        phoneNo: mobileNumber,
      },
    });

    if (data) {
      console.log("getNumber", data);

      setMaxTime(30);
      OTPToast(data?.loginViaPhone?.otp);
    }
  }
  async function LOGIN_WITH_OTP() {
    try {
      const { data } = await getLoginCredentials({
        variables: {
          phoneNo: mobileNumber,
          otp: otp,
        },
      });

      LoginSuccess();
      onClose();
      console.log("token", data);

      localStorage.setItem(
        "token",
        data?.loginPhoneNoOtpValidation?.accessToken
      );
      localStorage.setItem(
        "userNumber",
        data?.loginPhoneNoOtpValidation?.data?.phoneNo
      );
    } catch (error) {
      LoginError();
    }
  }
  useEffect(() => {
    if (otp?.length === 6) {
      LOGIN_WITH_OTP();
    }
  }, [otp?.length]);
  useEffect(() => {
    if (open) {
      setMaxTime(30);
      setOtp("");
    }
  }, [otpPage]);
  useEffect(() => {}, [maxTime]);

  React.useEffect(() => {
    otpPage && maxTime > 0 && setTimeout(() => setMaxTime(maxTime - 1), 1000);
  }, [maxTime, otpPage]);

  return (
    <CustomModal open={open} onClose={onClose}>
      <LoginWrapper>
        <IoIosArrowRoundBack
          className="back-icon"
          onClick={() => {
            if (otpPage) {
              setOtpPage(false);
            } else {
              onClose();
            }
          }}
          size={30}
        />
        {otpPage ? (
          <>
            <OTPPageHeader>OTP Verification</OTPPageHeader>
            <div className="number_Details">
              <span>We have sent a verification code to</span>
              <TitleTag $variant="number">
                +91 {localStorage.getItem("userNumber")}
              </TitleTag>
            </div>
            <OtpInput
              inputType="number"
              inputStyle={"otp-box"}
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
            />
            {maxTime === 0 ? (
              <SCLINK href={""} onClick={GET_LOGIN_OTP} $variant="resendGR">
                Resend code
              </SCLINK>
            ) : (
              <DisableText>Resend code (in {maxTime} seconds)</DisableText>
            )}
          </>
        ) : (
          <>
            <LogoImageContainer>
              <Image
                style={{ width: "100%", height: "100%" }}
                src={LoginLogo}
                alt=""
              />
            </LogoImageContainer>
            <div style={{ textAlign: "center" }}>
              <CustomH3>India's last minute app</CustomH3>
              <CustomPTag> Log in or Sign up</CustomPTag>
            </div>
            <form
              onSubmit={() => {
                setOtpPage(true);
                localStorage.setItem("userNumber", mobileNumber);
                GET_LOGIN_OTP();
              }}
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                rowGap: "20px",
                alignItems: "center",
              }}
            >
              <InputWrapper>
                <CustomPTag>+ 91</CustomPTag>
                <CustomInput
                  placeholder="Enter your number "
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => {
                    const result = e.target.value.replace(/\D/g, "");
                    setMobileNumber(result);
                  }}
                  maxLength={10}
                />
              </InputWrapper>

              <LoginButton
                type="submit"
                disabled={mobileNumber?.toString()?.length !== 10}
              >
                Continue
              </LoginButton>

              <CustomSpan>
                By continuing, you agree to our{" "}
                <SCLINK $variant="" href={""}>
                  Terms of service{" "}
                </SCLINK>{" "}
                &{" "}
                <SCLINK $variant="" href={""}>
                  {" "}
                  Privacy policy{" "}
                </SCLINK>
              </CustomSpan>
            </form>
          </>
        )}
      </LoginWrapper>
    </CustomModal>
  );
}

export default Index;
