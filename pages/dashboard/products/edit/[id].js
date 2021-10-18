import { AddEdit } from "../../../../components/AddEdit";

export default AddEdit;

export async function getServerSideProps({ params }) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const data = await fetch(
    `${process.env.BASE_URL}/api/products/${params.id}`,
    requestOptions
  );

  const product = await data.json();
  console.log("PRODUCT: ", product);

  if (!product.success) {
    alert("Ese producto no existe");
  }
  return {
    props: { product: product.data },
  };
}
