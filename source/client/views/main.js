// region import

import {html} from 'hyperapp'

// components

import Navigation from '../components/navigation'

// endregion

// region Main

export default ({cart}) => html`
	<div>
		${Navigation({
			active: '/',
			shoppingCartItemCount: cart.length
		})}
		<div class="jumbotron jumbotron-fix">
			<div class="container">
				<h1>Dank Pizza</h1>
				<p class="lead">
					The best pizza in the history of DotA.
				</p>
			</div>
		</div>
		<div class="container">
			<table class="table">
				<thead class="thead-inverse">
					<th>Name</th>
					<th>Student Number</th>
					<th>GitHub</th>
				</thead>
				<tbody>
					<tr>
						<td>Benjamin Braun</td>
						<td>T</td>
						<td><a href="https://github.com/fattomcat">@fattomcat</a></td>
					</tr>
					<tr>
						<td>Max</td>
						<td>T</td>
						<td><a href="https://github.com/max-moolato">@max-moolato</a></td>
					</tr>
					<tr>
						<td>Florian Wendelborn</td>
						<td>574546</td>
						<td><a href="https://github.com/dodekeract">@dodekeract</a></td>
					</tr>
					<tr>
						<td>Hubertus Weber</td>
						<td>575253</td>
						<td><a href="https://github.com/hubertusweber">@hubertusweber</a></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>`

// endregion
