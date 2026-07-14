import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Box,
  Chip,
  CardActions,
} from "@mui/material";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";
import { addtoCart } from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";

const ProductCard = ({ id, name, price, image, rating, inStock, brand }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    console.log("before dispatch", addtoCart({
        id: id,
        name: name,
        price: price,
        image: image,
      }));
    e.stopPropagation();
    dispatch(
      addtoCart({
        id: id,
        name: name,
        price: price,
        image: image,
      }),
    );
    console.log("after dispatch", dispatch(addtoCart));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      onClick={() => navigate(`/products/${id}`)}
    >
      <Card
        sx={{
          maxWidth: 250,
          width: 250,
          height: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          m: 1,
        }}
      >
        {!inStock && (
          <Chip
            label="Out of Stock"
            color="text.secondary"
            size="small"
            sx={{
              position: "absolute",
              top: 5,
              left: 5,
              zIndex: 1,
              fontWeight: "bold",
            }}
          />
        )}
        <CardMedia
          component="img"
          height={200}
          image={
            image?.trim()
              ? image
              : "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
          }
          alt={name}
          sx={{ objectFit: "cover" }}
        />

        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            boxSizing: "border-box",
            p: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "text.secondary",
                textAlign: "left",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
              noWrap
            >
              {name}
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                textAlign: "left",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            >
              ${price}
            </Typography>
            <Typography
                variant="body1"
                sx={{ color: "text.secondary", fontWeight: "bold" }}
              >
              {brand}
             
            </Typography>
             
             
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", fontWeight: "bold" }}
              >
                {rating}
              </Typography>
              <Rating
                value={rating}
                precision={0.5}
                readOnly
                size="small"
                sx={{ color: "text.secondary" }}
              />
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          <Box sx={{ p: 1, width: "100%" }}>
          <CustomButton
            label="Add To Cart"
            onClick={handleAddToCart}
            variant="contained"
            color="primary.dark"
          />
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProductCard;