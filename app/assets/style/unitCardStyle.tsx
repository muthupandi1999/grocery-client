import { styled } from "styled-components";

export const UnitWrapper = styled.section`
  .closeIcon {
    cursor: pointer;
    color: rgb(255, 255, 255);
    font-size: 20px;
    opacity: 0.6;
    background-color: rgb(74, 82, 104);
    border-radius: 50%;
    margin-bottom: 20px;
  }
  .unitImageBox {
    width: 70px;
    height: 70px;
  }
  .image {
    width: 100%;
    height: 100%;
  }
  .outOfStockText {
    color: red;
    font-size: 12px;
  }
  .flexBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .UnitCardBox {
    background: #fff;
    position: relative;
    margin: 10px 0;
    padding: 0 10px;
    border-radius: 8px;
  }
`;