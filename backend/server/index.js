const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { router } = require("../routes");
const connectDB = require("../DB_Connection");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:4001"],
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    credentials: true,
    maxAge: 600,
    exposedHeaders: ["*", "Authorization"],
  })
);
dotenv.config({ path: ".env" });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log(`Server is running at ${process.env.PORT}`);
});
