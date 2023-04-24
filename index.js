import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import { handleRegister, handleLogin } from "./handlers/auth.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(cors({origin: "http://127.0.0.1:5173"}));
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=> {console.log('connected')});

app.post("/login", handleLogin);

app.post("/register", handleRegister);

app.listen(3001, () => {console.log("listening on port 3001")});