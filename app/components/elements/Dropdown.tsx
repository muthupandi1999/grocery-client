import { DropDownListItem } from '@/app/assets/style';
import { SortOptions } from '@/app/utils/data';
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';

function Dropdown({children,setDropDownState,setSelectedOption}:any) {
  return (
    <div className="select-options">
    {SortOptions.map((data:any, i:any) =>
     (
    
        <DropDownListItem
          $colorState={data === ""}
          $id={ SortOptions.length-2 < i }
          onClick={() => {
            setSelectedOption(data);
            setDropDownState(false);
          }}
          key={i}
        >
       {children}

          {data}
        </DropDownListItem>
    
    ))}
  </div>
  )
}

export default Dropdown
