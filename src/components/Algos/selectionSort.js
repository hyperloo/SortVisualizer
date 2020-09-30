import timeout from "./timeout";
import { red, yellow, blue } from "./colors";

var swaps = [];

export default function selectionSort(arr, bars) {
	selectionHelper(arr);
	showAnimations(bars);
}

function selectionHelper(arr) {
	var len = arr.length;
	for (var i = 0; i < len - 1; i++) {
		var min = i;
		for (var j = i + 1; j < len; j++) {
			swaps.push([0, i, j]);
			if (arr[min] > arr[j]) {
				min = j;
				swaps.push([1, j]);
			}
		}
		swaps.push([2, min, arr[i]]);
		swaps.push([2, i, arr[min]]);
		var c = arr[min];
		arr[min] = arr[i];
		arr[i] = c;
	}
}

async function showAnimations(bars) {
	var p1 = -1,
		p2 = -1,
		p3 = -1;
	for (var i = 0; i < swaps.length; i++) {
		await timeout(function () {
			if (swaps[i][0] === 0) {
				if (p1 !== -1) bars[p1].style.background = blue;
				if (p2 !== -1 && p2 !== p3) bars[p2].style.background = blue;
				p1 = swaps[i][1];
				p2 = swaps[i][2];
				bars[p1].style.background = red;
				bars[p2].style.background = red;
			} else {
				bars[p2].style.background = blue;
				if (swaps[i][0] === 1) {
					if (p3 !== -1) bars[p3].style.background = blue;
					p3 = swaps[i][1];
					bars[p3].style.background = yellow;
				} else {
					bars[swaps[i][1]].style.height = `${swaps[i][2]}px`;
					bars[swaps[i][1]].style.background = blue;
				}
			}
		});
	}
}
