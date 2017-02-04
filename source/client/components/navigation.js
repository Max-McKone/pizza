// region import

import {html} from 'hyperapp'

// endregion

// region Navigation

export default ({active, shoppingCartItemCount}) => html`
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
					${active === '/order' ? html`
						<li class="nav-item">
							<a class="nav-link active" href="/order">Order</a>
						</li>
					` : ''}
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
