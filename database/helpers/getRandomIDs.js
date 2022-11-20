/**
 * Повертає масив випадкових чисел(ID) в діапазоні від 1 до numberOfUsers довжиною subscribersCount
 *
 * @param {number} subscribersCount Довжина бажаного масиву.
 * @param {number} numberOfUsers к-ть користувачів в БД.
 * @return {number[]} IDs, возведённое в n-ную степень.
 */
function getRandomIDs(subscribersCount, numberOfUsers){
    let IDs = []
    for (let i = 0; i<subscribersCount; i++){
        const ID = Math.floor(Math.random()*(numberOfUsers-1))+1
        if (IDs.includes(ID)) i--
        else IDs.push(ID)
    }
    return IDs
}
export default getRandomIDs