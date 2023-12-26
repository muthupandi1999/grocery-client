import { Box, Modal } from "@mui/material";
import React from "react";

function CustomModal({ children, open, onClose }) {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",

    transform: "translate(-50%, -50%)",

    bgcolor: "rgb(248, 248, 248)",
    borderRadius: "12px",
    boxShadow: 24,
  };
  return (
    <Modal 
    onClick ={(e)=>e.stopPropagation()}
      open={open}
      onClose={onClose}
      sx={{ backgroundColor: "rgba(0,0,0,0.3)" }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>{children}</Box>
    </Modal>
  );
}

export default CustomModal;
