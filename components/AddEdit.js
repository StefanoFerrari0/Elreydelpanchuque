import { useRouter } from "next/router";
import { Formik } from "formik";
export { AddEdit };

function AddEdit(props) {
  const product = props?.product;
  const isAddMode = !product;
  const router = useRouter();
  console.log("isaddmode: ", isAddMode);
  if (isAddMode) {
    var initValues = {
      title: "",
      price: 0,
      description: "",
      images: [],
      category: "",
    };
  } else {
    initValues = {
      title: product.title,
      price: product.price,
      description: product.description,
      images: product.images,
      category: product.category,
    };
  }

  console.log(initValues);

  // get functions to build form with useForm() hook

  function createProduct(data) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        price: data.price,
        description: data.description,
        images: data.images,
        category: data.category,
      }),
    };
    return fetch(`/api/products/`, requestOptions)
      .then((res) => {
        alert("Producto editado.");
        router.replace("/dashboard/products");
      })
      .catch(console.log(error));
  }

  function editProduct(id, data) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        price: data.price,
        description: data.description,
        images: data.images,
        category: data.category,
      }),
    };

    return fetch(`/api/products/${id}`, requestOptions)
      .then((res) => {
        alert("Producto editado.");
        router.replace("/dashboard");
      })
      .catch(console.log(error));
  }

  return (
    <Formik
      initialValues={initValues}
      validate={(values) => {
        let errors = {};

        if (!values.title) {
          errors.title = "El titulo no puede estar vacio.";
        }

        if (!values.price) {
          errors.price = "El precio no puede estar vacio.";
        }

        if (!values.description) {
          errors.description = "La descripción no puede estar vacia.";
        }

        if (!values.images) {
          errors.images = "Debe subir una imagen.";
        }

        if (!values.category) {
          errors.category = "La categoria no puede estar vacia.";
        }

        return errors;
      }}
      onSubmit={(data) => {
        return isAddMode ? createProduct(data) : editProduct(product._id, data);
      }}
    >
      {({
        values,
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        errors,
      }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Titulo</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Titulo"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.title && errors.title ? <div>{errors.title}</div> : null}
          </div>
          <div>
            <label htmlFor="price">Precio</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Precio"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.price && errors.price ? <div>{errors.price}</div> : null}
          </div>
          <div>
            <label htmlFor="description">Descripción</label>
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="Descripción"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.description && errors.description ? (
              <div>{errors.description}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="category">Imagen</label>
            <input type="file" />
            <img />
            {touched.images && errors.images ? (
              <div>{errors.images}</div>
            ) : null}
          </div>
          <button type="submit">Enviar</button>
        </form>
      )}
    </Formik>
  );
}
