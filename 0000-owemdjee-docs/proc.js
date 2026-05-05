// take the list of modules and find their READMEs, append them as a start for their TL;DR descriptions for the overview README.

let fs = require('fs');
let path = require('path');

let src = fs.readFileSync('undoc.txt', 'utf8');

let lines = src.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);

let repos = lines.map((l) => l.replace(/^DIR: \*\*([^*]+)\*\*.*$/, '$1'));


//console.log({lines, repos})


let content = lines.map((l, i) => {
	let repo_path = repos[i];

	l = l.replace(/^.*?-- /, '');

	const dirs = [ null, 'docs', 'doc' ];
	for (let dir of dirs) {
		let read_path = repo_path;
		if (dir != null)
			read_path += '/' + dir;
		
		let f = `${ read_path }/README.md`;
		if (fs.existsSync(f)) {
			console.log("README found!", {l, read_path, f})
			return {l, repo_path: read_path, f};
		}
		const exts = [ 'md', 'rst', 'markdown', 'txt', 'html', 'asciidoc', null ];
		for (let ext of exts) {
			if (ext == null)
				ext = '';
			else ext = '.' + ext;
			
			f = `${ read_path }/README${ ext }`;
			if (fs.existsSync(f)) {
				console.log("README found!", {l, read_path, f})
				return {l, repo_path: read_path, f};
			}
		}
	}
	
	console.log("*** no README found ***", {l, repo_path})
	return {l, repo_path};
})
.map((rec) => {
	if (rec.f) {
		rec.content = fs.readFileSync(rec.f, 'utf8');
	}
	return rec;
});

content.sort((a, b) => {
	if (!!a.content !== !!b.content)
		return !!a.content > !!b.content ? 1 : -1;

	let rv = a.l.localeCompare(b.l);
	return rv;
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

		
//console.log({content})

console.log("**Done**    --> File 'undoc.out.md' has been updated.");

fs.writeFileSync('undoc.out.md', output.join('\n'), 'utf8');



		
		



