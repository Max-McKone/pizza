// region import

import Datastore from 'nedb'

// endregion

// region orders

export const orders = new Datastore({
	filename: `${__dirname}/../../orders.nedb`,
	autoload: true
})

// endregion
