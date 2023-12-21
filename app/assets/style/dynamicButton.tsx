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

interface ButtonI {
  minWidth?: string;
  minHeight?: string;
  color?: string;
  backgroundColor?: string;
  padding?: string;
  fontSize?: string;
  margin?: string;
}

export const Buttons = styled.button<ButtonI>`
  min-width: ${(props: any) => props.minWidth || "100px"};
  min-height: ${(props: any) => props.minHeight || "30px"};
  background-color: ${(props: any) =>
    props.active
      ? props.activeColor || "green"
      : props.backgroundColor || "#f3f9f5"};
  color: ${(props: any) =>
    props.active ? props.textColor || "#fff" : props.color || "green"};
  padding: ${(props: any) => props.padding || "0 0 0 0"};
  font-size: ${(props: any) => props.fontSize || "14px"};
  margin: ${(props: any) => props.margin || "0"};
  text-align: center;
  font-weight: 600;
  border: 0;
  border-radius: 5px;
  transition: background-color 0.3s ease;
`;

interface TextI {
  minWidth?:string;
  color?: string;
  padding?: string;
  fontSize?: string;
  margin?: string;
  textAlign?:string;
  fontWeight?:string;
  lineHeight?:string;
}


export const Text = styled.h3<TextI>`

  min-width: ${(props: any) => props.minWidth || "30%"};
  color: ${(props: any) => props.color || "#666666"};
  padding: ${(props: any) => props.padding || "0 0 0 0"};
  font-size: ${(props: any) => props.fontSize || "16px"};
  margin: ${(props: any) => props.margin || "0"};
  text-align: ${(props: any) => props.textAlign || "start"};
  font-weight: ${(props: any) => props.fontWeight || "400"};
  line-height:${(props:any) => props.lineHeight || "normal"}
`;
