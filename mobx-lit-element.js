import { Reaction } from 'mobx'

export function observer (element) {
	return class extends element {

		update () {
			let result
			this._mobxReaction.track(() => { result = super.update() })
			return result
		}

		connectedCallback () {
			if (super.connectedCallback) super.connectedCallback()
			this._mobxReaction = new Reaction(`${this.constructor.name}.update()`, () => { this.requestUpdate() })
		}

		disconnectedCallback () {
			if (super.disconnectedCallback) super.disconnectedCallback()
			this._mobxReaction.dispose()
		}
		
	}
}