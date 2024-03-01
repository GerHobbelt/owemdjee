//
// 🔗 🌐 📁 🗃️
//

const path = require("path");
const fs = require("fs");










let txt = fs.readFileSync("README.md", "utf8");
const origTxt = txt;

txt = txt.replace(/\t/g, '    ');

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
	//console.log({m})
	let repo = m[3];
	let url = repo.replace(/git@github.com:GerHobbelt/, `https://github.com/GerHobbelt`).replace(/\.git$/, '');
	let id = m[1];
	let localdir = `./${ m[2] }`
	let key2 = localdir.replace(/[\\\/._-]+/g, '');
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


//console.log({dict})
console.log("===================================================================================================================\n\n");
//process.exit(1);


// Before we go and parse the README and re-order / organize the items in the lists in there, we MUST protect the (partial) TOCs we generated using Obidian tooling:
txt = txt
.replace(/^(\s*)[-*]\s+\[(.+)\]\(#(.+)\)\s*$/gm, function tocr(m, p1, p2, p3) {
	// we only edit/regenerate the hash link when we feel the need:
	let hashtag = p3;
	if (/[ %\/]/.test(p3)) {
		let title = (p2 == 'TOC' ? p3 : p2);
		hashtag = title
		.toLowerCase()
		.replace(/%[0-9A-F][0-9A-F]/g, '-')
		.replace(/\.\.\./g, '\x01')
		.replace(/--/g, '\x02')
		.replace(/(\w)\./g, '$1')
		.replace(/[^a-zA-Z0-9\&\/'\x01\x02+~ø]+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '')
		.replace(/[\&\/'+~]/g, '')
		.replace(/\x01/g, '-')
		.replace(/\x02/g, '--')
		.replace(/-+$/, '-');
	}

	let rv = `${ p1 }* [${ p2 }](#${ hashtag })`;
	return rv;
});



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


txt = txt.replace(/([\r\n]+)\s*\[submodule "([^"]+)"\][\s\r\n]+path = ([^\s\r\n]+)[\s\r\n]+url = ([^\s\r\n]+)/g, function r(m, p1, p2, p3, p4) {
	//console.log({ p1, p2, p3, p4 });
	let a = p4;

	a = a
	.replace(/^git@github.com:GerHobbelt\/([^\s]+)\.git$/, 'https://github.com/GerHobbelt/$1')

	let rv = p1 + `- **${ p2 }** [📁](./${ p3 }) [🌐](${ a })\n`;
	//console.log({ a, rv })
	return rv;
})



txt = process_all_supersections(txt);

let descr_arr = collect_descriptions(txt);

txt = check_entries_against_their_categorized_references(txt);


mod_re = /- \*\*([^*]+)\*\* \[📁\]\(([^ )]+)\) \[🌐\]\(([^ )]+)\)\s*[\n]/g;
txt = txt.replace(mod_re, (m, p1, p2, p3, pos) => {
	let id = 'x' + p1;
	let localdir = p2;
	let key2 = localdir.replace('thirdparty/', '').replace(/[\\\/._-]+/g, '');
	let descr = descr_arr[id];
	if (descr) {
		let indent = find_indent_level(txt, pos);
		let descr_indented = reindent_text(descr, indent + 2);
		//console.log({m, p1, p2, p3, key2, descr, pos, indent, descr_indented});
		return `${ m.trim() } -- ${ descr_indented }\n`;
	}
	return m;
});


mod_re = /- \*\*([^*]+)\*\* (?:\[📁\]\(([^ )]+)\) )?\[🌐\]\(([^ )]+)\)/g;

let undoc = [];
let undoc_dedup = {};
txt = txt.replace(mod_re, (m, p1, p2, p3, pos) => {
	//console.log({m, p1, p2, p3, pos});
	let id = 'x' + p1;
	let localdir = p2;
	if (!undoc_dedup[id]) {
		undoc_dedup[id] = true;
		let descr = descr_arr[id];
		if (!descr) {
			undoc.push(`DIR: **${ localdir || id }** -- ${ m }`);
		}
	}
	return m;
})
.replace(/ -- +/g, ' -- ')                // hotfix

if (undoc.length > 0) {
	console.log("Updating the UNDOC.TXT list...");
	fs.writeFileSync("undoc.txt", undoc.join('\n') + '\n', "utf8");
}

if (origTxt !== txt) {
	console.log("Updating the README...");
	fs.writeFileSync("README.md", txt, "utf8");
}












function process_all_supersections(txt) {
	txt = '\n' + txt.trim() + '\n';
	
	let sections = txt.split(/\n---+\n/);
	
	txt = sections.map(process_all_sections).join('\n\n---\n\n');

	txt = txt.trim() + '\n\n';
	
	return txt;
}

function process_all_sections(txt) {
	txt = '\n' + txt.trim() + '\n';
	
	let sections = txt.split(/\n#/);
	
	txt = sections.map(process_single_section).join('\n\n\n\n\n\n\n\n\n\n\n\n') + '\n\n\n\n';
	
	return txt;
}

function process_single_section(txt) {
	txt = txt.trim();
	if (txt.length === 0)
		return txt;
	
	txt = '#' + txt + '\n';
	
	//console.log({txt});
	
	let m = /^(#+)([^\n]+)\n/g.exec(txt);
	let level = m[1].length;
	let level_str = m[1];
	let title = m[2].trim();
	let content = txt.substr(m[0].length).trim();

	content = process_content_part(content);
	
	return `${ level_str } ${ title }\n\n${ content }`;
}

function process_content_part(txt) {
	txt = txt.trim();
	if (txt.length === 0)
		return txt;
	
	// detect paragraphs & lists. Sort the lists, if any.
	let lines = txt.split('\n');
	let category = lines.map((line) => {
		if (line.trim().length === 0)
			return 1;		// vspace
		if (/^[-] /.test(line))
			return 2; 		// item (start)
		if (/^\s/.test(line))
			return 3;		// item (continued)
		
		return 4;			// paragraph line
	});
	
	let chunks = [];
	let chunk;
	let list;
	let mode = -1;
	for (let i = 0; i < category.length; i++) {
		let line_mode = category[i];
		
		switch (category[i]) {
		case 4:		// paragraph gathering
			if (mode === 2) {
				// push previous item into the list
				let part = chunk.join('\n').trim();
				list.push(part);
				part = sort_subsection(list);
				chunks.push(part);
			}
			if (mode !== 4) {
				chunk = [];
				list = [];
				mode = 4;
			}
			chunk.push(lines[i]);
			break;
			
		case 2:		// item (start)
			if (mode === 4) {
				let part = chunk.join('\n').trim();
				chunks.push(part);
			}
			if (mode === 2) {
				// push previous item into the list
				let part = chunk.join('\n').trim();
				list.push(part);
				chunk = [];
			}
			if (mode !== 2) {
				chunk = [];
				list = [];
				mode = 2;
			}
			chunk.push(lines[i]);
			break;
			
		default:
			chunk.push(lines[i]);
			break;
		}
	}

	if (mode === 2) {
		// push previous item into the list
		let part = chunk.join('\n').trim();
		list.push(part);
		part = sort_subsection(list);
		chunks.push(part);
	}
	else if (mode === 4) {
		let part = chunk.join('\n').trim();
		chunks.push(part);
	}
	
	return chunks.join('\n\n');
}




// sort the overview list alphabetically:
function sort_subsection(list) {
	let a = list.map((l) => l.trim()).filter((l) => l.length !== 0);
	let b = a.map((l, i) => {
		l = reindent_text(l, 2).trim();
		let key = l.replace(/\n[^]*$/, '');
		let itemkey = key.replace(/--[^]*$/, '');
		if (itemkey.length > 0)
			key = itemkey;
		key = key.replace(/[^a-z0-9 ]/gi, '').toLowerCase();

		// see if it has a sublist to sort
		if (l.indexOf('\n') > 0) {
			let content = l.substr(2);    // skip '- ' item prefix.
			content = reindent_text(content, 0);

			content = process_content_part(content);
			
			content = content.trim().split('\n').join('\n  ');

			l = '- ' + content;
		}

		return { line: key, index: i, origline: l };
	});
	b.sort((a, b) => {
		let ad = (a.origline.indexOf('- ~~') === 0);
		let bd = (b.origline.indexOf('- ~~') === 0);
		if (ad !== bd)
			return bd > ad ? -1 : 1;

		ad = (a.origline.indexOf('[📁]') > 0);
		bd = (b.origline.indexOf('[📁]') > 0);
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
	let s = b.map((l) => '' + l.origline + (l.origline.indexOf('\n') > 0 ? '\n' : '')).join('\n');

	//console.log({ b, s });
	return s;
}





// -----------------------------------------------------------------------------------------------------------
// and copy the descriptive text across all occurrences which haven't any yet:

function collect_descriptions(txt) {
	let a = {};
	let debug = /doxa/.test(txt);

	let mod_re = /- \*\*([^*]+)\*\* \[📁\]\(([^ )]+)\) \[🌐\]\(([^ )]+)\)/g;
	let m = mod_re.exec(txt);
	while (m) {
		m.input = null;
		if (debug && 0) console.log({m})
		let repo = m[3];
		let url = repo;
		let id = 'x' + m[1];
		let localdir = m[2];
		let key2 = localdir.replace('thirdparty/', '').replace(/[\\\/._-]+/g, '');
		let match = m[0];
		let matchPos = m.index + match.length;
		let dstr = txt.substring(matchPos, matchPos + 4000);

		let desc_re = /^ +-- +([^ \r\n][^]+?)\n(:?(:?\s*- (:?~~)?\*\*)|(:?\s*- ~~)|(:?\s*- http)|(:?\s*- other)|(:?\s*- ZeroMQ)|(:?\s*- LMDB)|(:?\s*- see also)|(:?\s*- \[Manticore\])|[#*-]|$)/;

		let d = desc_re.exec(dstr);
		if (id === 'xdoxa')
			console.log({id, dstr, d});
		if (d) {
			d.input = null;
			let description = d[1].trim();

			description = reindent_text(description, 0);

			//console.log({id, key2, localdir, repo, url, m, matchPos, description, dstr })

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


function find_indent_level(txt, pos) {
	let mark = pos;
	for (pos--; pos >= 0; pos--) {
		if (txt[pos] === '\n')
			break;
	}
	pos++;
	return mark - pos;
}

function reindent_text(txt, indent) {
	if (txt.indexOf('\n') < 0)
		return txt;
	
	let lines = txt.split('\n');
	let base_indent = -1;
	let base_indent_str = '';
	for (let i = 1; i < lines.length; i++) {
		let m = /^( +)([^ \n]+)/.exec(lines[i]);
		//console.log({line: lines[i], m});
		if (m) {
			let s = m[1];
			let l = s.length;
			if (base_indent === -1) {
				base_indent = l;
				base_indent_str = s;
			}
			else if (l < base_indent) {
				base_indent = l;
				base_indent_str = s;
			}
		}
	}
	//console.log({txt, base_indent, base_indent_str});
	if (base_indent === -1) {
		base_indent = 0;
	}
	
	let re_str = (new Array(indent + 1)).join(' ');
	let re = new RegExp('^' + base_indent_str);
	
	for (let i = 0; i < lines.length; i++) {
		lines[i] = lines[i].replace(re, re_str);
	}
	
	txt = lines.join('\n');
	//console.log("reindented:", {txt, indent, base_indent, re, re_str});
	
	return txt + '\n';
}



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
			//console.log({id, idstr, slot})
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

		let desc_re = /^ +-- +([^ \r\n][^]+?)\n(:?(:?\s*- (:?~~)?\*\*)|(:?\s*- ~~)|(:?\s*- http)|(:?\s*- other)|(:?\s*- ZeroMQ)|(:?\s*- LMDB)|(:?\s*- see also)|(:?\s*- \[Manticore\])|[#*-]|$)/;

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



