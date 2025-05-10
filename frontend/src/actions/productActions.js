import axios from 'axios';

import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, ADMIN_PRODUCT_DELETE_REQUEST, ADMIN_PRODUCT_DELETE_SUCCESS, ADMIN_PRODUCT_DELETE_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL } from '../constants/productConstants'
import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, ADD_REVIEW, DASHBOARD_DETAILS_REQUEST, DASHBOARD_DETAILS_SUCCESS, DASHBOARD_DETAILS_FAIL } from '../constants/productDetailsConstants'

export const getProducts = (page = 1, search = '', price = [0, 100000], category = '') => async (dispatch) => {

    try {

        dispatch({

            type: ALL_PRODUCT_REQUEST
        })

        const { data } = await axios.get(`/products?page=${page}&keyword=${search}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`);

        dispatch({

            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })

    }
    catch (error) {

        console.log(error);

        dispatch({

            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.error.message

        })
    }
}

export const getProductsDetails = (productId) => async (dispatch) => {

    try {

        dispatch({

            type: PRODUCT_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/products/${productId}`);

        dispatch({

            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    }
    catch (error) {

        console.log(error);

        dispatch({

            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.error.message

        })
    }
}

export const clearErrors = () => async (dispatch) => {


    dispatch({

        type: CLEAR_ERRORS
    })

}

export const addProductReview = (reviewData, review, newRating) => async (dispatch) => {

    const isreviewed = reviewData.reviews.find((ele) => { return ele.user.toString() === review.user.toString() });

    let newReview = [];

    let newReviewData = {};


    if (isreviewed) {

        newReview = reviewData.reviews.map((ele) => {

            if (ele.user.toString() === review.user.toString()) {

                return review;
            }
            return ele
        })

        newReviewData = { ...reviewData, reviews: newReview, rating: newRating };


    }
    else {

        newReview = [...reviewData.reviews, review];

        newReviewData = { ...reviewData, reviews: newReview, rating: newRating, NumofReviews: reviewData.NumofReviews + 1 }

    }

    dispatch({

        type: ADD_REVIEW,
        payload: newReviewData
    })

}

export const getAdminProducts = () => async (dispatch) => {

    try {

        dispatch({

            type: ADMIN_PRODUCT_REQUEST
        })

        const { data } = await axios.get(`/products/admin/getproducts`);

        console.log(data);

        dispatch({

            type: ADMIN_PRODUCT_SUCCESS,
            payload: data
        })

    }
    catch (error) {

        console.log(error);

        dispatch({

            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.error.message

        })
    }
}

export const createProduct = (productData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        `/products/new`,
        productData,
        config
      );
  
      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data.error.message,
      });
    }
  };


  export const getdashboardDetails = () => async (dispatch) => {

    try {

        dispatch({

            type: DASHBOARD_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/dashboard`);

        dispatch({

            type: DASHBOARD_DETAILS_SUCCESS,
            payload: data
        })

    }
    catch (error) {

        console.log(error);

        dispatch({

            type: DASHBOARD_DETAILS_FAIL,
            payload: error?.response?.data?.message

        })
    }
}

export const updateAdminProduct = (id, productData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(
        `/products/${id}`,
        productData,
        config
      );
  
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.error.message,
      });
    }
  };


export const deleteAdminProduct = (id) => async (dispatch) => {

    try {

        dispatch({

            type: ADMIN_PRODUCT_DELETE_REQUEST
        })

        const { data } = await axios.delete(`/products/${id}`);

        console.log(data)

        dispatch({

            type: ADMIN_PRODUCT_DELETE_SUCCESS,
            payload: data.success,
            productId:id
        })

    }
    catch (error) {

        console.log(error);

        dispatch({

            type: ADMIN_PRODUCT_DELETE_FAIL,
            payload: error.response.data.error.message

        })
    }
}