import app from "./app.js";
import { Server } from "http";
import config from "./config/index.js";

async function main() {
  const server: Server = app.listen(config.port, () => {
    console.log("Server is running on port : ", config.port);
  });
}
main();
