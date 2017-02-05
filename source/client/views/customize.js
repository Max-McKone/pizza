// region import

import {html} from 'hyperapp'

// components

import Navigation from '../components/navigation'
import Price from '../components/price'

// internal

import menu from '../../../menu'
import pizzaPrice from '../utilities/pizza-price'
import getMostExpensivePizza from '../utilities/get-most-expensive-pizza'

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

const PriceTable = ({pizza, size, toppings, secondHalf}, {addToCart, customizeRemoveTopping}) => html`
	<table class="table">
		<tbody>
			<tr>
				<td>${[pizza, secondHalf]
					.filter(item => item !== 'none')
					.map(pizza => menu.pizzas[pizza].name)
					.join(' / ')
				}</td>
				<td>${Price(getMostExpensivePizza([pizza, secondHalf].filter(item => item !== 'none')))}+${Price(menu.sizes[size].price)}</td>
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
					${Price(pizzaPrice({pizzas: [pizza, secondHalf].filter(item => item !== 'none'), size, toppings}))}
				</td>
				<td>
					<button style=${{
						width: '100%'
					}} class="btn btn-success btn-sm" onclick=${() => addToCart({
						pizzas: [pizza, secondHalf].filter(item => item !== 'none'),
						size,
						toppings
					})}>Add To Cart</button>
				</td>
			</tr>
		</tfoot>
	</table>`

// endregion

// region Customize

export default ({cart, order, customize}, actions, {pizza}) => html`
	<div>
		${Navigation({
			active: '/menu',
			shoppingCartItemCount: cart.length,
			order
		})}
		<div class="jumbotron jumbotron-fix">
			<div class="container" style=${{
				display: 'flex',
				justifyContent: 'flex-start',
				alignItems: 'center'
			}}>
				<div class="pizza" style=${{backgroundImage: `url(http://lorempizza.com/512/256/${pizza})`}}></div>
				<div style=${{
					paddingLeft: '32px'
				}}>
					<h1>${menu.pizzas[pizza].name}</h1>
					<p>${menu.pizzas[pizza].description}</p>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="row">
				<div class="col-md-2">
					<h3>Size</h3>
					${Sizes(customize, actions)}
					${customize.size === 'xl' ? html`
						<div>
							<br /><br />
							<h4>Second Half</h4>
							<select value=${customize.secondHalf} oninput=${e => actions.customizeSetSecondHalf(e.target.value)} class="form-control">
								<option value="none">None</option>
								${Object
									.keys(menu.pizzas)
									.map(key => html`
										<option value=${key}>${menu.pizzas[key].name}</option>
									`)
								}
							</select>
						</div>
					` : null}
				</div>
				<div class="col-md-4">
					<h3>Toppings</h3>
					${Toppings(customize, actions)}
				</div>
				<div class="col-md-6">
					<h3>Price</h3>
					${PriceTable({...customize, pizza}, actions)}
				</div>
			</div>
		</div>
	</div>`

// endregion
