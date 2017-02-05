// region import

import body from 'spirit-body'
import http from 'http'
import route from 'spirit-router'
import spirit from 'spirit'

// internal

import config from '../../config'
import socket from './socket'

// routes

import * as error from './routes/error'
import {htmlCook, htmlUser} from './routes/static'
import saveOrder from './routes/save-order'

// endregion

// region alias

const {listen: {host, port}, prefix} = config

// endregion

// region routes

const app = route.define([
	// #region user

	route.get('/', htmlUser),
	route.get('/menu', htmlUser),
	route.get('/menu/*', htmlUser),
	route.get('/cart', htmlUser),
	route.get('/order', htmlUser),

	// #endregion

	// #region cook

	route.get('/cook*', htmlCook),

	// #endregion

	// #region API

	route.wrap(route.post('/api/v1/order', ['body'], saveOrder), [body]),

	// #endregion

	// #region icons

	// route.get('/favicon.ico', favicon),

	// #endregion

	// #region other

	route.any('*', error.notFound)

	// #endregion
])

// endregion

// region start

const server = http.createServer(spirit.node.adapter(app))

server.listen({host, port}, () =>
	console.info(`listening on http://${host}:${port}`)
)

socket(server)

// endregion
