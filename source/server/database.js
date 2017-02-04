import Datastore from 'nedb'

export const orders = new Datastore({filename: `${__dirname}/../../orders.nedb`, autoload: true})
