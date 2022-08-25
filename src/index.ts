import dotenv from "dotenv";
import express from "express";
import questionnairesRouter from "src/apps/questionnaires/router";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 5000;

const app = express();
app.use(express.json());
app.use("/questionnaires", questionnairesRouter)

const startListening = async () => {
  try {
    app.listen(PORT, () => console.log(`Listening PORT ${PORT}`))
  } catch (error) {
    console.log(error);
  }
}

startListening();