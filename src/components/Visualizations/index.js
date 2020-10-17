import React, { Component } from "react";
import mergeSort from "../Algos/mergeSort";
import bubbleSort from "../Algos/bubbleSort";
import selectionSort from "../Algos/selectionSort";
import insertionSort from "../Algos/insertionSort";
import quickSort from "../Algos/quickSort";
import "./style.scss";

function randomCreator(no) {
	let arr = [];
	let min = 50,
		max = Math.floor(window.innerHeight * 0.725);

	for (var i = 0; i < no; i++) {
		arr.push(Math.floor(Math.random() * (max - min) + min));
	}
	return arr;
}

class Visualizations extends Component {
	state = {
		arr: [],
		tim: 10,
		nos: 50,
		max: 170,
		started: false,
		curSort: null,
	};

	sorts = [
		{
			name: "Bubble Sort",
			sort: bubbleSort,
			color: "#f44336",
			complexity: {
				time: (
					<>
						Best: Ω(n) &nbsp;&nbsp; Average: θ(n<sup>2</sup>) &nbsp;&nbsp;
						Worst: O(n<sup>2</sup>)
					</>
				),
				space: <>O(1)</>,
			},
		},
		{
			name: "Selection Sort",
			sort: selectionSort,
			color: "#ff9800",
			complexity: {
				time: (
					<>
						Best: Ω(n<sup>2</sup>) &nbsp;&nbsp; Average: θ(n<sup>2</sup>)
						&nbsp;&nbsp; Worst: O(n<sup>2</sup>)
					</>
				),
				space: <>O(1)</>,
			},
		},
		{
			name: "Insertion Sort",
			sort: insertionSort,
			color: "#2196f3",
			complexity: {
				time: (
					<>
						Best: Ω(n) &nbsp;&nbsp; Average: θ(n<sup>2</sup>) &nbsp;&nbsp;
						Worst: O(n<sup>2</sup>)
					</>
				),
				space: <>O(1)</>,
			},
		},
		{
			name: "Merge Sort",
			sort: mergeSort,
			color: "#388e3c",
			complexity: {
				time: (
					<>
						Best: Ω(nlogn) &nbsp;&nbsp; Average: θ(nlogn) &nbsp;&nbsp; Worst:
						O(nlogn)
					</>
				),
				space: <>O(n)</>,
			},
		},
		{
			name: "Quick Sort",
			sort: quickSort,
			color: "#dc004e",
			complexity: {
				time: (
					<>
						Best: Ω(nlogn) &nbsp;&nbsp; Average: θ(nlogn) &nbsp;&nbsp; Worst:
						O(n<sup>2</sup>)
					</>
				),
				space: <>O(1)</>,
			},
		},
	];

	async componentDidMount() {
		let loc = localStorage.getItem("time")
			? localStorage.getItem("time")
			: "50";
		let w = window.innerWidth;
		let max;
		if (w > 1200) max = 170;
		else if (w > 992) max = 135;
		else if (w > 768) max = 85;
		else max = 30;

		let arr = randomCreator(this.state.nos);
		this.setState({
			arr: [...arr],
			tim: loc,
			max: max,
		});
	}

	regenerateArray = () => {
		this.setState();
	};

	reflectBack = (arr) => {
		this.setState({ arr: arr, noRegenerate: false });
	};

	render() {
		const { arr, tim, nos, curSort } = this.state;

		const BarsArr = (arr) => {
			let bars = [];

			let w = document.getElementById("BarsDiv");

			if (w) {
				let barW = w.clientWidth / nos;

				arr.map((a, i) =>
					bars.push(
						<div
							className="bar"
							key={i}
							style={{
								transition: `all ${parseInt(tim) / 10000}s ease`,
								height: `${a}px`,
								width: `${barW * 0.7}px`,
								marginRight:
									Math.floor(barW * 0.1) === 0 ? "0" : `${barW * 0.1}px`,
							}}
						></div>
					)
				);
			}
			return bars;
		};

		return (
			<div className="MasterDiv">
				<div className="container" id="input">
					<div>
						<span className="label">Speed</span>
						<input
							type="range"
							min="0"
							max="1000"
							value={tim}
							className="slider"
							id="myRange"
							onChange={(e) => {
								localStorage.setItem("time", e.target.value);
								this.setState({ tim: e.target.value });
							}}
						/>
					</div>
					<div>
						<span className="label">Bars Numbers</span>
						<input
							disabled={this.state.started}
							style={{ pointerEvents: this.state.started ? "none" : "" }}
							type="range"
							min="10"
							max={this.state.max}
							value={this.state.nos}
							className="slider"
							id="myRange"
							onChange={(e) => {
								this.setState({
									nos: e.target.value,
									arr: randomCreator(e.target.value),
								});
							}}
						/>
					</div>
				</div>
				<div
					className="container"
					id="BarsDiv"
					style={{ borderColor: this.props.dark ? "white" : "black" }}
				>
					<div id="stat">
						<div>
							Actual Time:{" "}
							<span
								id="time"
								style={{ borderColor: this.props.dark ? "white" : "black" }}
							>
								0
							</span>
						</div>
						<div>
							Swaps:{" "}
							<span
								id="swaps"
								style={{ borderColor: this.props.dark ? "white" : "black" }}
							>
								0
							</span>
						</div>
						<div>
							Comparisons:{" "}
							<span
								id="comparisons"
								style={{ borderColor: this.props.dark ? "white" : "black" }}
							>
								0
							</span>
						</div>
					</div>
					{curSort !== null && (
						<div id="desc">
							<div className="name">{this.sorts[curSort].name}</div>
							<div className="time">
								<span>Time</span>: {this.sorts[curSort].complexity.time}
							</div>
							<div className="space">
								<span>Space</span>: {this.sorts[curSort].complexity.space}
							</div>
						</div>
					)}
					<div id="switch">
						Dark Mode&nbsp;&nbsp;&nbsp;
						<div id="switchChild" onClick={this.props.toggle}>
							<div
								id="circle"
								className={`${this.props.dark ? "right" : "left"}`}
							></div>
						</div>
					</div>
					<div id="barContainer">{BarsArr(arr)}</div>
				</div>
				<div id="ButtonsDiv">
					<button
						style={{ backgroundColor: "#4791db" }}
						disabled={this.state.noRegenerate}
					>
						<a
							href="/SortVisualizer/"
							style={{ pointerEvents: this.state.noRegenerate ? "none" : "" }}
						>
							Regenerate Array
						</a>
					</button>
					{this.sorts.map((s, i) => (
						<button
							key={i}
							style={{ backgroundColor: s.color }}
							disabled={this.state.started}
							onClick={() => {
								const { arr } = this.state;
								this.setState({
									started: true,
									noRegenerate: true,
									curSort: i,
								});
								s.sort(
									[...arr],
									document.getElementsByClassName("bar"),
									this.reflectBack
								);
							}}
						>
							{s.name}
						</button>
					))}
				</div>
			</div>
		);
	}
}

export default Visualizations;
