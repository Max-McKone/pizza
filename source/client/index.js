// region import

import {app, html} from 'hyperapp'

// endregion

// region navbar

const nav = ({active, shoppingCartItemCount}) => html`
<nav class="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
	<div class="container">
		<button class="navbar-toggler navbar-toggler-right">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item">
					<a class="nav-link ${active === '/' ? 'active' : ''}" href="/">Home</a>
				</li>
				<li class="nav-item">
					<a class="nav-link ${active === '/menu' ? 'active' : ''}" href="/menu">Menu</a>
				</li>
			</ul>
			<ul className="navbar-nav">
				<li className="nav-item">
					<a href="/cart" className="nav-link ${active === '/cart' ? 'active' : ''}">Shopping Cart <span class="badge badge-pill badge-default">${shoppingCartItemCount}</span></a>
				</li>
			</ul>
		</div>
	</div>
</nav>`

// endregion

// region ShoppingCartItem

const ShoppingCartItem = ({name, amount, price, id}) => html`
	<tr>
		<td>${name}</td>
		<td>${amount}</td>
		<td>${price}</td>
		<td>button</td>
	</tr>`

// endregion

// region card

const card = ({name, description, add}) => html`
	<div class="card">
		<img class="card-img-top" src="https://placekitten.com/128/128" alt="Card image cap"/>
		<div class="card-block">
			<h4 class="card-title">${name}</h4>
			<p class="card-text">${description}</p>
			<button class="btn btn-success" onclick=${add}>Add to cart</button>
		</div>
		<div class="card-footer">
			<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
		</div>
	</div>`

// endregion

window.addEventListener('load', () => {
	app({
		model: {
			cart: []
		},
    update: {
      addToCart: ({cart, ...rest}, item) => ({cart: [...cart, item], ...rest})
    },
		view: {
			'/': model => html`
				<div>
					${nav({active: '/', shoppingCartItemCount: model.cart.length})}
					<div class="jumbotron" style=${{borderRadius: 0}}>
						<div class="container">
							<h1>Navbar example</h1>
							<p class="lead">This example is a quick exercise to illustrate how fixed to top navbar works. As you scroll, it will remain fixed to the top of your browser's viewport.</p>
						</div>
					</div>
				</div>`,
		'/menu': (model, actions) => html`
			<div>
				${nav({active: '/menu', shoppingCartItemCount: model.cart.length})}
				<div class="container">
					<div class="card-deck">
						${card({name: "Pizza 1", description: "blablabla", add: () => actions.addToCart(1)})}
						${card({name: "Pizza 2", description: "blablabla", add: () => actions.addToCart(2)})}
						${card({name: "Pizza 3", description: "blablabla", add: () => actions.addToCart(3)})}
					</div>
				</div>
			</div>`,
		'/cart': model => html`
			<div>
				${nav({active: '/cart', shoppingCartItemCount: model.cart.length})}
				<div class="container">
					<table class="table">
					  <thead class="thead-inverse">
					    <tr>
					      <th>Name</th>
					      <th>Amount</th>
					      <th>Price</th>
								<th>Action</th>
					    </tr>
					  </thead>
					  <tbody>
							${ShoppingCartItem({name: "Pizza 1", amount: "1", price: 10, id: 0})}
					  </tbody>
					</table>
				</div>
			</div>`
	}})
})
