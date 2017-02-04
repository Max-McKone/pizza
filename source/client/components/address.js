// region import

import {html, app} from 'hyperapp'

// endregion

// region Address

export default ({name, street, zipCode, city, country, phone}) => html`
	<address>
		<strong>${name}</strong><br />
		${street}<br />
		${zipCode} ${city}<br />
		${country}<br />
		${phone}
	</address>`

// endregion
