function kmp(source, pattern) {
	//table
	let table = new Array(pattern.length).fill(0);
	let i = 1,
		j = 0;
	while (i < pattern.length) {
		if (pattern[i] === pattern[j]) {
			++j, ++i;
			table[i] = j;
		} else {
			if (j > 0) {
				j = table[j]
			} else {
				++i;
			}
		}
	}

	console.log(table);
}


kmp("", "abcdabce")
