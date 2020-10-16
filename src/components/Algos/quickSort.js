import timeout from "./timeout";
import { red, yellow, blue, orange } from "./colors";

var swaps = [];
var len = 0;
var timeS = Date.now();
var timeE;

export default function quickSort(arr, bars, reflectBack) {
	document.getElementById("swaps").innerHTML = 0;
	document.getElementById("comparisons").innerHTML = 0;
	document.getElementById("time").innerHTML = 0;
	len = arr.length;
	quickHelper(arr, 0, len);
	showAnimations(bars, arr, reflectBack);
}
async function quickHelper(arr, l, h) {
	if (l < h) {
		var p = partition(arr, l, h);
		quickHelper(arr, l, p);
		quickHelper(arr, p + 1, h);
	}
	timeE = parseFloat((((Date.now() - timeS) % 60000) / 1000).toFixed(1));
}

function swap(arr, a, b) {
	var c = arr[a];
	arr[a] = arr[b];
	arr[b] = c;
}

function partition(arr, l, h) {
	var pivot = arr[l];
	var i = l,
		j = h;
	swaps.push([0, 0, l]);
	while (i < j) {
		do {
			i++;
			if (i < len) swaps.push([1, 0, i]);
		} while (i < len && arr[i] <= pivot);
		do {
			j--;
			if (j >= 0) swaps.push([1, 1, j]);
		} while (j >= 0 && arr[j] > pivot);
		if (i < j) {
			swaps.push([2, i, arr[j]]);
			swaps.push([2, j, arr[i]]);
			swap(arr, i, j);
		}
	}
	swaps.push([0, 1, j]);
	swaps.push([2, l, arr[j]]);
	swaps.push([2, j, arr[l]]);
	swap(arr, l, j);
	return j;
}

/* eslint-disable */
async function showAnimations(bars, arr, reflectBack) {
	var p1 = -1,
		p2 = -1,
		p3 = -1,
		p4 = -1;

	var swap = 0,
		compare = 0;

	var swapsEl = document.getElementById("swaps");
	var compareEl = document.getElementById("comparisons");

	for (let i = 0; i < swaps.length; ) {
		if (swaps[i][0] === 0) {
			if (swaps[i][1] === 0) {
				if (p1 !== -1) {
					bars[p1].style.background = blue;
					if (p2 !== -1) bars[p2].style.background = blue;
				}
				p1 = swaps[i][2];
				bars[p1].style.background = yellow;
			} else {
				if (p2 !== -1) bars[p2].style.background = blue;
				p2 = swaps[i][2];
				bars[p2].style.background = orange;
			}
			i++;
		} else if (swaps[i][0] === 1) {
			if (swaps[i][1] === 0) {
				if (p3 !== -1) bars[p3].style.background = blue;
				p3 = swaps[i][2];
			} else {
				if (p4 !== -1) bars[p4].style.background = blue;
				p4 = swaps[i][2];
			}
			compare++;
			compareEl.innerHTML = compare;
			bars[swaps[i][2]].style.background = red;
			i++;
		} else {
			await timeout(function () {
				bars[swaps[i][1]].style.height = `${swaps[i][2]}px`;
				bars[swaps[i + 1][1]].style.height = `${swaps[i + 1][2]}px`;
				swap++;
				swapsEl.innerHTML = swap;
				i += 2;
			});
		}
	}
	if (p1 !== -1) bars[p1].style.background = blue;
	if (p2 !== -1) bars[p2].style.background = blue;
	if (p3 !== -1) bars[p3].style.background = blue;
	if (p4 !== -1) bars[p4].style.background = blue;
	document.getElementById("time").innerHTML = timeE;
	reflectBack(arr);
}
/* eslint-enable */
