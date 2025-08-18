import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
//  ROUTE IMPORTS
import projectRoutes from "./projects/routes";
import taskRoutes from "./tasks/routes";
import userRoutes from "./users/routes";
import searchRoutes from "./search/routes";
import teamsRoutes from "./teams/routes";
// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// ROUTES
app.get("/", (req, res) => {
  res.send("You're hommme XD");
});

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);
app.use("/search", searchRoutes);
app.use("/teams", teamsRoutes);

//  SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Running port: ${port}`);
});
