import timeout from "./timeout";
import { red, blue } from "./colors";

var swaps = [];

export default function insertionSort(arr, bars) {
	insertionHelper(arr);
	showAnimations(bars);
}

function insertionHelper(arr) {
	var len = arr.length;
	var i, j;

	for (i = 1; i < len; i++) {
		j = i - 1;
		while (j >= 0 && arr[j] > arr[j + 1]) {
			swaps.push([j, j + 1]);
			swaps.push([j, arr[j + 1]]);
			swaps.push([j + 1, arr[j]]);
			var c = arr[j + 1];
			arr[j + 1] = arr[j];
			arr[j] = c;
			j--;
		}
	}
}

async function showAnimations(bars) {
	var p1, p2;
	for (var i = 0; i < swaps.length; ) {
		await timeout(function () {
			if (i % 3 === 0) {
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
		});
	}
}
