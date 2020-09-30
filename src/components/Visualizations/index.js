import React, { Component } from "react";
import mergeSort from "../Algos/mergeSort";
import bubbleSort from "../Algos/bubbleSort";
import selectionSort from "../Algos/selectionSort";
import insertionSort from "../Algos/insertionSort";
import quickSort from "../Algos/quickSort";
import "./style.scss";

function randomCreator() {
	var arr = [];
	const min = 50,
		max = 800;
	for (var i = 0; i < 10; i++) {
		arr.push(Math.floor(Math.random() * (max - min) + min));
	}
	return arr;
}

class Visualizations extends Component {
	state = {
		arr: [],
		tempArr: [],
		tim: "50",
	};

	componentDidMount() {
		var arr = randomCreator();
		this.setState({ arr: [...arr], tempArr: [...arr] });
	}

	render() {
		const { arr, tempArr, tim } = this.state;

		const BarsArr = (arr) => {
			var bars = [];
			arr.map((a, i) =>
				bars.push(
					<div className="bar" key={i} style={{ height: `${a}px` }}></div>
				)
			);
			return bars;
		};

		return (
			<div className="MasterDiv">
				<div class="slidecontainer">
					<input
						type="range"
						min="0"
						max="2000"
						value={tim}
						class="slider"
						id="myRange"
						onChange={(e) => this.setState({ tim: e.target.value })}
						onClick={(e) => this.setState({ tim: e.target.value })}
					/>
				</div>
				<div className="BarsDiv">
					<div>{BarsArr(arr)}</div>
					{/* <div>{BarsArr(tempArr)}</div> */}
				</div>
				<div className="ButtonsDiv">
					<button onClick={() => window.location.reload(false)}>
						Regenerate Array
					</button>
					<button
						onClick={() => {
							const { arr } = this.state;
							mergeSort(arr, document.getElementsByClassName("bar"));
						}}
					>
						Merge Sort
					</button>
					<button
						onClick={() => {
							const { arr } = this.state;
							bubbleSort(arr, document.getElementsByClassName("bar"));
						}}
					>
						Bubble Sort
					</button>
					<button
						onClick={() => {
							const { arr } = this.state;
							selectionSort(arr, document.getElementsByClassName("bar"));
						}}
					>
						Selection Sort
					</button>
					<button
						onClick={() => {
							const { arr } = this.state;
							insertionSort(arr, document.getElementsByClassName("bar"));
						}}
					>
						Insertion Sort
					</button>
					<button
						onClick={() => {
							const { arr } = this.state;
							quickSort(arr, document.getElementsByClassName("bar"));
						}}
					>
						Quick Sort
					</button>
				</div>
			</div>
		);
	}
}

export default Visualizations;
