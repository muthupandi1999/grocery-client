import { Skeleton } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { CategoryListWrapper } from '../assets/style'

function CategoryListWrapperLoader({loaderState}: {loaderState:Boolean}) {
  return (
    Array(15).fill(0)?.map((_,i) => (
        
          <CategoryListWrapper key={i}  $Loader={loaderState}>
            <div className="img-container">
              <Skeleton sx={{backgroundColor:"rgb(204,204,204)" }}
                variant="rounded"
                width={100}
                height={120}
                animation="wave"
              />
            </div>
            <Skeleton sx={{backgroundColor:"rgb(227,227,227)" }}
              variant="text"
              width={90}
              height={30}
              animation="wave"
            />
          </CategoryListWrapper>
       
      ))
  )
}

export default CategoryListWrapperLoader
