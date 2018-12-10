import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "mobx-react";
import store from './store'

const render = Component => {
	const { ...storesArray } = store;
	return ReactDOM.render(
		<Provider {...storesArray}>
			<Component />
		</Provider>,
	document.getElementById('root'),);
}
	

render(App);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
