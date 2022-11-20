import express from "express";

const app = express();

const PORT = 8080;
app.listen(PORT, ()=>{
    console.log(`Server is started.
    http://localhost:${PORT}`)
})