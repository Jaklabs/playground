var names = []

for (n in names) {
	fs.writeFile('name.js', 'for ('+names[n][0]+' in '+names[n]+'){', (err) => {
		if (err) return console.log(err);
		console.log("Loops written...");
	});
}

for (n in names) {
	fs.writeFile('name.js', '}', (err) => {
		if (err) return console.log(err);
		console.log("End brackets added!")
	});
}

console.log(list.length)
