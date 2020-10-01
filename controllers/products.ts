import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { ProductType } from "./types.ts";

let products: ProductType[] = [
  {
    id: v4.generate(),
    name: "Cárdigan guinda tejido",
    description:
      "Prenda tejida con flecos en la parte final que le añaden largo y movimiento.",
    price: 42,
    size: "M",
    image:
      "https://res.cloudinary.com/rql-products/image/upload/v1600040927/cardigan-guinda-tejido_avkk9z.png",
  },
  {
    id: v4.generate(),
    name: "Camisa franela cuadros",
    description:
      "Cuenta con bolsillo lateral en el pecho, detalle de franjas blancas en la mangas (largas) y número 87 parte posterior.",
    price: 42,
    size: "M",
    image:
      "https://res.cloudinary.com/rql-products/image/upload/v1600040959/camisa-franela-cuadros_d60i0f.png",
  },
  {
    id: v4.generate(),
    name: "Sudadera adidas climalite",
    description:
      "Prenda larga azul noche. Cuenta con logo en el pecho y franjas blancas en las mangas. (100% poliéster)",
    price: 50,
    size: "L",
    image:
      "https://res.cloudinary.com/rql-products/image/upload/v1600040971/sudadera-adidas-climalite_jfxxy3.png",
  },
  {
    id: v4.generate(),
    name: "Casaca jean oversize",
    description:
      "Forro de peluche blanco y forro de franela estampada en las mangas. Cuenta con bolsillo interno al lado izquierdo, dos bolsillos laterales y dos en la parte del pecho.",
    price: 85,
    size: "M",
    image:
      "https://res.cloudinary.com/rql-products/image/upload/v1600040980/casaca-jean-oversize_ya0vbk.png",
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
const getProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const selectedProduct: ProductType | undefined = products.find((product) =>
    product.id === params.id
  );

  if (selectedProduct) {
    response.status = 200;
    response.body = {
      success: true,
      data: selectedProduct,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      message: "Product Not Found",
    };
  }
};

// @POST /api/products
const createProduct = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      message: "No Data Provided",
    };
  } else {
    const newProduct: ProductType = await body.value;
    newProduct.id = v4.generate();
    products.push(newProduct);
    response.status = 200;
    response.body = {
      success: true,
      data: newProduct,
    };
  }
};

// @PUT /api/products/:id
const updateProduct = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const productFound: ProductType | undefined = products.find((p) =>
    p.id === params.id
  );

  if (productFound) {
    const body = await request.body();

    const updatedData: {
      name?: string;
      description?: string;
      price?: number;
      size?: string;
      image?: string;
    } = await body.value;

    products = products.map((p) =>
      p.id === params.id ? { ...p, ...updatedData } : p
    );

    response.status = 200;
    response.body = {
      success: true,
      data: `Product id ${params.id} has been updated`,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      message: "Product Not Found",
    };
  }
};

// @DELETE /api/products/:id
const deleteProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  products = products.filter((p) => p.id !== params.id);

  response.body = {
    success: true,
    data: "Product remove",
  };
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
