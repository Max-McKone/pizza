// region import

import {html} from 'hyperapp'

// components

import Price from './price'

// endregion

// region MenuItem

export default ({description, id, name, price}) => html`
	<div class="card">
		<img class="card-img-top img-fluid" src="http://lorempizza.com/512/256/${id}"/>
		<div class="card-block">
			<h4 class="card-title">${name}</h4>
			<p class="card-text">${description}</p>
		</div>
		<div class="card-footer flex-between">
			${Price(price)}
			<a href="/menu/${id}/customize" class="btn btn-success animate">Customize</a>
		</div>
	</div>`

// endregion
