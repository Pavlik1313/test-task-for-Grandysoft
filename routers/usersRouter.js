import usersControllers from "../controllers/usersControllers.js";
import express from "express";

const usersRouter = express.Router()

usersRouter.route('/users')
            .get(usersControllers.getUsers)

usersRouter.route('/users/:id')
            .get(usersControllers.getUser)

usersRouter.route('/:id/friends')
            .get(usersControllers.getFriends)

usersRouter.route('/max-following')
            .get(usersControllers.getMaxFollowing)

usersRouter.route('/not-following')
            .get(usersControllers.getNotFollowing)

export default usersRouter