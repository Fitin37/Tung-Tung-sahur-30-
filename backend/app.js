import express from "express";
import PeliRoutes from "./src/Routes/PeliRoutes.js";
import empRoutes from "./src/Routes/empleadoRoutes.js";
import regiempRoutes from "./src/Routes/registerEmpRoutes.js";
import clienteRoutes from "./src/Routes/ClienteRoutes.js";
import registerCliente from "./src/Routes/registerClienteRoutes.js";
import Login from "./src/Routes/Login.js";
import RecoveryRoutes from "./src/Routes/RecoveryRoutes.js"
import Logout from "./src/Routes/LogoutRoutes.js";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());
app.use(cookieParser());

const swaggerDocument = JSON.parse(
    fs.readFileSync(path.resolve("./scp001Documentacion.json"), "utf-8")
  );

  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/PeliRoutes",PeliRoutes);
app.use("/api/empleadoRoutes",empRoutes);
app.use("/api/registerEmpRoutes",regiempRoutes);
app.use("/api/ClienteRoutes",clienteRoutes);
app.use("/api/registerClienteRoutes",registerCliente);
app.use("/api/Login",Login);
app.use("/api/Logout",Logout);
app.use("/api/recoveryPassword",RecoveryRoutes);

export default app;

































































































































































