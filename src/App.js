import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	
	constructor() {
		super();
		this.state = {i: 0};
		setInterval(() => {
			this.setState( prevState => {
				return {i: prevState.i + 1};
			});
		}, 1000)
	}
	
	render() {
		
		
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React {this.state.i}</h1>
				</header>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
			</div>
		);
	}
}

export default App;
