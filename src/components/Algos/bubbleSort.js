import timeout from "./timeout";
import { red, blue } from "./colors";

var swaps = [];

export default function bubbleSort(arr, bars) {
	bubbleHelper(arr);
	showAnimations(bars);
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
	return swaps;
}

async function showAnimations(bars) {
	var p1, p2;

	for (var i = 0; i < swaps.length; ) {
		var step = i % 3;
		await timeout(function () {
			if (step === 0) {
				p1 = swaps[i][0];
				p2 = swaps[i][1];
				bars[p1].style.background = red;
				bars[p2].style.background = red;
				i++;
			} else {
				bars[swaps[i][0]].style.height = `${swaps[i][1]}px`;
				bars[swaps[i + 1][0]].style.height = `${swaps[i + 1][1]}px`;
				bars[p1].style.background = blue;
				bars[p2].style.background = blue;
				i += 2;
			}
		}, 100);
	}
}
