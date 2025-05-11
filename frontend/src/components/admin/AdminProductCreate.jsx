import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Avatar,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, createProduct } from "../../actions/productActions";

const AdminProductCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["Laptop", "Footwear", "Bottom", "Tops", "Attire", "Camera", "SmartPhones"];

  useEffect(() => {
    if (error) {
      toast.error(error, { theme: "dark" });
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully", { theme: "dark" });
      navigate("/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
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

    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Box sx={{ width: "240px", flexShrink: 0 }}>
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Box
          component="form"
          onSubmit={createProductSubmitHandler}
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
            New Product
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
              onChange={createProductImagesChange}
            />
          </Button>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
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
            Create
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminProductCreate;
