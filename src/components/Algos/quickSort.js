import timeout from "./timeout";
import { red, yellow, blue, orange } from "./colors";

var swaps = [];
var len = 0;

export default function quickSort(arr, bars) {
	len = arr.length;
	quickHelper(arr, 0, len);
	console.log(swaps);
	showAnimations(bars);
}
async function quickHelper(arr, l, h) {
	if (l < h) {
		var p = partition(arr, l, h);
		quickHelper(arr, l, p);
		quickHelper(arr, p + 1, h);
	}
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

async function showAnimations(bars) {
	var p1 = -1,
		p2 = -1,
		p3 = -1,
		p4 = -1,
		p5 = -1;
	for (var i = 0; i < swaps.length; ) {
		await timeout(function () {
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

				bars[swaps[i][2]].style.background = red;
				i++;
			} else {
				bars[swaps[i][1]].style.height = `${swaps[i][2]}px`;
				i++;
			}
		});
	}
}

/*// if (swaps[i][0] === 0) {
// 	if (swaps[i][1] === 0) {
// 		if (p1 !== -1) bars[p1].style.background = blue;
// 		p1 = swaps[i][2];
// 		bars[p1].style.background = yellow;
// 	} else {
// 		if (p5 !== -1) bars[p5].style.background = blue;
// 		p5 = swaps[i][2];
// 		bars[p5].style.background = yellow;
// 	}
// 	i++;
// } else if (swaps[i][0] === 1) {
// 	if (swaps[i][1] === 0) {
// 		if (p2 !== -1) bars[p2].style.background = blue;
// 		p2 = swaps[i][2];
// 		bars[p2].style.background = red;
// 	} else {
// 		if (p3 !== -1) bars[p3].style.background = blue;
// 		p3 = swaps[i][2];
// 		bars[p3].style.background = orange;
// 	}
// 	i++;
// } else {
// 	bars[swaps[i][1]].style.height = `${swaps[i][2]}px`;
// 	bars[swaps[i + 1][1]].style.height = `${swaps[i + 1][2]}px`;
// 	bars[swaps[i][1]].style.background = blue;
// 	bars[swaps[i + 1][1]].style.background = blue;
// 	i += 2;
// }
*/
