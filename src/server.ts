import app from "./app.js";
import { Server } from "http";

const port = 3000;

async function main() {
  const server: Server = app.listen(port, () => {
    console.log("Server is running on port : ", port);
  });
}
main();
