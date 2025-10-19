import express from "express";
import mongoose from "mongoose";
import todoRoutes from "./routes/todoRoutes";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use("/todos", todoRoutes);

mongoose.connect("mongodb://admin:password123@localhost:27017/todo_db?authSource=admin")
  .then(() => {
    console.log(" Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => console.log(" MongoDB connection error:", err));

app.listen(PORT,()=>{
    console.log(`todo server is runnning at ${PORT}`)
})