import "dotenv/config";
import app from "./app.js";


const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Backend started on PORT ${PORT}`);
});