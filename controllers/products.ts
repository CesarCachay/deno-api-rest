import { v4 } from "https://deno.land/std/uuid/mod.ts";

type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  size: string;
};

let products: ProductType[] = [
  {
    id: "1",
    name: "Cárdigan guinda tejido",
    description:
      "Prenda tejida con flecos en la parte final que le añaden largo y movimiento.",
    price: 42,
    size: "M",
  },
  {
    id: "2",
    name: "Camisa franela cuadros",
    description:
      "Cuenta con bolsillo lateral en el pecho, detalle de franjas blancas en la mangas (largas) y número 87 parte posterior.",
    price: 42,
    size: "M",
  },
  {
    id: "3",
    name: "Sudadera adidas climalite",
    description:
      "Prenda larga azul noche. Cuenta con logo en el pecho y franjas blancas en las mangas. (100% poliéster)",
    price: 50,
    size: "L",
  },
  {
    id: "4",
    name: "Casaca jean oversize",
    description:
      "Forro de peluche blanco y forro de franela estampada en las mangas. Cuenta con bolsillo interno al lado izquierdo, dos bolsillos laterales y dos en la parte del pecho.",
    price: 85,
    size: "M",
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
    // const newProduct: ProductType = {
    //   id: v4.generate(),
    //   name: body.value.name,
    //   description: body.value.description,
    //   price: body.value.price,
    //   size: body.value.size,
    //   image: body.value.image,
    // };
    // let data = [...products, newProduct];

    const product: ProductType = body.value;
    product.id = v4.generate();
    products.push(product);
    response.status = 201;
    response.body = {
      success: true,
      data: product,
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
    } = body.value;

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
const deleteProduct = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
