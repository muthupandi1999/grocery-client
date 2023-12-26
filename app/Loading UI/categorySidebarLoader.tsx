import { Divider, Skeleton } from '@mui/material'
import { Router } from 'next/router'
import React from 'react'
import { CategorySidebarContainer, SideBarListContainer } from '../assets/style'
import { AllCategory } from '../assets/style/interface'

function CategorySidebarLoader() {
  return (
    <>
    {Array(10).fill(0).map((_,i) => (
      <React.Fragment key={i}>
        <a
          
        >
          <SideBarListContainer
            $routeId={false}
          >
            <div className="img-container">
             <Skeleton variant='rounded' height={50} animation="wave"  sx={{backgroundColor:"#E5E4E2" }}/>
            </div>
            <div className="subtitle">
            <Skeleton variant='rounded' width={120} animation="wave" sx={{backgroundColor:"#E5E4E2" }} />
            </div>
          </SideBarListContainer>
        </a>
        <Divider light />
      </React.Fragment>
    ))}
  </>
  )
}

export default CategorySidebarLoader
