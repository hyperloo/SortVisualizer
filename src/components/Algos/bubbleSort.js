import timeout from "./timeout";
import { red, blue } from "./colors";

var swaps = [];
var timeS = Date.now();
var timeE;

export default function bubbleSort(arr, bars, reflectBack) {
	document.getElementById("swaps").innerHTML = 0;
	document.getElementById("comparisons").innerHTML = 0;
	document.getElementById("time").innerHTML = 0;
	bubbleHelper(arr);
	showAnimations(bars, arr, reflectBack);
}

function bubbleHelper(arr) {
	var len = arr.length;
	for (var i = 0; i < len; i++) {
		for (var j = i + 1; j < len; j++) {
			swaps.push([i, j]);
			if (arr[i] > arr[j]) {
				swaps.push([i, arr[j]]);
				swaps.push([j, arr[i]]);
				var c = arr[i];
				arr[i] = arr[j];
				arr[j] = c;
			} else {
				swaps.push([i, arr[i]]);
				swaps.push([j, arr[j]]);
			}
		}
	}
	timeE = parseFloat((((Date.now() - timeS) % 60000) / 1000).toFixed(1));
}

/* eslint-disable */
async function showAnimations(bars, arr, reflectBack) {
	var p1, p2;
	var swapsEl = document.getElementById("swaps");
	var compareEl = document.getElementById("comparisons");

	var swap = 0,
		compare = 0;

	for (let i = 0; i < swaps.length; ) {
		var step = i % 3;
		if (step === 0) {
			p1 = swaps[i][0];
			p2 = swaps[i][1];
			bars[p1].style.background = red;
			bars[p2].style.background = red;
			compare++;
			compareEl.innerHTML = compare;
			i++;
		} else {
			await timeout(function () {
				if (bars[swaps[i][0]].style.height !== `${swaps[i][1]}px`) swap++;
				bars[swaps[i][0]].style.height = `${swaps[i][1]}px`;
				bars[swaps[i + 1][0]].style.height = `${swaps[i + 1][1]}px`;
				bars[p1].style.background = blue;
				bars[p2].style.background = blue;
				swapsEl.innerHTML = swap;
				i += 2;
			});
		}
	}
	if (p1 !== -1) bars[p1].style.background = blue;
	if (p2 !== -1) bars[p2].style.background = blue;
	document.getElementById("time").innerHTML = timeE;
	reflectBack(arr);
}
/* eslint-enable */
