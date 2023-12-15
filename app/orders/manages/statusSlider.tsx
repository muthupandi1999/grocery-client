// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';

// const orderStatuses = ['Confirmed', 'Processing', 'Out for Delivery', 'Delivered'];

// function OrderStatusSlider() {
//   const [statusIndex, setStatusIndex] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setStatusIndex(newValue);
//   };

//   return (
//     <Box sx={{ width: 300 }}>
//       <Slider
//         aria-label="Order Status"
//         value={statusIndex}
//         onChange={handleChange}
//         valueLabelDisplay="auto"
//         step={1}
//         marks
//         min={0}
//         max={orderStatuses.length - 1}
//         getAriaValueText={(value) => orderStatuses[value]}
//       />
//       <p>Status: {orderStatuses[statusIndex]}</p>
//     </Box>
//   );
// }

// export default OrderStatusSlider;

import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
// import "./OrderStatusSlider.css"; // Import your CSS file for styling
import { styled } from "styled-components";
import { useEffect } from "react";
const StatusLabel = styled.div`
  display: flex;
  position: absolute;
  top: 30px;
  width: 100%;
  justify-content: space-between;
  .status-label {
    position: absolute;
    font-size: 10px;
    font-weight: 500;
    color: #333;
    transform: translateX(-18%);
    white-space: nowrap;
    &.css-n3zc3s-muislider-root.mui-disabled: {
      color: "green";
    }
  }

  .status-label.active {
    font-weight: bold;
    color: #000;
  }
`;

const orderStatuses = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "OUTFORDELIVERY",
  "DELIVERED",
];

function OrderStatusSlider({ status }: any) {
  const [statusIndex, setStatusIndex] = React.useState(0);

  useEffect(() => {
    // Update statusIndex when the status prop changes
    const index = orderStatuses.indexOf(status);
    if (index !== -1) {
      setStatusIndex(index);
    }
  }, [status]);

  const handleChange = (event: any, newValue: any) => {
    setStatusIndex(newValue);
  };

  const getStatusFromIndex = (index: any) => {
    return orderStatuses[index];
  };

  return (
    <Box sx={{ width: 300, position: "relative" }}>
      <StatusLabel>
        {orderStatuses.map((status, index) => (
          <div
            key={index}
            className={`status-label ${statusIndex === index ? "active" : ""}`}
            style={{
              left: `calc(${
                (index / (orderStatuses.length - 1)) * 100
              }% - 12px)`,
            }}
          >
            {status}
          </div>
        ))}
      </StatusLabel>
      <Slider
        aria-label="Order Status"
        value={statusIndex}
        onChange={handleChange}
        className="sliderStatus"
        disabled // Disable user interaction
        valueLabelDisplay="off" // Hide tooltip
        step={1}
        marks
        min={0}
        max={orderStatuses.length - 1}
        getAriaValueText={(value) => orderStatuses[value]}
        valueLabelFormat={(value) => getStatusFromIndex(value)}
        // sx={{
        //   "&.css-nnid7-MuiSlider-valueLabel": {
        //     display: "none",
        //   },
        //   "& .css-nnid7-MuiSlider-valueLabel": {
        //     fontSize: "12px",
        //   },
        //   color: "#21a783",
        //   "& .css-nnid7-MuiSlider-thumb": {
        //     // Adjust thumb color if needed
        //     backgroundColor: "#21a783",
        //   },
        // }}
        sx={{
          "&.Mui-disabled .MuiSlider-track": {
            color: "green",
          },
          "&.Mui-disabled .MuiSlider-thumb": {
            color: "green",
          },
         
        }}
      />
    </Box>
  );
}

export default OrderStatusSlider;
