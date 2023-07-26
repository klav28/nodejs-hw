import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./app.js";

dotenv.config();

const { DB_HOST, PORT } = process.env;

// mongoose.set("debug", (collectionName, method, query, doc) => {
//   console.log(
//     `Collection ${collectionName}.${method}`,
//     "JSON",
//     JSON.stringify(query),
//     "DOC",
//     doc
//   );
// });

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Connection error: ", error.message);
    process.exit(1);
  });
