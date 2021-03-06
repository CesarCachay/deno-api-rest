import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";

const port = 9000;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running or port ${port}`);

await app.listen({ port });
