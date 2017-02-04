// region actions

export default {
	addToCart: ({cart, ...rest}, item) => ({
		cart: [...cart, item],
		...rest,
		customize: {
			toppings: {},
			size: 'xl'
		}
	}),
	removeFromCart: ({cart, ...rest}, toRemove) => ({
		cart: cart.filter((_, index) => index !== toRemove),
		...rest
	}),
	customizeSize: ({customize, ...rest}, size) => ({
		customize: {
			...customize,
			size
		},
		...rest
	}),
	customizeAddTopping: ({customize, ...rest}, topping) => ({
		customize: {
			...customize,
			toppings: {
				...customize.toppings,
				[topping]: customize.toppings[topping] ? customize.toppings[topping] + 1 : 1
			}
		},
		...rest
	}),
	customizeRemoveTopping: ({customize, ...rest}, topping) => {
		const toppings = {...customize.toppings}

		if (toppings[topping] > 1)
			toppings[topping]--
		else
			delete toppings[topping]

		return {
			customize: {
				...customize,
				toppings
			},
			...rest
		}
	},
	modifyCheckout: ({checkout, ...rest}, [key, value]) => ({
		checkout: {
			...checkout,
			[key]: value
		},
		...rest
	}),
	orderStarted: ({isLoading, ...rest}) => ({
		isLoading: true,
		...rest
	}),
	orderSuccessful: ({isLoading, cart, ...rest}) => ({
		cart: [],
		isLoading: false,
		...rest
	}),
	orderFailed: ({isLoading, ...rest}) => {
		window.alert('FAILED')
		return {
			isLoading: false,
			...rest
		}

	}

}

// endregion
