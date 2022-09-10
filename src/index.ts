import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import questionnairesRouter from "src/apps/questionnaires/router";
import authRouter from "src/apps/auth/router";
import { errorMiddleware } from "./middlewares";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 5000;

const app = express();
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use(errorMiddleware);
app.use("/questionnaires", questionnairesRouter);
app.use("/auth", authRouter);

const startListening = async () => {
  try {
    app.listen(PORT, () => console.log(`Listening PORT ${PORT}`))
  } catch (error) {
    console.log(error);
  }
}

startListening();