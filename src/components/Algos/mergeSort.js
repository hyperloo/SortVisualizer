import timeout from "./timeout";
import { red, blue } from "./colors";

var swaps = [];

export default function mergeSort(arr, bars) {
	const len = arr.length;
	mergeHelper(arr, 0, len - 1);
	showAnimations(bars);
}

async function showAnimations(bars) {
	var p1, p2;

	for (var i = 0; i < swaps.length; i++) {
		var step = i % 2;
		await timeout(function () {
			/* eslint-disable no-alert, no-console */
			if (!step) {
				p1 = swaps[i][0];
				p2 = swaps[i][1];
				bars[p1].style.background = red;
				bars[p2].style.background = red;
			} else {
				bars[swaps[i][0]].style.height = `${swaps[i][1]}px`;
				bars[p1].style.background = blue;
				bars[p2].style.background = blue;
			}
			/* eslint-enable no-alert */
		});
	}
}

function mergeHelper(arr, st, en) {
	if (st >= en) return;
	var mid = Math.floor((st + en) / 2);

	mergeHelper(arr, st, mid);
	mergeHelper(arr, mid + 1, en);
	merger(arr, st, mid, en);
}

function merger(arr, st, mid, en) {
	var i = 0,
		j = 0,
		k = st;
	var a = arr.slice(st, mid + 1),
		b = arr.slice(mid + 1, en + 1);

	// console.log(st, mid, en, a, b);

	while (i < mid - st + 1 && j < en - mid) {
		swaps.push([st + i, mid + j + 1]);
		if (a[i] < b[j]) {
			swaps.push([k, a[i]]);
			arr[k++] = a[i++];
		} else {
			swaps.push([k, b[j]]);
			arr[k++] = b[j++];
		}
	}
	while (i < mid - st + 1) {
		swaps.push([st + i, k]);
		swaps.push([k, a[i]]);
		arr[k++] = a[i++];
	}
	while (j < en - mid) {
		swaps.push([mid + j + 1, k]);
		swaps.push([k, b[j]]);
		arr[k++] = b[j++];
	}
}
