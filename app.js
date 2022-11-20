import express from "express";
import usersRouter from "./routers/usersRouter.js";

const app = express();

app.use(usersRouter)

const PORT = 8080;
app.listen(PORT, ()=>{
    console.log(`Server is started.
    http://localhost:${PORT}`)
})