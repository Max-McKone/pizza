// region import

import body from 'spirit-body'
import http from 'http'
import route from 'spirit-router'
import spirit from 'spirit'

// internal

import config from '../../config.json'

// routes

import * as error from './routes/error'
import {html} from './routes/static'
import saveOrder from './routes/save-order'

// endregion

// region alias

const {listen: {host, port}, prefix} = config

// endregion

// region routes

const app = route.define([
	// #region app

	route.get('/', html),
	route.get('/menu', html),
	route.get('/menu/*', html),
	route.get('/cart', html),

	// #endregion

	// region API

	route.wrap(route.post('/api/v1/order', ['body'], saveOrder), [body]),

	// endregion

	// region#icons

	// route.get('/favicon.ico', favicon),

	// #endregion

	// #region other

	route.any('*', error.notFound)

	// #endregion
])

// endregion

// region start

http.createServer(spirit.node.adapter(app)).listen({host, port}, () =>
	console.info(`listening on http://${host}:${port}`)
)

// endregion
