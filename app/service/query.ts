import { gql } from "@apollo/client";

export const getAllCategories = gql`
  query GetAllCategories {
    getAllCategories {
      id
      name
      image
      isActive
      defaultRoute
      productsCount
      productTypes {
        id
        name
        defaultRoute
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

export const GetAddToCarts = gql`
  query GetAddToCartsByUserId($userId: ID!) {
    getAddToCartsByUserId(userId: $userId) {
      carts {
        id
        product {
          id
          name
          image {
            id
            image
          }
          dicountType
          dicountPercentage
        }
        quantity
        totalPrice
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
      subTotal
    }
  }
`;

export const AllProductsWithSearch = gql`
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
          isOrder
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

export const AllProductTypeBanner = gql`
  query GetAllBanner {
    getAllBanner {
      id
      title
      description
      image
      ProductType {
        id
        name
        isActive
        defaultRoute
        productCategory {
          id
          name
        }
      }
    }
  }
`;

export const AddToCart = gql`
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

export const updateAddToCart = gql`
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

export const GetCategoryProducts = gql`
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

export const GetProductTypeProducts = gql`
  query GetProductTypeId($getProductTypeId: ID!, $filter: SortProducts) {
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

export const CategoryProductTypeList = gql`
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

export const LoginViaPhone = gql`
  mutation LoginViaPhone($phoneNo: String!) {
    loginViaPhone(phoneNo: $phoneNo) {
      message
      otp
    }
  }
`;

export const OtpValidationForPhone = gql`
  mutation LoginPhoneNoOtpValidation($phoneNo: String!, $otp: String!) {
    loginPhoneNoOtpValidation(phoneNo: $phoneNo, otp: $otp) {
      message
      data {
        id
        email
        phoneNo
        firstName
        lastName
        role
        profileImage
        isActive
      }
      accessToken
      refreshToken
    }
  }
`;

export const getProductVariant = gql`
  query Query($getProductVariantId: ID!) {
    getProductVariant(id: $getProductVariantId) {
      id
      size
      unit
      values
      price
      stock
      product {
        id
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

//subsc

export const AddToCartRed = gql`
  subscription Subscription {
    addCart {
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
  }
`;

export const updateSubs = gql`
  subscription Subscription {
    updateCart {
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
  }
`;

export const AllProducts = gql`
  query Query {
    getAllProducts {
      id
      variant {
        id
        AddToCart {
          id
          productId
          quantity
          isOrder
        }
      }
    }
  }
`;

export const PlaceOrderProducts = gql`
  mutation placeOrder($input: placeOrderInput!) {
    placeOrder(input: $input) {
      message
    }
  }
`;

export const ClientSecret = gql`
  mutation Mutation($input: cardPaymentInput) {
    cardPayment(input: $input) {
      clientSecret
    }
  }
`;

export const deleteCart = gql`
  mutation Mutation($cartId: ID!) {
    deleteCart(cartId: $cartId) {
      message
      data {
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
