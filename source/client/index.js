// region import

import {app, html} from 'hyperapp'

// endregion

window.addEventListener('load', () => {
	app({
		model: "Hi.",
		view: model => html`<h1>${model}</h1>`
	})
})
