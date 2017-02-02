export default {
	addToCart: ({cart, ...rest}, item) => ({
		cart: [...cart, item],
		...rest
	}),
	removeFromCart: ({cart, ...rest}, toRemove) => ({
		cart: cart.filter((_, index) => index !== toRemove),
		...rest
	})
}
