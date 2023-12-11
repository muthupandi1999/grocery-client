import React from "react";
import { Button } from "@/app/assets/style/dynamicButton";

function DynamicButton({
  name,
  color,
  backgroundColor,
}: Readonly<{ name: string; color?: string; backgroundColor?: string }>) {
  return (
    <Button style={{ backgroundColor: backgroundColor }} color={color}>
      {name}
    </Button>
  );
}

export default DynamicButton;
