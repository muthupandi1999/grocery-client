"use client";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getUserAddress } from "@/app/service/query";
import { useQuery } from "@apollo/client";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
export const AddressesWrappers = styled.div`
  h3.title {
    font-size: 24px;
    font-weight: 600;
    padding-bottom: 20px;
  }
  .containerCard {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(var(--auto-grid-min-size), 1fr)
    );
    --auto-grid-min-size: 15rem;
    grid-gap: 1rem;
    
}
   
  }
  .addressCard {
    border: 1px solid #d4d5d9;
    padding: 20px;
    position: relative;
    color: #3d4152;
    display:flex;
    align-items:flex-start;
    .addressInfo {
        padding-left:20px;
        h4{
            padding-bottom:4px;
        }
        p{
            padding-bottom:4px;
            font-size:13px;
        }
        .operateBtn {
            padding-top:10px;
            button{
                border:0;
                background:none;
                color:green;
                text-transform:uppercase;
                margin-right:7%;
                font-weight:600;
                font-size:14px;
                &:hover {
                    color:blue;
                }
            }
        }
       
    }
   
  }
`;

function Addresses() {
  const [userAddress, setUserAddresses] = useState<any>({});

  const { loading: addressLoading, refetch: addressRefetch } = useQuery(
    getUserAddress,
    {
      variables: {
        userId: "655379d96144626a275e8a14",
      },
      onCompleted: (data: any) => {
        setUserAddresses(data?.getUserById);
      },
    }
  );
  useEffect(() => {
    addressRefetch()
  }, []);

  return (
    <AddressesWrappers>
      <h3 className="title">My Addresses</h3>

      <div className="containerCard">
        {userAddress && !addressLoading ? (
          userAddress?.Address?.map((e: any) => (
            <div className="addressCard" key={e?.id}>
              {e?.label === "Home" && <HomeOutlinedIcon />}
              {e?.label === "Work" && <WorkOutlineOutlinedIcon />}
              {e?.label === "Other" && <PlaceOutlinedIcon />}

              <div className="addressInfo">
                <h4>{e?.label}</h4>
                <p>{e?.address}</p>
                <p>{e?.pincode}</p>
                <div className="operateBtn">
                  <button className="editBtn">Edit</button>
                  <button className="deleteBtn">Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading</p>
        )}
      </div>
    </AddressesWrappers>
  );
}

export default Addresses;
