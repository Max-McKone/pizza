// region import

import {html} from 'hyperapp'

// commponents

import Address from '../components/address'

// endregion

// region Main

export default ({orders}) => html`
	<div>
		<div class="jumbotron jumbotron-fix">
			<div class="container">
				<h1>Order List</h1>
			</div>
		</div>
		<div class="container">
			<h3>Baking</h3>
			<table>
				<thead>
					<th>#</th>
					<th>Address</th>
					<th>Actions</th>
				</thead>
				${orders.map(order => html`
					<tbody>
						<tr>
							<td>
								
							</td>
							<td>
								${Address(order.checkout)}
							</td>
							<td>
								<button class="btn btn-success">Finish</button>
							</td>
						</tr>
					</tbody>
				`)}
			</table>
			<h3>Finished</h3>
			<table>
				thead>th*3
			</table>
		</div>
	</div>`

// endregion
