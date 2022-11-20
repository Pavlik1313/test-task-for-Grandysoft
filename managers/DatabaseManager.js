import pg from 'pg';
import configDB from "../database/configDB.js";

const {Pool} = pg;
const db = new Pool(configDB);

export default {
    getAllUsers: async () => {
                    const result = await db.query(`SELECT * FROM users`)
                    return result.rows
                },

    getUserByID: async (id) => {
                    const result = await db.query(`  
                    SELECT * FROM users
                    WHERE users.id = ${id}   
                    `)
                    return result.rows[0]
                },
    getSubscribersByID: async (id, order_by='id', order_type='asc') => {
                            const result = await db.query(`  
                            SELECT users.id, users.first_name, users.gender FROM subscriptions
                            INNER JOIN users
                            ON users.id = subscriptions.subscriberID
                            WHERE subscriptions.userID = ${id} 
                            ORDER BY users.${order_by} ${order_type}   
                            `)
                            return result.rows
                        },
    getSubscriptionsByID: async (id, order_by='id', order_type='asc') => {
                            const result = await db.query(`  
                            SELECT users.id, users.first_name, users.gender FROM subscriptions
                            INNER JOIN users
                            ON users.id = subscriptions.userID
                            WHERE subscriptions.subscriberID = ${id} 
                            ORDER BY users.${order_by} ${order_type}           
                            `)
                            return result.rows
                        },
    getFriendsByID: async (id, order_by='id', order_type='asc') => {
                        const result = await db.query(`
                        SELECT subscribers.id, subscribers.first_name, subscribers.gender FROM
                        (SELECT users.id, users.first_name, users.gender FROM subscriptions
                        INNER JOIN users
                        ON users.id = subscriptions.subscriberId
                        WHERE subscriptions.userID = ${id}) as subscribers
                        INNER JOIN
                        (SELECT users.first_name FROM subscriptions
                        INNER JOIN users
                        ON users.ID = subscriptions.userId
                        WHERE subscriptions.subscriberId = ${id}) as subscriptions   
                        ON subscribers.first_name = subscriptions.first_name
                        ORDER BY subscribers.${order_by} ${order_type}  
                        `)
                        return result.rows
                    },
    getNotFollowing: async () => {
                        const result = await db.query(`
                        SELECT users.id, users.first_name, users.gender FROM users
                        LEFT JOIN subscriptions 
                        ON users.id = subscriptions.subscriberId
                        WHERE subscriptions.subscriberId IS NULL`)
                        return result.rows
                    },
    getMaxFollowing: async () => {
                        const result = await db.query(`
                        SELECT users.id, users.first_name, users.gender, COUNT(subscriptions.userId) 
                        as number_of_subscriptions FROM users  
                        INNER JOIN subscriptions 
                        ON users.id = subscriptions.subscriberId 
                        GROUP BY users.id, users.first_name, users.gender 
                        ORDER BY number_of_subscriptions desc 
                        LIMIT 5`)
                        return result.rows
                    }
}
