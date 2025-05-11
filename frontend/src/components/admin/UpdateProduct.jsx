import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Avatar,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, getProductsDetails, updateAdminProduct } from "../../actions/productActions";
import Sidebar from "./Sidebar";
import Loader from "../layouts/loader/loader";
import { RESET_PRODUCT_DETAILS } from "../../constants/productDetailsConstants";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { loading: detailsLoading, error, product } = useSelector((state) => state.productsDetails);
  const { loading, updateError, isUpdated } = useSelector((state) => state.product);
  const { productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["Laptop", "Footwear", "Bottom", "Tops", "Attire", "Camera", "SmartPhones"];

  useEffect(() => {
    dispatch(getProductsDetails(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (product && product._id === productId) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }

    if (error) {
      toast.error(error, { theme: "dark" });
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError, { theme: "dark" });
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully", { theme: "dark" });
      dispatch({ type: UPDATE_PRODUCT_RESET });
      navigate("/admin/products");
    }
  }, [dispatch, error, isUpdated, productId, product, updateError, navigate]);

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_PRODUCT_DETAILS });
    };
  }, [dispatch]);

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

  return detailsLoading ? (
    <Loader />
  ) : (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100%" }}>
      {/* Sidebar */}
      <Box sx={{ width: "240px", flexShrink: 0 }}>
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Box
          component="form"
          onSubmit={updateProductSubmitHandler}
          sx={{
            backgroundColor: "#fff",
            p: 4,
            borderRadius: 2,
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "burlywood" }}>
            Update Product
          </Typography>

          <TextField
            label="Product Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Price"
            type="number"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <TextField
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">Choose Category</MenuItem>
              {categories.map((cate) => (
                <MenuItem key={cate} value={cate}>
                  {cate}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Stock"
            type="number"
            required
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <Button variant="outlined" component="label">
            Upload Images
            <input
              type="file"
              accept="image/*"
              hidden
              multiple
              onChange={updateProductImagesChange}
            />
          </Button>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {oldImages &&
              oldImages.map((img, idx) => (
                <Avatar
                  key={idx}
                  src={img.url}
                  variant="rounded"
                  sx={{ width: 100, height: 100 }}
                />
              ))}
            {imagesPreview.map((img, idx) => (
              <Avatar
                key={idx}
                src={img}
                variant="rounded"
                sx={{ width: 100, height: 100 }}
              />
            ))}
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateProduct;
