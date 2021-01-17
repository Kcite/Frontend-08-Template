function kmp(source, pattern) {
	//table
	let table = new Array(pattern.length).fill(0); {
		let i = 1,
			j = 0;
		while (i < pattern.length) {
			if (pattern[i] === pattern[j]) {
				++i, ++j;
				table[i] = j;
			} else {
				if (j > 0) {
					j = table[i]
				} else {
					++i;
				}
			}
		}
	}

	{
		let i = 0,
			j = 0;
		while (i < source.length) {
			if (j === pattern.length) {
				return true;
			}

			if (pattern[i] === source[j]) {
				++i, ++j;
			} else {
				if (j > 0) {
					j = table[j];
				} else {
					++i;
				}
			}
		}
		return false;
	}
	console.log(table);
}


console.log(kmp("Hello", "ll"));
