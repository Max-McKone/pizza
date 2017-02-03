// region import

import {html} from 'hyperapp'

// endregion

// region MenuItem

export default ({name, description, id}) => html`
	<div class="card">
		<img class="card-img-top img-fluid" src="http://lorempizza.com/380/240/${id}"/>
		<div class="card-block">
			<h4 class="card-title">${name}</h4>
			<p class="card-text">${description}</p>
		</div>
		<div class="card-footer flex-end">
			<a href="/menu/customize/${id}" class="btn btn-success animate">Add to cart</a>
		</div>
	</div>`

// endregion
