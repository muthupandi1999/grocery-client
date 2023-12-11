import styled from "styled-components";
export const AddressBox = styled.section`
  .userHeaderInfo {
    padding-bottom: 16px;
    h4 {
      color: #666;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 4px;
    }
    h6 {
      color: #666;
      font-size: 12px;
    }
  }
  .UserInfo li {
    color: #666;
    font-size: 12px;
    padding:8px 0;
    cursor:pointer
  }

  #userWallet {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .QrInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:16px 0 0 0;

    .QrInfoImage {
      width: 100px;
      height: 100px;
      object-fit: cover;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .QrInfoDetails {
    width:50%;

  }
`;