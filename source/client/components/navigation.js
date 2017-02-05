// region import

import {html} from 'hyperapp'

// endregion

// region Navigation

export default ({active, shoppingCartItemCount}) => html`
	<div class="custom-navbar">
		<div className="container flex-between">
			<div>
				<a class="${active === '/' ? 'active' : ''}" href="/">Home</a>
				<a class="${active === '/menu' ? 'active' : ''}" href="/menu">Menu</a>
				${active === '/order' ? html`
					<a class="active" href="/order">Order</a>
				` : ''}
			</div>
			<div>
				<a style=${{marginRight: 0}} href="/cart" className="${active === '/cart' ? 'active' : ''}">Shopping Cart <span class="badge badge-pill badge-default">${shoppingCartItemCount}</span></a>
			</div>
		</div>
	</div>`

// endregion
