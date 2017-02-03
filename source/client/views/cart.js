// region import

import {html} from 'hyperapp'

// components

import Navigation from '../components/navigation'
import Price from '../components/price'
import CartItem from '../components/cart-item'

// internal

import pizzaPrice from '../utilities/pizza-price'

// endregion

// region Cart

export default ({cart, checkout, isLoading}, {modifyCheckout, placeOrder, removeFromCart}) => html`
	<div>
		${Navigation({
			active: '/cart',
			CartItemCount: cart.length
		})}
		<div class="jumbotron jumbotron-fix">
			<div class="container">
				<h1>Shopping Cart</h1>
				<div class="form-group row">
					<span class="col-2 col-form-label">Name</span>
					<div class="col-10">
						<input class="form-control" oninput=${e => modifyCheckout(['name', e.target.value])} value=${checkout.name} type="text" placeholder="Doreen König"/>
					</div>
				</div>
				<div class="form-group row">
					<span class="col-2 col-form-label">Telephone Number</span>
					<div class="col-10">
						<input class="form-control" oninput=${e => modifyCheckout(['phone', e.target.value])} value=${checkout.phone} type="tel" placeholder="+498032919067"/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<p>
							<label class="form-check-label">
								<input checked=${checkout.to === 'branch'} type="radio" name="size" class="form-check-input" onclick=${() => modifyCheckout(['to', 'branch'])}/>
								To Branch
							</label>
						</p>
						<address>
							<strong>Dank Pizza #42</strong><br />
							Gubener Straße 71<br />
							83081 Riedering<br />
							Germany
						</address>
					</div>
					<div className="col-md-6">
						<p>
							<label class="form-check-label">
								<input checked=${checkout.to === 'custom'} type="radio" name="size" class="form-check-input" onclick=${() => modifyCheckout(['to', 'custom'])}/>
								Custom Address
							</label>
						</p>
						<div class="form-group row">
							<span class="col-3 col-form-label">Street</span>
							<div class="col-9">
								<input class="form-control" oninput=${e => modifyCheckout(['street', e.target.value])} value=${checkout.street} type="text" placeholder="Gubener Straße 71"/>
							</div>
						</div>
						<div class="form-group row">
							<span class="col-3 col-form-label">ZIP Code</span>
							<div class="col-9">
								<input class="form-control" oninput=${e => modifyCheckout(['zipCode', e.target.value])} value=${checkout.zipCode} type="number" placeholder="83081"/>
							</div>
						</div>
						<div class="form-group row">
							<span class="col-3 col-form-label">City</span>
							<div class="col-9">
								<input class="form-control" oninput=${e => modifyCheckout(['city', e.target.value])} value=${checkout.city} type="tel" placeholder="Riedering"/>
							</div>
						</div>
						<div class="form-group row">
							<span class="col-3 col-form-label">Country</span>
							<div class="col-9">
								<input class="form-control" oninput=${e => modifyCheckout(['country', e.target.value])} value=${checkout.country} type="text" placeholder="Germany"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="card-columns">
				${cart.map((item, index) =>
					CartItem({
						...item,
						remove: () => removeFromCart(index)
					})
				)}
			</div>
		</div>
		<div class="jumbotron">
			<div class="container flex-between">
				<h3>
					<strong>Total</strong>: ${Price(cart
						.map(pizza => pizzaPrice(pizza))
						.reduce((a, b) => a + b, 0)
					)}
				</h3>
				<button class="btn btn-success" disabled=${isLoading} onclick=${placeOrder}>Place Order</button>
			</div>
		</div>
	</div>`

// endregion
