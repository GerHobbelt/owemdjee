//
// 🔗 🌐 📁 🗃️
//

const path = require("path");
const fs = require("fs");











let txt = fs.readFileSync("README.md.source", "utf8");

txt = txt.replace(/\t/g, '    ');

const split_re = /<!-- \*split\* -->/g;
const toc_re = /<!-- \*toc([^*]*)\* -->/g;

let arr = txt.split(split_re);

console.log({arr, count: arr.length});

const heading_re = /^(#+)\s+(.*)$/m;

let unique_dict = {};

arr = arr.map(function (chunk) {
	let m = heading_re.exec(chunk);
	let heading = m[2];
	let depth = m[1].length;
	
	const short_heading_re = /^([^(]+)/;
	let sm = short_heading_re.exec(heading);
	let short_heading = sm[1].trim();
	
	// clean up the heading and restrict it to a width *near* 60 so we don't end up with useless long filenames...
	let filename = short_heading.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^(.{1,60}[^-]*)-.*$/, '$1').replace(/(?:^-)|(?:-$)/g, '');
	
	// clean up the heading and turn it into a github-style in-page bookmark...
	let bookmark = `#` + heading.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/(?:^-)|(?:-$)/g, '');

	let tocm = toc_re.exec(chunk);
	
	console.log({heading, depth, short_heading, filename, tocm});
	
	if (unique_dict[filename]) {
		throw `\nHeading is ambiguous:\n\n    ${m[0]}\n\n`;
	}
	unique_dict[filename] = true;
	
	return {
		chunk,
		filename,
		bookmark,
		depth,
		heading,
		short_heading,
		has_toc: tocm != null,
		toc_spans: get_TOC_span(chunk, tocm, toc_re), 
		toc_attr: tocm ? tocm[1].replace(/[:-]/g, '') : '',
	};
});

// hardcode 0'th filename:
arr[0].filename = 'README';

// prefix all other filenames with their numeric index, padded to 4 digits: 
for (let i = 1; i < arr.length; i++) {
	let prefix = `0000` + i;
	arr[i].filename = prefix.substring(prefix.length - 4) + '-' + arr[i].filename;
}

//console.log({arr: arr.filter(function (spec) { return spec.has_toc; }), count: arr.length});
console.log({arr, count: arr.length});



// write the chunks to files (and generate the embedded TOCs while we do this):

for (let i = 0; i < arr.length; i++) {
	let spec = arr[i];
	//console.log({spec, i});
	
	let fpath = (i == 0 ? `./${ spec.filename }.md` : `./0000-index/${ spec.filename }.md`);
	
	console.log({fpath, i});
	
	let txt = get_text_and_generate_TOCs_if_any(spec, arr, i);
	
	fs.writeFileSync(fpath, txt, "utf8");
}


	





function get_TOC_span(src, re_match, base_re, main_txt) {
	let rv = [];
	
	while (re_match != null) {
		let span_re = /^([\s\r\n]*\*[^\n]+)+/s;
		let idx = base_re.lastIndex; // + re_match[0].length;
		let s = src.substring(idx);
		let m = span_re.exec(s);
		console.log({src, re_match, base_re, startIndex: base_re.lastIndex, idx, s, m});
		if (m) {
			rv.push({
				idx,
				match: m[0],
				length: m[0].length,
			});
		}
		else {
			rv.push({
				idx,
				match: null,
				length: 0,
			});
		}
		
		re_match = base_re.exec(src);
	}
	
	console.log({rv, len: rv.length});
	return rv.length > 0 ? rv : null;
}

function get_text_and_generate_TOCs_if_any(spec, arr, i) {
	let txt = spec.chunk;
	
	if (!spec.has_toc)
		return txt;
	
	console.log({spec, i});
	throw 1;
	return txt;
}
	
