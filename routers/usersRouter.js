import usersControllers from "../controllers/usersControllers.js";
import express from "express";

const usersRouter = express.Router()

usersRouter.route('/users')
            .get(usersControllers.getUsers)

export default usersRouter