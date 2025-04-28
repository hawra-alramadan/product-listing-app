import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Form,
  Button,
} from "react-bootstrap";
import ProductCard from "./ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortPrice, setSortPrice] = useState("");
  const [minPrice, setMinPrice] = useState(""); // ⬅️ السعر الأدنى
  const [maxPrice, setMaxPrice] = useState(""); // ⬅️ السعر الأعلى
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
        setDisplayedProducts(response.data.products);
        const uniqueCategories = [
          "All",
          ...new Set(response.data.products.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // بحث بالاسم
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // فلترة بالتصنيف
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // فلترة بالحد الأدنى والأعلى للسعر
    if (minPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price >= parseFloat(minPrice)
      );
    }
    if (maxPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price <= parseFloat(maxPrice)
      );
    }

    // ترتيب حسب السعر
    if (sortPrice === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortPrice === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setDisplayedProducts(filtered);
  }, [searchTerm, selectedCategory, sortPrice, minPrice, maxPrice, products]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );

  if (error)
    return (
      <Alert variant="danger" className="text-center my-5">
        {error}
      </Alert>
    );

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Products</h1>

      {/* Filters */}
      <Form className="mb-4">
        <Row className="g-2">
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>

          <Col md={3}>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={2}>
            <Form.Control
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </Col>

          <Col md={2}>
            <Form.Control
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </Col>

          <Col md={2}>
            <Form.Select
              value={sortPrice}
              onChange={(e) => setSortPrice(e.target.value)}
            >
              <option value="">Sort by Price</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>

      {/* Product List */}
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
        {displayedProducts.map((product) => (
          <Col key={product.id}>
            <ProductCard
              product={product}
              isSelected={selectedIds.includes(product.id)}
              toggleSelect={toggleSelect}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
