import React from 'react'

function Noproducts() {
  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height:"70vh"
    }}
  >
    <div style={{ width: "250px", height: "250px", objectFit: "fill" }}>
      <img style={{width:"100%",height:"100%"}} src="https://blinkit.com/57070263a359a92dc0fe.png" />
    </div>
    <div style={{padding:'40px 16px 16px',fontSize:44,fontWeight:600}}>Nothing Here Yet</div>
  </div>
  )
}

export default Noproducts
