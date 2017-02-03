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
		<div class="jumbotron" style=${{borderRadius: 0}}>
			<div class="container">
				<h1>Super Pizza Service 5000</h1>
				<p class="lead">
					Lorem Ipsum is the single greatest threat. We are not - we are not keeping up with other websites. I was going to say something extremely rough to Lorem Ipsum, to its family, and I said to myself, "I can't do it. I just can't do it. It's inappropriate. It's not nice." Lorem Ipsum is the single greatest threat. We are not - we are not keeping up with other websites. Look at these words. Are they small words? And he referred to my words - if they're small, something else must be small. I guarantee you there's no problem, I guarantee.
					This placeholder text is gonna be HUGE. When other websites give you text, they’re not sending the best. They’re not sending you, they’re sending words that have lots of problems and they’re bringing those problems with us. They’re bringing mistakes. They’re bringing misspellings. They’re typists… And some, I assume, are good words. You're telling the enemy exactly what you're going to do. No wonder you've been fighting Lorem Ipsum your entire adult life. I’m the best thing that ever happened to placeholder text. I think the only card she has is the Lorem card.
				</p>
			</div>
		</div>
	</div>`

// endregion
