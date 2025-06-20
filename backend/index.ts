
import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route"

import dotenv from 'dotenv';
import { errorMiddleware } from "./middlewares/errorMiddleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

// app.use(cors());

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("app started successfully")
})

// mongoose.connect('mongodb://localhost:27017/fourbtech')
//     .then(() => console.log("db connected"))
//     .catch((err) => console.log("mongodb error:", err));

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.f9ow5g8.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri)
  .then(() => console.log("db connected"))
  .catch((err) => console.log("mongodb error:", err));


app.use('/api', authRoutes);


app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('server running at 5000')
})