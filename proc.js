// take the list of modules and find their READMEs, append them as a start for their TL;DR descriptions for the overview README.

let fs = require('fs');
let path = require('path');

let src = fs.readFileSync('undoc.txt', 'utf8');

let lines = src.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);

let repos = lines.map((l) => l.replace(/^.*?\*\*([^*]+)\*\*.*$/, '$1'))


console.log({lines, repos})


let content = lines.map((l, i) => {
	let repo = repos[i];
	
	let f = `${ repo }/README.md`;
	if (fs.existsSync(f)) {
		console.log("README found!", {l, repo, f})
		return {l, repo, f};
	}
	let repo_path = l.replace(/^.*\]\((\.\/[^)]+)\).*$/, '$1');
	let repo_path2 = l.replace(/^.*\]\((\.\.\/[^)]+)\).*$/, '$1');
	if (repo_path2.length < repo_path.length)
		repo_path = repo_path2;
	
	const exts = [ 'md', 'rst', 'markdown', 'txt', 'html', null ];
	for (let ext of exts) {
		if (ext == null)
			ext = '';
		else ext = '.' + ext;
		
		f = `${ repo_path }/README${ ext }`;
		if (fs.existsSync(f)) {
			console.log("README found!", {l, repo, repo_path, f})
			return {l, repo, repo_path, f};
		}
	}
	
	console.log("*** no README found ***", {l, repo})
	return {l, repo};
})
.map((rec) => {
	if (rec.f) {
		rec.content = fs.readFileSync(rec.f, 'utf8');
	}
	return rec;
});

let output = content.map((rec) => {
	if (rec.content) {
		return `
${ rec.l }

${ rec.content }































`;
	}
	
	return `
${ rec.l }























`;
});

		
console.log({content})

fs.writeFileSync('undoc.out.md', output.join('\n'), 'utf8');



		
		



