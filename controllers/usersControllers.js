import usersService from "../services/UsersService.js";

export default {
    getUsers: async (req, res) => {
        return res.send(await usersService.getAllUsersWithSubscriptions())
    }
}