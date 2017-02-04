import {orders} from '../database'
import {internalServerError} from './error'
export default (body) => new Promise((resolve, reject) => {
  body = JSON.parse(body)
  console.log(body)

  orders.insert({body}, (error, newDocs) => {
    if (error) return resolve(internalServerError)

    return resolve('success')
  })
})
