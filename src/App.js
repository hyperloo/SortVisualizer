import React from "react";
import Visualization from "./components/Visualizations";

import "./App.scss";

class App extends React.Component {
	state = {
		dark: 0,
	};

	componentDidMount() {
		const theme = localStorage.getItem("theme");
		if (theme) {
			this.setState({ dark: theme === "1" ? 1 : 0 });
		}
	}

	toggle = () => {
		const { dark } = this.state;
		localStorage.setItem("theme", dark ? "0" : "1");
		this.setState({ dark: !dark });
	};

	render() {
		const { dark } = this.state;
		return (
			<div
				className={`App ${dark ? "dark" : "light"}`}
				style={{ color: dark ? "white" : "#1a2038" }}
			>
				<Visualization dark={dark} toggle={this.toggle} />
			</div>
		);
	}
}

export default App;
