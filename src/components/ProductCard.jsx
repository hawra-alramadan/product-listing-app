import React from "react";
import { Card } from "react-bootstrap";

const ProductCard = ({ product, isSelected, toggleSelect }) => {
  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <Card
      onClick={() => toggleSelect(product.id)}
      className={`product-card ${isSelected ? "selected" : ""}`}
    >
      <Card.Img
        variant="top"
        src={product.thumbnail}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          {/* Show the discounted price and original price with strike-through */}
          {product.discountPercentage ? (
            <div>
              <span
                className="original-price"
                style={{ textDecoration: "line-through", marginRight: "10px" }}
              >
                ${product.price}
              </span>
              <span className="discounted-price" style={{ color: "#e74c3c" }}>
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="text-success" style={{ marginLeft: "10px" }}>
                ({product.discountPercentage}% off)
              </span>
            </div>
          ) : (
            <strong>${product.price}</strong>
          )}
          <br />⭐ {product.rating}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
