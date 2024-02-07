import * as express from "express";
import { AppDataSource } from "./data-source";

// Initialize Express
const app = express();
const PORT = 3000; // Port number for the Express server

// Middlewares
app.use(express.json()); // for parsing application/json

AppDataSource.initialize()
  .then(async () => {
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
