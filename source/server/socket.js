// region import

import ssio from 'socket.io'

// internal

import {orders} from './database'

// endregion

// region variables

let io

// endregion

// region update

export const update = () => io ? orders.find({}, (error, orders) =>
	io.emit('update', orders)
) : null

// endregion

// region server

export default httpServer => {
	io = ssio(httpServer)
	io.on('connection', client => {
		update()
		client.on('set-status', ({_id, status}) => {
			orders.update({_id}, {$set: {status}}, update)
		})
	})
}

// endregion
