import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addtocart } from '../redux/cart';
import AddProduct from './addproducts';
import { v4 as uuidv4 } from 'uuid';

function Body() {
  const [addProductSS, setAddProducts] = useState(null);
  const getProduct = (data) => {
    setAddProducts(data);
  };
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProductTitle, setEditProductTitle] = useState("");
  const [editProductPrice, setEditProductPrice] = useState("");
  const [editProductDescription, setEditProductDescription] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order is ascending  

  useEffect(() => {
    async function fetchedProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        let mergeProducts = response.data;

        if (addProductSS) {
          mergeProducts = [...mergeProducts, addProductSS];
        }
        setProducts(mergeProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchedProducts();
  }, [addProductSS]);

  const sortProducts = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setProducts(sortedProducts);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sorting order
  };

  const updateProduct = async () => {
    try {
      await axios.put(`https://fakestoreapi.com/products/${selectedProductId}`, {
        title: editProductTitle,
        description: editProductDescription,
        price: editProductPrice,
      });
      const updatedProduct = products.map((product) => {
        if (product.id === selectedProductId) {
          return {
            ...product,
            title: editProductTitle,
            description: editProductDescription,
            price: editProductPrice,
          };
        }
        return product;
      });
      setProducts(updatedProduct);
      setShowForm(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
    alert("Product updated successfully.");
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${productId}`);
      const updatedProductList = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProductList);
      alert("Item deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const editProduct = (id) => {
    setShowForm(true);
    let newEditProduct = products.find((elem) => elem.id === id);

    setSelectedProductId(id);
    setEditProductDescription(newEditProduct.description);
    setEditProductPrice(newEditProduct.price);
    setEditProductTitle(newEditProduct.title);
  };

  return (
    <>
      <AddProduct onSubmit={getProduct} />
      <h1>Products list</h1>
      <button onClick={sortProducts}>
        Sort By Price ({sortOrder === 'asc' ? 'Low to High ' : 'High to Low'})
      </button>
      {showForm && (
        <div className="edit-album">
          <h2>Edit Product</h2>
          <label className="mx-2">Product Title</label>
          <input type="text" value={editProductTitle} onChange={(e) => setEditProductTitle(e.target.value)} />
          <label className="mx-2">Product Description</label>
          <input type="text" value={editProductDescription} onChange={(e) => setEditProductDescription(e.target.value)} />
          <label className="mx-2">Product Price</label>
          <input type="text" value={editProductPrice} onChange={(e) => setEditProductPrice(e.target.value)} />
          <button className="update-button mx-2" onClick={updateProduct}>UPDATE</button>
        </div>
      )}
      <ul>
        {products.map((product) => (
          <li
            key={uuidv4()}
            className="list-item my-4 mx-4"
            style={{ width: 300 }}
          >
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <h5>Price: ${product.price}</h5>
                <p className="card-text">{product.description}</p>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() =>
                    dispatch(
                      addtocart({
                        id: product.id,
                        image: product.image,
                        price: product.price,
                      })
                    )
                  }
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => editProduct(product.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Body;
