// frontend/pages/HomePage.jsx
import { useEffect, useState } from "react";
import { useProductStore } from "../store/product"; // Import du store Zustand

function HomePage() {
  const { products, setProducts, deleteProduct, updateProduct } = useProductStore(); // récupérer les méthodes
  const [editingProduct, setEditingProduct] = useState(null); // produit en cours d'édition
  const [formData, setFormData] = useState({ name: "", price: "", image: "" }); // formulaire update

  // Chargement initial des produits
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [setProducts]);

  // Gestion du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    const { success, message } = await updateProduct(editingProduct._id, formData);
    console.log("Update:", success, message);
    setEditingProduct(null);
    setFormData({ name: "", price: "", image: "" });
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setFormData({ name: product.name, price: product.price, image: product.image });
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll vers le formulaire
  };

  const handleDelete = async (id) => {
    const { success, message } = await deleteProduct(id);
    console.log("Delete:", success, message);
  };

  return (
    <div className="container mt-4">
      {/* Formulaire Update */}
      {editingProduct && (
        <div className="mb-4">
          <h2>Update Product</h2>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                type="url"
                className="form-control"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn bg-dark text-light">Update Product</button>
          </form>
        </div>
      )}

      <h2 className="mb-4">Our Products</h2>
      <div className="row">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((p) => (
            <div className="col-md-4 mb-3" key={p._id}>
              <div className="card h-100">
                <img
                  src={p.image}
                  alt={p.name}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">${p.price}</p>
                  <button className="btn bg-dark text-light me-2" onClick={() => startEdit(p)}>Update</button>
                  <button className="btn bg-dark text-light" onClick={() => handleDelete(p._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
