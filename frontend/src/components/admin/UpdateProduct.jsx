import React, { useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, getProductsDetails, updateAdminProduct } from "../../actions/productActions";
import { Button } from "@mui/material";
import Loader from "../layouts/loader/loader";
import { RESET_PRODUCT_DETAILS } from "../../constants/productDetailsConstants";

const UpdateProduct = () => {

    const dispatch = useDispatch();
    const { loading:detailsLoading,error, product } = useSelector((state) => state.productsDetails);

    const navigate = useNavigate();

    const {
        loading,
        updateError,
        isUpdated,
    } = useSelector((state) => state.product);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    const { productId } = useParams();

    useEffect(()=>{

        dispatch(getProductsDetails(productId));
    },[dispatch,productId])

    useEffect(() => {
        if (product && product._id === productId) {
            setName(product&&product.name);
            setDescription(product&&product.description);
            setPrice(product&&product.price);
            setCategory(product&&product.category);
            setStock(product&&product.stock);
            setOldImages(product&&product.images);
        } 
        if (error) {
            toast.error(error, { theme: 'dark' });
            dispatch(clearErrors());
        }

        if (updateError) {
            toast.error(updateError, { theme: 'dark' });
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("Product Updated Successfully", { theme: 'dark' });
            dispatch({ type: UPDATE_PRODUCT_RESET });
            navigate("/admin/products");
        }
    }, [
        dispatch,
        error,
        isUpdated,
        productId,
        product,
        updateError,
        navigate
    ]);

    useEffect(()=>{

        return ()=>{
            
                dispatch({type:RESET_PRODUCT_DETAILS});
                console.log('component unmounted');
        
        }
    },[dispatch])

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(updateAdminProduct(productId, myForm));
    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <>
            {(detailsLoading) ? (<Loader></Loader>) : (

                <div className="dashboard-main-container">
                    <Sidebar></Sidebar>
                    <div className="dashboard-container">
                        <form
                            className="createProductForm"
                            encType="multipart/form-data"
                            onSubmit={updateProductSubmitHandler}
                            style={{display:'flex',flexDirection:'column',justifyContent:'space-evenly'}}
                        >
                            <h2 className='dashboard-heading' style={{color:'burlywood',marginTop:'10px',border:'none'}}>Update Product</h2>
                            <div>
                                <SpellcheckIcon />
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    required
                                    value={(name) ? name : ''}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <AttachMoneyIcon />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    required
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price && price}
                                />
                            </div>

                            <div>
                                <DescriptionIcon />

                                <textarea
                                    placeholder="Product Description"
                                    value={description && description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    cols="30"
                                    rows="1"
                                ></textarea>
                            </div>

                            <div>
                                <AccountTreeIcon />
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Choose Category</option>
                                    {categories.map((cate) => (
                                        <option key={cate} value={cate}>
                                            {cate}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <StorageIcon />
                                <input
                                    type="number"
                                    placeholder="Stock"
                                    required
                                    onChange={(e) => setStock(e.target.value)}
                                    value={stock}
                                />
                            </div>

                            <div id="createProductFormFile">
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={updateProductImagesChange}
                                    multiple
                                />
                            </div>

                            <div id="createProductFormImage" style={{height:'auto'}}>
                                {oldImages &&
                                    oldImages.map((image, index) => (
                                        <img key={index} src={image.url} alt="Old Product Preview" />
                                    ))}
                            </div>

                            <div id="createProductFormImage" style={{height:'auto'}}>
                                {imagesPreview.map((image, index) => (
                                    <img key={index} src={image} alt="Product Preview" />
                                ))}
                            </div>

                            <Button
                                id="createProductBtn"
                                type="submit"
                                disabled={loading ? true : false}
                            >
                                Update
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default UpdateProduct