// region import

import {html} from 'hyperapp'

// endregion

// region MenuItem

export default ({name, description, add}) => html`
	<div class="card">
		<img class="card-img-top" src="http://lorempizza.com/380/240/${name}" alt="Card image cap"/>
		<div class="card-block">
			<h4 class="card-title">${name}</h4>
			<p class="card-text">${description}</p>
		</div>
		<div class="card-footer" style=${{
			display: 'flex',
			justifyContent: 'center'
		}}>
			<button class="btn btn-success animate" onclick=${({target: {classList}}) => {
				classList.add('custom-click')
				setTimeout(() => classList.remove('custom-click'), 100)
				add()
			}}>Add to cart</button>
		</div>
	</div>`

// endregion
