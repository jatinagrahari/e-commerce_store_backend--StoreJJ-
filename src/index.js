// import dotenv from "dotenv";
import "dotenv/config";
import connectDB from "./db/index.js";

// dotenv.config({
//   path: "./.env",
// });

import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running in Port - ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("MongoDB Connection Failed !!!", error));
