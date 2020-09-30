export default function timeout(fun) {
	const val = document.getElementById("myRange").value;
	return new Promise((resolve) =>
		setTimeout(() => {
			fun();
			resolve();
		}, val)
	);
}
