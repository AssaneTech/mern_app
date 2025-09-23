import { useState } from "react";
import { useProductStore } from "../store/product";

function CreatePage() {
  const [newproduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newproduct, [name]: value });
  };
  const {createProduct} = useProductStore ()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {succes, message} = await createProduct(newproduct)
    console.log("Success:", succes)
    console.log("Message:", message)
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Create New Product</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Product Name */}
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={newproduct.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={newproduct.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </div>

        {/* Image URL */}
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="url"
            className="form-control"
            name="image"
            value={newproduct.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </div>

        <button type="submit" className="btn bg-dark text-light">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default CreatePage;
