//
// 🔗 🌐 📁 🗃️
//

const path = require("path");
const fs = require("fs");

let txt = fs.readFileSync("README.md", "utf8");
let module_spec = fs.readFileSync(".gitmodules", "utf8");
let module_spec2 = fs.readFileSync("../../.gitmodules", "utf8");

module_spec = module_spec.replace(/[\s\r\n]+/g, ' ');
module_spec2 = module_spec2.replace(/[\s\r\n]+/g, ' ');

let mod_re = /\[submodule "([^"]+)"] path = ([^ ]+) url = ([^ ]+) /g;

let dict = {};

let m = mod_re.exec(module_spec);
while (m) {
	m.input = null;
	// https://github.com/GerHobbelt/zlib-ng
	//console.log({m})
	let repo = m[3];
	let url = repo.replace(/git@github.com:GerHobbelt/, `https://github.com/GerHobbelt/`).replace(/\.git$/, '');
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
		console.log({id, key2, localdir, repo, url })
	}
	if (dict[key2.toLowerCase()] == undefined) {
		dict[key2.toLowerCase()] = { id, key2, localdir, repo, url };
		console.log({id, key2, localdir, repo, url })
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
		console.log({id, key2, localdir, repo, url })
	}
	if (dict[key2.toLowerCase()] == undefined) {
		dict[key2.toLowerCase()] = { id, key2, localdir, repo, url };
		console.log({id, key2, localdir, repo, url })
	}
	
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
		console.log({m, p1, p2});
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
		console.log({ s })
	
		modified = true;
		
		return s;
	})
	.replace(/~~\[([^\s🔗🌐📁🗃️]+)\]\((http[^)]+)\)/g, function r(m, p1, p2) {
		console.log({m, p1, p2});
		let s = `~~**${ p1 }** [🌐](${ p2 })`;
		console.log({ s })
	
		modified = true;
		
		return s;
	});
}

// hotfixes:
txt = txt
.replace(/https:\/\/github.com\/GerHobbelt\/\//g, `https://github.com/GerHobbelt/`)
.replace(/\(git@github.com:GerHobbelt\/([^\s]+)\.git\)/g, '(https://github.com/GerHobbelt/$1)')



// sort the overview list alphabetically:
txt = txt.replace(/(# Libraries in this collection \(All[^\n]+)([^]+)(## Libraries not available[^\n]+)/, function r(m, p1, p2, p3) {
	p2 = '\n' + p2 + '\n';
	let a = p2.split(/\n- /).map((l) => l.trim()).filter((l) => l.length !== 0);
	let b = a.map((l, i) => {
		return { line: l.replace(/[^a-z0-9]/gi, '').toLowerCase(), index: i, origline: l };
	});
	b.sort((a, b) => {
		return a.line.localeCompare(b.line);
	});
	// remove duplicate entries!
	b.filter((l, i) => {
		return (i > 0 && b[i - 1].line === l.line);
	})
	let s = b.map((l) => '- ' + l.origline).join('\n');
	console.log({ b, s });
	return p1 + '\n\n' + s + '\n\n\n\n\n\n\n\n' + p3;
});

fs.writeFileSync("README.md", txt, "utf8");
