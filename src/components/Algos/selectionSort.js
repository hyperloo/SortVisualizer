import timeout from "./timeout";
import { red, yellow, blue } from "./colors";

let swaps = [];
let timeS = Date.now();
let timeE;

export default function selectionSort(arr, bars, reflectBack) {
	document.getElementById("swaps").innerHTML = 0;
	document.getElementById("comparisons").innerHTML = 0;
	document.getElementById("time").innerHTML = 0;
	selectionHelper(arr);
	showAnimations(bars, arr, reflectBack);
}

function selectionHelper(arr) {
	let len = arr.length;
	for (let i = 0; i < len - 1; i++) {
		let min = i;
		for (let j = i + 1; j < len; j++) {
			swaps.push([0, i, j]);
			if (arr[min] > arr[j]) {
				min = j;
				swaps.push([1, j]);
			}
		}
		swaps.push([2, min, arr[i]]);
		swaps.push([2, i, arr[min]]);
		let c = arr[min];
		arr[min] = arr[i];
		arr[i] = c;
	}
	timeE = parseFloat((((Date.now() - timeS) % 60000) / 1000).toFixed(1));
}

/* eslint-disable */
async function showAnimations(bars, arr, reflectBack) {
	let p1 = -1,
		p2 = -1,
		p3 = -1;
	let swapsEl = document.getElementById("swaps");
	let compareEl = document.getElementById("comparisons");

	let swap = 0,
		compare = 0;

	for (let i = 0; i < swaps.length; i++) {
		await timeout(function () {
			if (swaps[i][0] === 0) {
				if (p1 !== -1) bars[p1].style.background = blue;
				if (p2 !== -1 && p2 !== p3) bars[p2].style.background = blue;
				p1 = swaps[i][1];
				p2 = swaps[i][2];
				bars[p1].style.background = red;
				bars[p2].style.background = red;
				compare++;
				compareEl.innerHTML = compare;
			} else {
				bars[p2].style.background = blue;
				if (swaps[i][0] === 1) {
					if (p3 !== -1) bars[p3].style.background = blue;
					p3 = swaps[i][1];
					bars[p3].style.background = yellow;
				} else {
					if (bars[swaps[i][1]].style.height !== `${swaps[i][2]}px`) swap++;
					bars[swaps[i][1]].style.height = `${swaps[i][2]}px`;
					bars[swaps[i + 1][1]].style.height = `${swaps[i + 1][2]}px`;
					bars[swaps[i][1]].style.background = blue;
					bars[swaps[i + 1][1]].style.background = blue;
					swapsEl.innerHTML = swap;
					i++;
				}
			}
		});
	}
	if (p1 !== -1) bars[p1].style.background = blue;
	if (p2 !== -1) bars[p2].style.background = blue;
	if (p3 !== -1) bars[p3].style.background = blue;
	document.getElementById("time").innerHTML = timeE;
	reflectBack(arr);
}

/* eslint-enable */
