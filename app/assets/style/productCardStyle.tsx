import { styled } from "styled-components";

interface PRODUCTCARDI {
  width?: string;
  stock?: string;
}

export const ModelBoxstyle = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  border: none;
  border-radius: 10px;
  padding: 16px;
  background-color: #f4f6fb;
  outline: none;
  &:focus {
    outline: none;
  }
  @media only screen and (max-width: 560px) {
    width: 300px;
  }
`;

export const CardContainer = styled.section<PRODUCTCARDI>`
  width: ${(props: any) => props.width ?? "96%"};
  cursor: pointer;
  background: rgb(255, 255, 255);
  border: 0.5px solid rgb(232, 232, 232);
  box-shadow: rgba(0, 0, 0, 0.04) 2px 2px 8px;
  border-radius: 8px;
  padding-bottom: 0.75rem;
  position: relative;
  @media (max-width: 768px) {
    margin: auto;
  }
  .cardDetails {
    padding: 0 12px;
    .productUnit {
      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 7px;
      margin-bottom: 14px;
      border-radius: 4px;
      font-weight: 500;
      padding-left:0px;
    }

    .productUnitVariant {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #eee;
      padding: 7px;
      margin-bottom: 14px;
      border-radius: 4px;
      font-weight: 500;
    }
    .unit {
      font-size: 12px;
    }

    .unitIcon {
      color: #785e5e;
      font-size: 20px;
      opacity: 0.7;
    }
    .productUnit {
      display: flex;
      align-items: center;
      height: 26px;
      color: #666666;
      font-size: 12px;
      margin-bottom: 24px;
    }

    .cardFooter {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .priceBox {
        display: flex;
        flex-direction: column;
        .discountPrice {
          color: rgb(31, 31, 31);
          font-weight: 600;
          font-size: 12px;
        }
      }
      .productPrice {
        color: rgb(31, 31, 31);
        font-weight: 600;
        font-size: 12px;
      }
      .cumulativePrice {
        color: rgb(31, 31, 31);
        font-weight: 600;
        font-size: 12px;
        color: #666;
        text-decoration: line-through;
      }
    }
  }
  .StockOutBtn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #000;
    color: #fff;
    width: 80px;
    height: 20px;
    font-size: 10px;
    border: none;
    border-radius: 10px;
  }
`;
export const FlexImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: scale-down;
`;

export const UnitDiv = styled.section`
  display: flex;
  align-items: center;
  height: 26px;
  color: #666666;
  font-size: 12px;
  margin-bottom: 24px;
`;
