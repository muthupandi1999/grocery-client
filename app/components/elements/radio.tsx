import { SCLINK } from '@/app/assets/style'
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { MdOutlineRadioButtonUnchecked } from 'react-icons/md'

function CustomRadio({value,size}) {
  return ( 
    <SCLINK $variant='' href={""} style={{display:"flex",alignItems:"center"}}   >
    {value? (
      <FaCheckCircle size={size} style={{ color: "green" }} />
    ) : (
      <MdOutlineRadioButtonUnchecked
      size={size}
        style={{ color: "gray" }}
      />
    )}
  </SCLINK>
  )
}

export default CustomRadio
