import DatabaseManager from "../managers/DatabaseManager.js";
export default {
    getAllUsersWithSubscriptions: async () => {
        const users = await DatabaseManager.getAllUsers()
        for (let i = 0; i < users.length; i++){
            const id = users[i].id
            users[i].subscriptions = await DatabaseManager.getSubscriptionsByID(id)
        }
        return users
    }
}
