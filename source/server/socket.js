// region import

import ssio from 'socket.io'

// internal

import {orders} from './database'

// endregion

// region server

export default httpServer => {
	const io = ssio(httpServer)
	io.on('connection', client => {
		console.log('connection!')
		orders.find({}, (error, orders) => {
			console.log(orders)
			io.emit('update', orders)
		})

		client.on('set-status', ({_id, status}) => {
			orders.update({_id}, {$set: {status}})
			orders.find({}, (error, orders) => {
				console.log(orders)
				io.emit('update', orders)
			})
		})
	})
}

// endregion
