// region import

import {app, html} from 'hyperapp'

// endregion

// region Address

export default ({city, country, name, phone, street, zipCode}) => html`
	<address>
		<strong>${name}</strong><br />
		${street}<br />
		${zipCode} ${city}<br />
		${country}<br />
		${phone}
	</address>`

// endregion
