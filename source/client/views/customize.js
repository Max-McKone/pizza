// region import

import {html} from 'hyperapp'

// components

import Navigation from '../components/navigation'
import Price from '../components/price'

// internal

import menu from '../../../menu'
import pizzaPrice from '../utilities/pizza-price'

// endregion

// region Toppings

const Toppings = (customize, {customizeAddTopping}) => html`
	<ul class="list-group">
		${Object
			.keys(menu.toppings)
			.map(id => ({...menu.toppings[id], id}))
			.map(({name, price, id}) => html`
				<li class="list-group-item flex-between">
					${name}
					${Price(price)}
					<button onclick=${() => customizeAddTopping(id)} class="btn btn-sm btn-success">+</button>
				</li>`)
		}
	</ul>`

// endregion

// region Sizes

const Sizes = ({size: selectedSize}, {customizeSize}) => Object
	.keys(menu.sizes)
	.map(id => ({...menu.sizes[id], id}))
	.map(({name, price, size, id}) => html`
		<label class="form-check-label" style=${{
			width: '100%'
		}}>
			<input type="radio" checked=${selectedSize === id} onclick=${() => customizeSize(id)} name="size" class="form-check-input"/>
			${name} ${Price(price)} ${size}cm
		</label>
	`)

// endregion

// region PriceTable

const PriceTable = ({pizza, size, toppings}, {addToCart, customizeRemoveTopping}) => html`
	<table class="table">
		<tbody>
			<tr>
				<td>${menu.pizzas[pizza].name}</td>
				<td>${Price(menu.pizzas[pizza].price)}+${Price(menu.sizes[size].price)}</td>
				<td>${menu.sizes[size].name}</td>
			</tr>
			${Object
				.keys(toppings)
				.map(id => ({amount: toppings[id], id}))
				.map(({id, amount}) => html`
					<tr>
						<td>${menu.toppings[id].name}</td>
						<td>${Price(menu.toppings[id].price)}</td>
						<td style=${{
							display: 'flex',
							justifyContent: 'space-between'
						}}>
							x${amount}
							<button class="btn btn-sm" onclick=${() => customizeRemoveTopping(id)}>-</button>
						</td>
					</tr>`)
			}
		</tbody>
		<tfoot>
			<tr>
				<td>Total</td>
				<td>
					${Price(pizzaPrice({pizza, size, toppings}))}
				</td>
				<td>
					<button style=${{
						width: '100%'
					}} class="btn btn-success btn-sm" onclick=${() => addToCart({
						pizza,
						size,
						toppings
					})}>Add To Cart</button>
				</td>
			</tr>
		</tfoot>
	</table>`

// endregion

// region Customize

export default ({cart, customize}, actions, {id}) => html`
	<div>
		${Navigation({
			active: '/menu',
			shoppingCartItemCount: cart.length
		})}
		<div class="jumbotron jumbotron-fix">
			<div class="container" style=${{
				display: 'flex',
				justifyContent: 'flex-start',
				alignItems: 'center'
			}}>
				<div class="pizza" style=${{backgroundImage: `url(http://lorempizza.com/512/256/${id})`}}></div>
				<div style=${{
					paddingLeft: '32px'
				}}>
					<h1>${menu.pizzas[id].name}</h1>
					<p>${menu.pizzas[id].description}</p>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="row">
				<div class="col-md-2">
					<h3>Size</h3>
					${Sizes(customize, actions)}
				</div>
				<div class="col-md-4">
					<h3>Toppings</h3>
					${Toppings(customize, actions)}
				</div>
				<div class="col-md-6">
					<h3>Price</h3>
					${PriceTable({...customize, pizza: id}, actions)}
				</div>
			</div>
		</div>
	</div>`

// endregion
