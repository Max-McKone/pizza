// region import

import http from 'http'
import spirit from 'spirit'
import route from 'spirit-router'

// internal

import config from '../../config.json'

// routes

import * as error from './routes/error'
import {html, js} from './routes/static'

// endregion

// region alias

const {listen: {host, port}, prefix} = config

// endregion

// region routes

const app = route.define([
	// #region app

	route.get('/', html),

	// #endregion

	// #region static

	route.get('/main.js', js),

	// #endregion

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
