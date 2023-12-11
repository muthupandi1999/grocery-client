import styled from "styled-components";

export const Button = styled.button`
  width: ${(props: any) => props.width || "100px"};
  height: ${(props: any) => props.height || "30px"};
  color: ${(props: any) => props.color || "green"};
  background-color: ${(props: any) => props.backgroundColor || "#fff"};
  font-size: ${(props: any) => props.fontSize || "14px"};
  text-align: center;
  border: 0;
  border-radius: 5px;
`;