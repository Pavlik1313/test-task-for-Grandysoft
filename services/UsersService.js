import DatabaseManager from "../managers/DatabaseManager.js";
export default {
    getAllUsersWithSubscriptions: async () => {
        const users = await DatabaseManager.getAllUsers()
        for (let i = 0; i < users.length; i++){
            const id = users[i].id
            users[i].subscriptions = await DatabaseManager.getSubscriptionsByID(id)
        }
        return users
    },
    getFriendsByID: async (id, order_by='id', order_type='asc') => {
        const MAY_BE_ORDER_BY = ['id', 'first name', 'gender'];
        const ORDER_TYPES = ['asc', 'desc'];
        if (!MAY_BE_ORDER_BY.includes(order_by)) return `Invalid filter: '${order_by}'. Use one of this: ${MAY_BE_ORDER_BY}`
        if (!ORDER_TYPES.includes(order_type)) return `Invalid order type: '${order_type}'. Use one of this: ${ORDER_TYPES}`
        if ( Number.isInteger(parseInt(id, 10))) return `Invalid id`
        return await DatabaseManager.getFriendsByID(id, order_by, order_type)
    },
    getMaxFollowing: async ()=>{
        return await DatabaseManager.getMaxFollowing()
    },
    getNotFollowing: async ()=>{
        return await DatabaseManager.getNotFollowing()
    },
    getUser: async (id)=>{
        if ( Number.isInteger(parseInt(id, 10))) return `Invalid id`
        const user = await DatabaseManager.getUserByID(id);
        user.subscriptions = await DatabaseManager.getSubscriptionsByID(id)
        user.subscribers = await DatabaseManager.getSubscribersByID(id)
        user.friends = await  DatabaseManager.getFriendsByID(id)
        return user
    }

}
