import { useState } from "react";
import { useGetCategoryQuery } from "../../features/productsApi";
import axios from "axios";
import { validate } from "./validations";

const CreateProduct = () => {
  const categoriesQuery = useGetCategoryQuery();
  const [create, setCreate] = useState(false);
  const initialState = {
    name: "",
    price: "",
    category: [],
    description: "",
    stock: "",
    image: "",
    origin: "",
  };

  const [errors, setErrors] = useState({ form: "complete form" });
  const [completed, setCompleted] = useState(initialState);

  const handleChange = (e) => {
    if (e.target.name === "stock") {
      setCompleted({
        ...completed,
        [e.target.name]: parseInt(e.target.value, 10),
      });
    } else {
      setCompleted({ ...completed, [e.target.name]: e.target.value });
    }

    const validationErrors = validate({
      ...completed,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: validationErrors[e.target.name] });
  };

  const handleCategories = (e) => {
    const selectedCategory = categoriesQuery.data.find(
      (category) => category.name === e.target.value
    );
    const existingIndex = completed.category.findIndex(
      (category) => category.id === selectedCategory.id
    );
    if (existingIndex === -1) {
      // La categoría no se ha seleccionado antes, agregue el nuevo elemento
      setCompleted({
        ...completed,
        category: [...completed.category, selectedCategory],
      });
    } else {
      // La categoría ya se seleccionó antes, reemplace el elemento existente
      const newCategoryArray = [...completed.category];
      newCategoryArray.splice(existingIndex, 1, selectedCategory);
      setCompleted({
        ...completed,
        category: newCategoryArray,
      });
    }

    const validationErrors = validate({
      ...completed,
      category: [...completed.category, selectedCategory],
    });
    setErrors({ ...errors, category: validationErrors.category });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalForm = {
      name: completed.name,
      price: completed.price,
      category:
        completed.category.length > 0
          ? completed.category.map((item) => item.name)
          : "",
      description: completed.description,
      stock: Number(completed.stock),
      image: completed.image,
      origin: completed.origin,
    };

    const validationErrors = validate(finalForm);

    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();

      formData.append("name", finalForm.name);
      formData.append("price", finalForm.price);
      formData.append("description", finalForm.description);
      formData.append("stock", finalForm.stock);
      formData.append("origin", finalForm.origin);
      formData.append("image", e.target.image.files[0]);

      finalForm.category.forEach((category) =>
        formData.append("category", category)
      );

      axios
        .post("/products", formData)
        .then(() => {
          setCreate(!create);
          setCompleted(initialState);
          Swal.fire({
            icon: 'success',
            title: 'Product has been created',
    
          })
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <section className="flex items-center justify-center flex-col h-screen">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-wrap -mx-3 mb-6 w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Name:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              name="name"
              autoComplete="off"
              placeholder="Product name..."
              value={completed.name}
              onChange={handleChange}
            />
            {errors.name && <span className="text-red-500">{errors.name}</span>}
          </div>

          <div className="relative flex flex-wrap -mx-3 mb-6 w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
              Price:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="number"
              name="price"
              placeholder="Product price..."
              value={completed.price}
              onChange={handleChange}
            />
            {errors.price && (
              <span className="text-red-500">{errors.price}</span>
            )}
          </div>

          <div className="flex flex-wrap -mx-3 mb-6 w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Stock:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="Stock..."
              type="number"
              id="stock"
              name="stock"
              value={completed.stock}
              onChange={handleChange}
            />
            {errors.stock && (
              <span className="text-red-500">{errors.stock}</span>
            )}
          </div>

          <div className="relative flex flex-wrap -mx-3 mb-6 w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
              Origin:
            </label>
            <select
              name="origin"
              onChange={handleChange}
              value={completed.origin}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            >
              <option>Choose</option>
              <option value="animal">Animal</option>
              <option value="plant">Plant</option>
            </select>
            {errors.origin && (
              <span className="text-red-500">{errors.origin}</span>
            )}
          </div>

          <div className="relative flex flex-wrap -mx-3 mb-6 w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
              Categories:
            </label>
            <select
              name="category"
              onChange={handleCategories}
              value={completed.category
                .map((category) => category.name)
                .join(",")}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            >
              <option value="choose">Choose</option>
              {categoriesQuery.data &&
                categoriesQuery.data.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </select>
            {errors.category && (
              <span className="text-red-500">{errors.category}</span>
            )}
          </div>

          <div className="flex flex-wrap -mx-3 mb-6 w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Description:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              name="description"
              placeholder="Description..."
              value={completed.description}
              onChange={handleChange}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description}</span>
            )}
          </div>

          <div className="flex flex-wrap -mx-3 mb-6 w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Image:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="Url..."
              type="file"
              id="image"
              name="image"
              value={completed.image}
              onChange={handleChange}
            />
            {errors.image ? (
              <label className="text-red-500">{errors.image}</label>
            ) : null}
          </div>

          <div className="flex items-center justify-center">
            <div>
              <button
                className="shadow bg-slate-500 hover:bg-slate-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreateProduct;