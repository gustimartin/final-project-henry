


export const validate = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Product name is required";
  } else if (values.name.length < 3) {
    errors.name = "The product name must have at least 3 characters";
  }
  if (!values.price) {
    errors.price = "Price is required";
  } else if (!values.price || values.price < 0) {
    errors.price = "Price must be greater than or equal to 0";
  }
  if (!values.description) {
    errors.description = "Description is required";
  }
  if (!values.category || values.category.length === 0) {
    errors.category = "Please select a category";
  }

  if (!values.origin) {
    errors.origin = "Origin is required";
  } else if (values.origin !== "animal" && values.origin !== "plant") {
    errors.origin = "Origin must be 'animal' or 'plant'";
  }
  if (!values.image) {
    errors.image = "Image URL is required";
  }
  if (!values.stock) {
    errors.stock = "Stock is required";
  } else if (values.stock < 0) {
    errors.stock = "Stock must be greater than or equal to 0";
  }
  return errors;
};
