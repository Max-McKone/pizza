// region actions

export default {
	addToCart: ({cart, ...rest}, item) => ({
		cart: [...cart, item],
		...rest,
		customize: {
			toppings: {},
			size: 'xl',
			secondHalf: 'none'
		}
	}),
	removeFromCart: ({cart, ...rest}, toRemove) => ({
		cart: cart.filter((_, index) => index !== toRemove),
		...rest
	}),
	customizeSize: ({customize, ...rest}, size) => ({
		customize: {
			...customize,
			size,
			secondHalf: 'none',
			toppings: {}
		},
		...rest
	}),
	customizeSetSecondHalf: (state, value) => ({
		...state,
		customize: {
			...state.customize,
			secondHalf: state.customize.size === 'xl' ? value : 'none'
		}
	}),
	customizeAddTopping: ({customize, ...rest}, topping) => {
		const amount = Object
			.keys(customize.toppings)
			.map(key => customize.toppings[key])
			.reduce((a, b) => a + b, 0)

		// return old state if no more toppings are possible
		if (amount >= ({
			xl: 5,
			md: 3,
			sm: 2
		})[customize.size]) return {
			customize,
			...rest
		}

		// add topping to toppings
		return {
			customize: {
				...customize,
				toppings: {
					...customize.toppings,
					[topping]: customize.toppings[topping] ? customize.toppings[topping] + 1 : 1
				}
			},
			...rest
		}
	},
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
	orderStarted: state => ({
		...state,
		isLoading: true
	}),
	orderSuccessful: (state, {body}) => ({
		...state,
		cart: [],
		order: body,
		isLoading: false
	}),
	orderFailed: state => {
		window.alert('Something went wrong. :(')
		return {
			...state,
			isLoading: false
		}

	}

}

// endregion
