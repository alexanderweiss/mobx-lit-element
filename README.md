# mobx-lit-element
 MobX @observer decorator for LitElement, like that for React

## Getting started
Install using
~~~
npm install mobx-lit-element --save
~~~
or
~~~
yard add mobx-lit-element
~~~

And then simply decorate your custom elements:

~~~js
import { LitElement, html, customElement } from 'lit-element'
import { observer } from 'mobx-lit-element'
import userStore from './user-store'

@customElement('simple-greeting')
@observer
export class SimpleGreeting extends LitElement {
 static get properties () {
  return {
   greeting: { type: String }
  }
 }
 render () {
  return html`<p>${greeting}, ${userStore.currentUser.name}!</p>`;
 }
}
~~~

__Note:__ It's not possible to use both MobX decorators and LitElement's `@property` decorator. LitElement uses the newer decorator proposal, which is not supported by MobX (see https://mobx.js.org/best/decorators.html#enabling-decorator-syntax).
