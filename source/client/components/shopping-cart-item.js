// region import

import {html} from 'hyperapp'

// endregion

// region ShoppingCartItem

export default ({name, amount, price, remove}) => html`
	<tr>
		<td>${name}</td>
		<td>${amount}</td>
		<td>${price}</td>
		<td>
			<div class="btn btn-danger" onclick=${remove}>remove</div>
		</td>
	</tr>`

// endregion
