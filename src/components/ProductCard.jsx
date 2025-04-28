import React from "react";
import { Card } from "react-bootstrap";
import "./ProductCard.css";

const ProductCard = ({ product, isSelected, onSelect }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half">½</span>);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`}>☆</span>);
    }

    return stars;
  };

  return (
    <Card 
      className={`product-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <Card.Img 
        variant="top" 
        src={product.thumbnail} 
        alt={product.title}
        className="product-image"
      />
      <Card.Body>
        <Card.Title className="product-title">{product.title}</Card.Title>
        <div className="price-container">
          <span className="price">${product.price}</span>
          {product.discountPercentage > 0 && (
            <span className="discount">
              {product.discountPercentage}% off
            </span>
          )}
        </div>
        <div className="rating">
          {renderStars(product.rating)}
          <span className="rating-value">({product.rating})</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
