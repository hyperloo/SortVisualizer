import timeout from "./timeout";
import { red, blue } from "./colors";

var swaps = [];
var timeS = Date.now();
var timeE;

export default function mergeSort(arr, bars, reflectBack) {
	document.getElementById("swaps").innerHTML = 0;
	document.getElementById("comparisons").innerHTML = 0;
	document.getElementById("time").innerHTML = 0;
	const len = arr.length;
	mergeHelper(arr, 0, len - 1);
	showAnimations(bars, arr, reflectBack);
}

/* eslint-disable */
async function showAnimations(bars, arr, reflectBack) {
	var p1, p2;

	var compare = 0;

	var compareEl = document.getElementById("comparisons");

	for (let i = 0; i < swaps.length; i++) {
		if (i % 2 === 0) {
			p1 = swaps[i][0];
			p2 = swaps[i][1];
			bars[p1].style.background = red;
			bars[p2].style.background = red;
			compare++;
			compareEl.innerHTML = compare;
		} else {
			await timeout(function () {
				bars[swaps[i][0]].style.height = `${swaps[i][1]}px`;
				bars[p1].style.background = blue;
				bars[p2].style.background = blue;
			});
		}
	}
	if (p1 && p1 !== -1) bars[p1].style.background = blue;
	if (p2 && p2 !== -1) bars[p2].style.background = blue;
	document.getElementById("time").innerHTML = timeE;
	reflectBack(arr);
}

function mergeHelper(arr, st, en) {
	if (st >= en) return;
	var mid = Math.floor((st + en) / 2);

	mergeHelper(arr, st, mid);
	mergeHelper(arr, mid + 1, en);
	merger(arr, st, mid, en);
	timeE = parseFloat((((Date.now() - timeS) % 60000) / 1000).toFixed(1));
}

function merger(arr, st, mid, en) {
	var i = 0,
		j = 0,
		k = st;
	var a = arr.slice(st, mid + 1),
		b = arr.slice(mid + 1, en + 1);

	while (i < mid - st + 1 && j < en - mid) {
		swaps.push([st + i, mid + j + 1]);
		if (a[i] < b[j]) {
			swaps.push([k, a[i]]);
			// swaps.push([st+i,])
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

/* eslint-enable */
