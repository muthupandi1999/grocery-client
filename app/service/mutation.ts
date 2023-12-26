import { gql } from "@apollo/client";

export const getLoginOtp = gql`
  mutation LoginViaPhone($phoneNo: String!) {
    loginViaPhone(phoneNo: $phoneNo) {
      message
      otp
    }
  }
`;
export const submitLoginDetails = gql`
  mutation LoginPhoneNoOtpValidation($phoneNo: String!, $otp: String!) {
    loginPhoneNoOtpValidation(phoneNo: $phoneNo, otp: $otp) {
      message
      accessToken
      refreshToken
      data {
        phoneNo
      }
    }
  }
`;
export const getClientSecret =gql`
mutation CardPayment($input: cardPaymentInput) {
  cardPayment(input: $input) {
    clientSecret
  }
}
`
export const addToCart = gql`
  mutation addToCartProduct($input: addToCartInput!) {
    addToCartProduct(input: $input) {
      id
      product {
        id
        name
        image {
          id
          image
        }
        ProductType {
          id
          name
          image
          isActive
          productCategory {
            id
            name
            image
            isActive
            productTypes {
              id
              name
              image
              isActive
              productCategoryId
            }
          }
          productCategoryId
          products {
            id
            name
            productCode
            shortDescription
            tag
            rating
            dicountType
            dicountPercentage
            ratingCount
            isActive
            productTypeId
          }
        }
        productTypeId
      }
      productId
      quantity
      totalPrice
      user {
        id
        firstName
      }
      userId
      deviceToken
      isOrder
      selectedVariantId
      selectedVariant {
        id
        size
        unit
        values
        price
      }
    }
  }
`;

export const updateCart = gql`
  mutation Mutation($input: updateAddToCartInput) {
    updateAddToCart(input: $input) {
      id
      product {
        id
        name
        productCode
        shortDescription
        description {
          key
          value
        }
        variant {
          id
          size
          unit
          values
          price
          stock
        }
        tag
        image {
          id
          image
        }
        rating
        dicountType
        dicountPercentage
        ratingCount
        isActive
        ProductType {
          id
          name
          image
          isActive
          productCategory {
            id
            name
            image
            isActive
            productTypes {
              id
              name
              image
              isActive
              productCategoryId
            }
          }
          productCategoryId
          products {
            id
            name
            productCode
            shortDescription
            tag
            rating
            dicountType
            dicountPercentage
            ratingCount
            isActive
            productTypeId
          }
        }
        productTypeId
      }
      productId
      quantity
      totalPrice
      user {
        id
        email
        phoneNo
        firstName
        lastName
        role
        profileImage
        isActive
        Address {
          id
          address
          apartment
          label
          userId
          pincode
        }
      }
      userId
      deviceToken
      isOrder
      selectedVariantId
      selectedVariant {
        id
        size
        unit
        values
        price
        stock
        ProductInventory {
          id
          productId
          branchId
          variantId
          availableStock
          minimumAvailableStock
        }
        AddToCart {
          id
          product {
            id
          }
          selectedVariant {
            id
          }
          quantity
          user {
            id
          }
        }
      }
    }
  }
`;
export const placeOrder =gql`
mutation PlaceOrder($input: placeOrderInput!) {
  placeOrder(input: $input) {
    status
    paymentType
    message
  }
}
`