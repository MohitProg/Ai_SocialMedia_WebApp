import "dotenv/config"
import express from "express";

const app = express();

app.use(express.json());

const PORT=process.env.PORT|| 3000

app.get("/", (req, res) => {
  res.json({
    message: "Hello TypeScript"
  });
});

app.listen(3000, () => {
  console.log(`Backend is started on PORT NO ${PORT}`);
});