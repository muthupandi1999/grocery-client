import { gql } from "@apollo/client";

export const getAllBanners = gql`
  query GetAllBanner {
    getAllBanner {
      id
      title
      description
      image
      ProductType {
        id
        defaultRoute
      }
    }
  }
`;

export const getAllCategoriesWithProductTypes = gql`
  query GetAllCategories {
    getAllCategories {
      id
      name
      image
      isActive
      defaultRoute
      productTypes {
        id
        name
        defaultRoute
      }
    }
  }
`;
//for slider
export const getProductsByCategoryId = gql`
  query GetCategoryWithProductTypes(
    $getCategoryWithProductTypesId: ID!
    $sliceCount: Int
  ) {
    getCategoryWithProductTypes(
      id: $getCategoryWithProductTypesId
      sliceCount: $sliceCount
    ) {
      id
      name
      image
      isActive
      products {
        id
        name
        productCode
        variant {
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
        tag
        image {
          id
          image
        }
        dicountType
        dicountPercentage
        isActive
      }
    }
  }
`;
export const getProductTypesByCategoryId = gql`
  query getCategory($getCategoryId: ID!) {
    getCategory(id: $getCategoryId) {
      id
      name
      image
      isActive
      productTypes {
        id
        name
        image
        isActive
      }
    }
  }
`;
export const getProductsByProductTypeId = gql`
  query getProductTypeId($getProductTypeId: ID!, $filter: SortProducts) {
    getProductTypeId(id: $getProductTypeId, filter: $filter) {
      id
      name
      image
      isActive
      products {
        id
        name
        productCode
        variant {
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
        tag
        image {
          id
          image
        }
        dicountType
        dicountPercentage
      }
    }
  }
`;
export const getAllCategoryProducts = gql`
  query GetAllCategoryWithProductTypes {
    getAllCategoryWithProductTypes {
      id
      name
      image
      isActive
      products {
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
          ProductInventory {
            id
            productId
            branchId
            variantId
            availableStock
            minimumAvailableStock
          }
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
    }
  }
`;
export const filterProducts = gql`
  query GetAllProducts($filter: String) {
    getAllProducts(filter: $filter) {
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
  }
`;
export const getProduct = gql`
  query GetProduct($getProductId: ID!) {
    getProduct(id: $getProductId) {
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
          }
        }
        product {
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
      tag
      image {
        id
        image
        imageList
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
        defaultRoute
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
            defaultRoute
            productCategoryId
          }
          defaultRoute
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
  }
`;
export const getCartProducts = gql`
  query GetAddToCartsByUserId($userId: ID!, $limit: Int, $index: Int) {
    getAddToCartsByUserId(userId: $userId, limit: $limit, index: $index) {
      carts {
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
            imageList
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
            defaultRoute
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
                defaultRoute
                productCategoryId
              }
              defaultRoute
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
            productId
            quantity
            totalPrice
            userId
            deviceToken
            isOrder
            selectedVariantId
          }
        }
      }
      subTotal
      count
    }
  }
`;
export const getCartCount = gql`
  query GetAddToCartsByUserId($userId: ID!) {
    getAddToCartsByUserId(userId: $userId) {
      count
    }
  }
`;
export const getAddressByUserId = gql`
  query GetUserById($userId: ID!) {
    getUserById(userId: $userId) {
      id
      firstName
      lastName
      Address {
        id
        address
        apartment
        label
        userId
        pincode
      }
    }
  }
`;

export const getOrder = gql`
  query GetOrder($orderId: String!) {
    getOrder(orderId: $orderId) {
      id
      orderId
      orderTime
      orderType
      orderStatus
      address {
        id
        address
        apartment
        label
        userId
        pincode
      }
      deliveryAddressId
      addToCart {
        id
        product {
          id
          name
          image {
            id
            image
          }
        }
        quantity
        totalPrice
        userId
        selectedVariantId
        selectedVariant {
          id
          unit
          values
        }
      }
      cartId
      user {
        id
        email
        phoneNo
        firstName
        lastName
      }
      userId
      branch {
        id
        name
      }
      branchId
      coupon {
        id
        name
        code
        discount
        discountType
      }
      couponId
      paymentStatus
      paymentType
      orderAmount
      orderDiscountPrice
      totalOrderPrice
    }
  }
`;

export const getUserOrders = gql`
  query GetUserOrder($userId: String) {
    getUserOrder(userId: $userId) {
      id
      orderId
      orderTime
      orderAmount
      orderStatus
    }
  }
`;

export const deleteAddress = gql`
  mutation Mutation($deleteUserAddressId: ID!) {
    deleteUserAddress(id: $deleteUserAddressId) {
      message
      data {
        id
        address
        apartment
        label
        user {
          id
        }
        userId
        pincode
      }
    }
  }
`;


export const getUserAddress = gql`
  query GetUserById($userId: ID!) {
    getUserById(userId: $userId) {
      id
      email
      firstName
      Address {
        id
        address
        apartment
        label
        userId
        pincode
      }
    }
  }
`;
