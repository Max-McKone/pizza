// region import

import {html} from 'hyperapp'

// endregion

// region Price

export default price => html`
	<span>
		$${(price/100).toFixed(2)}
	</span>`

// endregion
