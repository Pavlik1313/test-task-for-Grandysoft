import usersService from "../services/UsersService.js";

export default {
    getUsers: async (req, res) => {
        return res.send(await usersService.getAllUsersWithSubscriptions())
    },
    getFriends: async (req, res) => {
        const id = req.params.id;
        const order_by = req.query.order_by;
        const order_type = req.query.order_type;
        return res.send(await usersService.getFriendsByID(id, order_by, order_type))
    },
    getMaxFollowing: async (req, res) => {
        return res.send(await usersService.getMaxFollowing())
    },
    getNotFollowing: async (req, res) => {
        return res.send(await usersService.getNotFollowing())
    },
    getUser: async (req, res) => {
    const id = req.params.id;
    return res.send(await usersService.getUser(id))
    }
}