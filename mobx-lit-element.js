import { Reaction } from 'mobx'

export function observer (element) {
	return class extends element {
		update (...args) {
			let result
			this._mobxReaction.track(() => { result = super.update(...args) })
			return result
		}

		connectedCallback () {
			if (super.connectedCallback) super.connectedCallback()
			this._mobxReaction = new Reaction(
				`${this.constructor.name || this.nodeName}.update()`,
				() => this.requestUpdate()
			)
			if (this.hasUpdated) this.requestUpdate()
		}

		disconnectedCallback () {
			if (super.disconnectedCallback) super.disconnectedCallback()
			this._mobxReaction.dispose()
		}
	}
}