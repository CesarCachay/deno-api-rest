import { v4 } from "https://deno.land/std/uuid/mod.ts";

type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  size: string;
  image: string | undefined;
};

let products: ProductType[] = [
  {
    id: "1",
    name: "Cárdigan guinda tejido",
    description:
      "Prenda tejida con flecos en la parte final que le añaden largo y movimiento.",
    price: 42,
    size: "M",
    image:
      "https://res.cloudinary.com/rql-products/image/upload/v1600040927/cardigan-guinda-tejido_avkk9z.png",
  },
  {
    id: "2",
    name: "Camisa franela cuadros",
    description:
      "Cuenta con bolsillo lateral en el pecho, detalle de franjas blancas en la mangas (largas) y número 87 parte posterior.",
    price: 42,
    size: "M",
    image:
      "https://res.cloudinary.com/rql-products/image/upload/v1600040959/camisa-franela-cuadros_d60i0f.png",
  },
  {
    id: "3",
    name: "Sudadera adidas climalite",
    description:
      "Prenda larga azul noche. Cuenta con logo en el pecho y franjas blancas en las mangas. (100% poliéster)",
    price: 50,
    size: "L",
    image:
      "https://res.cloudinary.com/rql-products/image/upload/v1600040971/sudadera-adidas-climalite_jfxxy3.png",
  },
  {
    id: "4",
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
  const newProduct: ProductType | undefined = products.find((product) =>
    product.id === params.id
  );

  if (newProduct) {
    response.status = 200;
    response.body = {
      success: true,
      data: newProduct,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      message: "No product available with that id",
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
      message: "No data send to server",
    };
  } else {
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
  const product: ProductType | undefined = products.find((p) =>
    p.id === params.id
  );

  if (product) {
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
      data: products,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      message: "No product found with that id",
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
