// region import

import timespan from 'readable-timespan'
import {html} from 'hyperapp'

// commponents

import Address from '../components/address'

// endregion

// region Order

const Order = ({checkout, _id, status, setStatus, time}) => html`
	<tr>
		<td>
			<a href="/cook/detail/${_id}">${_id}</a>
		</td>
		<td>
			${Address(checkout)}
		</td>
		<td>
			<span className="badge badge-pill badge-default">${timespan.parse(Date.now() - time)} ago</span>
		</td>
		<td>
			${status === 'baking' ? html`
				<button class="btn btn-success" onclick=${() => setStatus({_id, status: 'finished'})}>Finish</button>
			` : html`
				<button class="btn btn-success" onclick=${() => setStatus({_id, status: 'baking'})}>Undo Finish</button>
			`}
		</td>
	</tr>`

// endregion

// region Main

export default ({orders}, {setStatus}) => html`
	<div>
		<div class="jumbotron jumbotron-fix">
			<div class="container">
				<h1>Order List</h1>
			</div>
		</div>
		<div class="container">
			<h3>Baking</h3>
			<table class="table">
				<thead>
					<th>#</th>
					<th>Address</th>
					<th>Time</th>
					<th>Actions</th>
				</thead>
				<tbody>
					${orders
						.filter(({status}) => status === 'baking')
						.map(order => Order({
							...order,
							setStatus
						})
					)}
				</tbody>
			</table>
			<h3>Finished</h3>
			<table class="table">
				<thead>
					<th>#</th>
					<th>Address</th>
					<th>Time</th>
					<th>Actions</th>
				</thead>
				<tbody>
					${orders
						.filter(({status}) => status !== 'baking')
						.map(order => Order({
							...order,
							setStatus
						})
					)}
				</tbody>
			</table>
		</div>
	</div>`

// endregion
