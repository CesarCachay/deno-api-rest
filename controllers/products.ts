import { Product } from "../types.ts";

let products: Product[] = [
  {
    id: "1",
    name: "Cárdigan guinda tejido",
    description:
      "Prenda tejida con flecos en la parte final que le añaden largo y movimiento.",
    price: 42,
    size: "M",
    image: "",
  },
  {
    id: "2",
    name: "Camisa franela cuadros",
    description:
      "Cuenta con bolsillo lateral en el pecho, detalle de franjas blancas en la mangas (largas) y número 87 parte posterior.",
    price: 42,
    size: "M",
    image: "",
  },
  {
    id: "3",
    name: "Sudadera adidas climalite",
    description:
      "Prenda larga azul noche. Cuenta con logo en el pecho y franjas blancas en las mangas. (100% poliéster)",
    price: 50,
    size: "L",
    image: "",
  },
  {
    id: "4",
    name: "Casaca jean oversize",
    description:
      "Forro de peluche blanco y forro de franela estampada en las mangas. Cuenta con bolsillo interno al lado izquierdo, dos bolsillos laterales y dos en la parte del pecho.",
    price: 85,
    size: "M",
    image: "",
  },
];

// @GET /api/products - all products
const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

// @GET /api/products/:id - retrieve
const getProduct = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

// @POST /api/products/:id
const createProduct = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

// @PUT /api/products/:id
const updateProduct = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

// @DELETE /api/products/:id
const deleteProduct = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
