import express from "express";
import PeliRoutes from "./src/Routes/PeliRoutes.js";
import empRoutes from "./src/Routes/empleadoRoutes.js";
import regiempRoutes from "./src/Routes/registerEmpRoutes.js";
import clienteRoutes from "./src/Routes/ClienteRoutes.js";
import registerCliente from "./src/Routes/registerClienteRoutes.js";
import Login from "./src/Routes/Login.js";
const app = express();

app.use(express.json());
app.use("/api/PeliRoutes",PeliRoutes);
app.use("/api/empleadoRoutes",empRoutes);
app.use("/api/registerEmpRoutes",regiempRoutes);
app.use("/api/ClienteRoutes",clienteRoutes);
app.use("/api/registerClienteRoutes",registerCliente);
app.use("/api/Login",Login);

export default app;