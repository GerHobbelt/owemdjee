//
// 🔗 🌐 📁 🗃️
//

const path = require("path");
const fs = require("fs");

let txt = fs.readFileSync("README.md", "utf8");
const origTxt = txt;
let module_spec = fs.readFileSync(".gitmodules", "utf8");
let module_spec2 = fs.readFileSync("../../.gitmodules", "utf8");

module_spec = module_spec.replace(/[\s\r\n]+/g, ' ');
module_spec2 = module_spec2.replace(/[\s\r\n]+/g, ' ');

let mod_re = /\[submodule "([^"]+)"\] path = ([^ ]+) url = ([^ ]+) /g;

let dict = {};

let m = mod_re.exec(module_spec);
while (m) {
	m.input = null;
	// https://github.com/GerHobbelt/zlib-ng
	//console.log({m})
	let repo = m[3];
	let url = repo.replace(/git@github.com:GerHobbelt/, `https://github.com/GerHobbelt`).replace(/\.git$/, '');
	let id = m[1];
	let localdir = `./${ m[2] }`
	let key2 = localdir.replace(/[\\\/._-]+/g, '');
	//console.log({id, key2, localdir, repo, url })

	dict[id.toLowerCase()] = { id, key2, localdir, repo, url };
	dict[key2.toLowerCase()] = { id, key2, localdir, repo, url };

	m = mod_re.exec(module_spec);
}


m = mod_re.exec(module_spec2);
while (m) {
	m.input = null;
	// https://github.com/GerHobbelt/zlib-ng
	//console.log({m})
	let repo = m[3];
	let url = repo.replace(/git@github.com:GerHobbelt/, `https://github.com/GerHobbelt`).replace(/\.git$/, '');
	let id = m[1].replace('thirdparty/', '');
	let localdir = `../../${ m[2] }`;
	let key2 = localdir.replace('thirdparty/', '').replace(/[\\\/._-]+/g, '');
	//console.log({id, key2, localdir, repo, url })

	dict[id.toLowerCase()] = { id, key2, localdir, repo, url };
	dict[key2.toLowerCase()] = { id, key2, localdir, repo, url };

	m = mod_re.exec(module_spec2);
}

// and supplement dictionary with first hit for every key:
mod_re = /\*\*([^*]+)\*\* \[📁\]\(([^ )]+)\) \[🌐\]\(([^ )]+)\)/g;
m = mod_re.exec(txt);
while (m) {
	m.input = null;
	//console.log({m})
	let repo = m[3];
	let url = repo;
	let id = m[1];
	let localdir = m[2];
	let key2 = localdir.replace('thirdparty/', '').replace(/[\\\/._-]+/g, '');
	//console.log({id, key2, localdir, repo, url })

	if (dict[id.toLowerCase()] == undefined) {
		dict[id.toLowerCase()] = { id, key2, localdir, repo, url };
		//console.log({id, key2, localdir, repo, url })
	}
	if (dict[key2.toLowerCase()] == undefined) {
		dict[key2.toLowerCase()] = { id, key2, localdir, repo, url };
		//console.log({id, key2, localdir, repo, url })
	}

	m = mod_re.exec(txt);
}

// and supplement dictionary with first hit for every key:
mod_re = /\*\*([^*]+)\*\* \[🌐\]\(([^ )]+)\)/g;
m = mod_re.exec(txt);
while (m) {
	m.input = null;
	//console.log({m})
	let repo = m[2];
	let url = repo;
	let id = m[1];
	let localdir = null;
	let key2 = id.replace(/[\\\/._-]+/g, '');
	//console.log({id, key2, localdir, repo, url })

	if (dict[id.toLowerCase()] == undefined) {
		dict[id.toLowerCase()] = { id, key2, localdir, repo, url };
		//console.log({id, key2, localdir, repo, url })
	}
	if (dict[key2.toLowerCase()] == undefined) {
		dict[key2.toLowerCase()] = { id, key2, localdir, repo, url };
		//console.log({id, key2, localdir, repo, url })
	}

	m = mod_re.exec(txt);
}

mod_re = /\s*\[submodule "([^"]+)"\][\s\r\n]+path = ([^\s\r\n]+)[\s\r\n]+url = ([^\s\r\n]+)[\s\r\n]+/g;

m = mod_re.exec(txt);
while (m) {
	m.input = null;
	console.log({m})
	let repo = m[3];
	let url = repo.replace(/git@github.com:GerHobbelt/, `https://github.com/GerHobbelt`).replace(/\.git$/, '');
	let id = m[1];
	let localdir = `./${ m[2] }`
	let key2 = localdir.replace(/[\\\/._-]+/g, '');
	console.log({id, key2, localdir, repo, url })

	dict[id.toLowerCase()] = { id, key2, localdir, repo, url };
	dict[key2.toLowerCase()] = { id, key2, localdir, repo, url };

	m = mod_re.exec(txt);
}


//console.log({dict})
console.log("===================================================================================================================\n\n");
//process.exit(1);

let modified = true;
while (modified) {
	modified = false;
	txt = txt
	.replace(/\[([^\s🔗🌐📁🗃️]+)\]\((\.[^)]+)\)/g, function r(m, p1, p2) {
		//console.log({m, p1, p2});
		let spec = dict[p1.toLowerCase()];
		if (!spec) {
			let key2 = p2.replace(/[\\\/._-]+/g, '');
			spec = dict[key2.toLowerCase()];
		}
		if (!spec) {
			let key2 = p1.replace(/[ \\\/._-]+/g, '');
			spec = dict[key2.toLowerCase()];
		}
		if (!spec) {
			console.log("not found: ", p1);
			return m;
		}
		let s = `**${ p1 }** [📁](${ spec.localdir }) [🌐](${ spec.url })`;
		if (spec.localdir == null) {
			s = `**${ p1 }** [🌐](${ spec.url })`;
		}
		//console.log({ s })

		modified = true;

		return s;
	})
	.replace(/~~\[([^\s🔗🌐📁🗃️]+)\]\((http[^)]+)\)/g, function r(m, p1, p2) {
		//console.log({m, p1, p2});
		let s = `~~**${ p1 }** [🌐](${ p2 })`;
		//console.log({ s })

		modified = true;

		return s;
	});
}

// hotfixes:
txt = txt
.replace(/https:\/\/github.com\/GerHobbelt\/\//g, `https://github.com/GerHobbelt/`)
.replace(/\(git@github.com:GerHobbelt\/([^\s]+)\.git\)/g, '(https://github.com/GerHobbelt/$1)')



// sort the overview list alphabetically:
function sort_section(start_re_str, txt) {
	txt = txt.replace(new RegExp(`(${start_re_str}[^\\n]+)\\n([^]+?)\\n(#[^\\n]+)`, 'g'), function r(m, p1, p2, p3) {
		let s = sort_subsection(/\n- /, p2, '- ', '    ');

		//console.log({ s, p1, p3 });
		return p1 + '\n\n' + s + '\n\n\n\n\n\n\n\n' + p3;
	});
	return txt;
}

txt = sort_section('# Libraries in this collection \\(All', txt);
txt = sort_section('## Libraries not available in this collection but already part', txt);



// sort the overview list alphabetically:
function sort_subsection(item_re, p2, rebuild_prefix, indent_prefix) {
	p2 = '\n' + p2 + '\n';
	let a = p2.split(item_re).map((l) => l.trim()).filter((l) => l.length !== 0);
	let b = a.map((l, i) => {
		let re = new RegExp(`\n${indent_prefix}`, 'g');
		let key = l.replace(/[^a-z0-9 ]/gi, '').toLowerCase();

		// unindent sublevel:
		let old_l = l;
		//console.log({ subline: 1, l });
		l = l.replace(re, '\n');
		if (l !== old_l) {
			//console.log({ subline_DEINDENT: 1, re, indent_prefix, old_l, l });
		}

		// see if it has a sublist to sort
		l = process_subsection(l);

		// re-indent sublevel:
		l = l.replace(/\n/g, `\n${indent_prefix}`);
		if (l !== old_l) {
			//console.log({ subline_sorted: 1, l });
		}

		return { line: key, index: i, origline: l };
	});
	b.sort((a, b) => {
		let ad = (a.origline.indexOf('[📁]') > 0);
		let bd = (b.origline.indexOf('[📁]') > 0);
		if (ad !== bd)
			return bd > ad ? 1 : -1;

		let rv = a.line.localeCompare(b.line);
		return rv;
	});

	// remove duplicate entries!
	b = b.filter((l, i) => {
		return (i === 0 || b[i - 1].line !== l.line);
	})

	// re-merge the list; make sure multiline entries have an extra empty line at the end to clearly visualize them (as was done by hand before)
	let s = b.map((l) => rebuild_prefix + l.origline + (l.origline.indexOf('\n') > 0 ? '\n' : '')).join('\n');

	//console.log({ b, s });
	return s;
}

function process_subsection(l) {
	var rv = /^([^]+?)(\n  [-+*] [^]+?)(\n  [^-+*\s]+[^]+)?$/.exec(l + '\n');
	let s = l;
	if (rv) {
		rv[0] = null;
		rv[2] = rv[2].replace(/\n  [-+*] /g, '\n    - ');
		if (!rv[3])
			rv[3] = '';
		rv.input = null;
	}
	else {
		rv = /^([^]+?)(\n    [-+*] [^]+?)(\n    [^-+*\s]+[^]+)?$/.exec(l + '\n');
		if (rv) {
			rv[0] = null;
			rv[2] = rv[2].replace(/\n    [-+*] /g, '\n    - ');
			if (!rv[3])
				rv[3] = '';
			rv.input = null;
		}
		else {
			rv = null;
		}
	}

	if (rv) {
		s = sort_subsection(/\n    - /, rv[2], '    - ', '    ');
		s = `${rv[1]}\n${s}\n\n${rv[3]}`;
	}

	s = s.trimRight();

	//console.log({ rv, s });
	return s;
}

txt = txt.replace(/(# Libraries we\'re looking at[^\n]+)\n([^]+?)\n((?:#[^\n]+)|---)/, function r(m, p1, p2, p3) {
	// split up in subsections
	p2 = p2.replace(/\t/g, '    ');
	let a = p2.split(/\n- /).map((l) => l.trim()).filter((l) => l.length !== 0);
	let b = a.map((l) => {
		l = process_subsection(l);
		return l + (l.indexOf('\n') > 0 ? '\n' : '');
	})

	//console.log({ p1, p3 });
	return p1 + '\n\n- ' + b.join('\n\n- ') + '\n\n\n\n' + p3;
})



txt = txt.replace(/([\r\n]+)\s*\[submodule "([^"]+)"\][\s\r\n]+path = ([^\s\r\n]+)[\s\r\n]+url = ([^\s\r\n]+)/g, function r(m, p1, p2, p3, p4) {
	//console.log({ p1, p2, p3, p4 });
	let a = p4;

	a = a
	.replace(/^git@github.com:GerHobbelt\/([^\s]+)\.git$/, 'https://github.com/GerHobbelt/$1')

	let rv = p1 + `- **${ p2 }** [📁](./${ p3 }) [🌐](${ a })\n`;
	//console.log({ a, rv })
	return rv;
})





// -----------------------------------------------------------------------------------------------------------
// and copy the descriptive text across all occurrences which haven't any yet:

function collect_descriptions(txt) {
	let a = {};

	let mod_re = /- \*\*([^*]+)\*\* \[📁\]\(([^ )]+)\) \[🌐\]\(([^ )]+)\)/g;
	let m = mod_re.exec(txt);
	while (m) {
		m.input = null;
		//console.log({m})
		let repo = m[3];
		let url = repo;
		let id = 'x' + m[1];
		let localdir = m[2];
		let key2 = localdir.replace('thirdparty/', '').replace(/[\\\/._-]+/g, '');
		let match = m[0];
		let matchPos = m.index + match.length;
		let dstr = txt.substring(matchPos, matchPos + 1000);

		let desc_re = /^ -- ([^ \r\n][^]+?)\n(:?(:?\s*- (:?~~)?\*\*)|(:?\s*- ~~)|(:?\s*- http)|(:?\s*- other)|(:?\s*- ZeroMQ)|(:?\s*- LMDB)|(:?\s*- see also)|(:?\s*- \[Manticore\])|[#*-]|$)/;

		let d = desc_re.exec(dstr);
		if (d) {
			d.input = null;
			let description = d[1].trim();

			console.log({id, key2, localdir, repo, url, m, matchPos, description, dstr })

			//if (a[id.toLowerCase()] == undefined) {
			//	a[id.toLowerCase()] = description;
			//}
			if (a[id] == undefined) {
				a[id] = description;
			}
			else if (a[id].length < description.length) {
				console.log("OVERRIDING: ", a[id], " --> ", description);
				a[id] = description;
			}
		}

		m = mod_re.exec(txt);
	}

	//console.log({a})
	return a;
}

let descr_arr = collect_descriptions(txt);


mod_re = /- \*\*([^*]+)\*\* \[📁\]\(([^ )]+)\) \[🌐\]\(([^ )]+)\)\s*[\n]/g;
txt = txt.replace(mod_re, (m, p1, p2, p3) => {
	let id = 'x' + p1;
	let localdir = p2;
	let key2 = localdir.replace('thirdparty/', '').replace(/[\\\/._-]+/g, '');
	let descr = descr_arr[id];
	if (descr) {
		console.log({m, p1, p2, p3, key2, descr});
		return `${ m.trim() } -- ${ descr }\n`;
	}
	return m;
});


//------------------------------------------------------------------------------------------

//
// Check which entries in the 'All' list are NOT listed in any of the sections above it: those entries
// MUST still be categorized:
//
function check_entries_against_their_categorized_references(txt) {
	let header_re_str = "# TBD: Libraries which still need to be moved";
	let tbd_block_re = new RegExp(`(${header_re_str}[^\\n]+)\\n([^]+?)(\\n#[^\\n]+)?$`, 'g');

	let overview_re_str = '# Libraries in this collection \\(All';
	let toc_block_re = new RegExp(`(${overview_re_str}[^\\n]+)\\n([^]+?)\\n(#[^\\n]+)`, 'g');
	let categories_block_re = new RegExp(`^([^]+?)\\n(?:${overview_re_str})`, 'g');

	let tbd_m = tbd_block_re.exec(txt);
	delete tbd_m.input;

	let toc_m = toc_block_re.exec(txt);
	delete toc_m.input;

	let cat_m = categories_block_re.exec(txt);
	delete cat_m.input;

	let cat_arr = collect_entries(cat_m[1]);
	let toc_arr = collect_entries(toc_m[2]);
	let tbd_arr = collect_entries(tbd_m[2]);

	for (const idx in toc_arr) {
		if (idx in cat_arr) {
			if (idx in tbd_arr) {
				delete tbd_arr[idx];
			}
		}
		else {
			tbd_arr[idx] = toc_arr[idx];
		}
	}

	//console.log({tbd_arr, dict})

	// now we know which items still need to be CATEGORIZED: regenerate the TBD list for us now:

	txt = txt.replace(tbd_block_re, function r(m, p1, p2, p3) {
		let tbd_dict = Object.keys(tbd_arr).map((id) => {
			let idstr = id.substring(1).toLowerCase();
			let slot = dict[idstr];
			console.log({id, idstr, slot})
			return slot;
		});
		//console.log({tbd_dict});

		tbd_dict = tbd_dict.map((el) => {
			return `- **${ el.id }** [📁](${ el.localdir }) [🌐](${ el.url })`;
		})
		.sort();

		let s = tbd_dict.join('\n');
		// 🔗 🌐 📁 🗃️
		let tail = '\n';

		//console.log({ s, p1, p2, p3 });

		return p1 + '\n\n' + s + '\n\n' + tail;
	});

	return txt;
}


function collect_entries(txt) {
	let a = {};

	let mod_re = /- \*\*([^*]+)\*\* \[📁\]\(([^ )]+)\) \[🌐\]\(([^ )]+)\)/g;
	let m = mod_re.exec(txt);
	//console.log({m, txt})
	while (m) {
		m.input = null;
		//console.log({m})
		let repo = m[3];
		let url = repo;
		let id = 'x' + m[1];
		let localdir = m[2];
		let key2 = localdir.replace('thirdparty/', '').replace(/[\\\/._-]+/g, '');
		let match = m[0];
		let matchPos = m.index + match.length;
		let dstr = txt.substring(matchPos, matchPos + 1000);

		let desc_re = /^ -- ([^ \r\n][^]+?)\n(:?(:?\s*- (:?~~)?\*\*)|(:?\s*- ~~)|(:?\s*- http)|(:?\s*- other)|(:?\s*- ZeroMQ)|(:?\s*- LMDB)|(:?\s*- see also)|(:?\s*- \[Manticore\])|[#*-]|$)/;

		let d = desc_re.exec(dstr);
		if (d) {
			d.input = null;
			let description = d[1].trim();

			//console.log({id, key2, localdir, repo, url, m, matchPos, description, dstr })

			//if (a[id.toLowerCase()] == undefined) {
			//	a[id.toLowerCase()] = description;
			//}
			if (a[id] == undefined) {
				a[id] = description;
			}
			else if (a[id].length < description.length) {
				//console.log("OVERRIDING: ", a[id], " --> ", description);
				a[id] = description;
			}
		}
		else {
			a[id] = true;
		}

		m = mod_re.exec(txt);
	}

	//console.log({a})
	return a;
}



txt = check_entries_against_their_categorized_references(txt);





if (origTxt !== txt) {
	console.log("Updating the README...");
	fs.writeFileSync("README.md", txt, "utf8");
}

