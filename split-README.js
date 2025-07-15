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

	console.log({heading, depth, short_heading, filename});
	
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
		toc_spans: get_TOC_spans(chunk), 
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


	





function get_TOC_spans(src) {
	let rv = [];

	let re_match = toc_re.exec(src);
	while (re_match != null) {
		let attr = re_match[1].replace(/[:-]/g, '');
		
		let span_re = /^([\s\r\n]*\*[^\n]+)+/s;
		let idx = toc_re.lastIndex; // + re_match[0].length;
		let s = src.substring(idx);
		let m = span_re.exec(s);
		console.log({src, re_match, toc_re, startIndex: toc_re.lastIndex, idx, s, m});
		if (m) {
			rv.push({
				idx,
				match: m[0],
				length: m[0].length,
				attr
			});
		}
		else {
			rv.push({
				idx,
				match: null,
				length: 0,
				attr
			});
		}
		
		re_match = toc_re.exec(src);
	}
	
	console.log({rv, len: rv.length});
	return rv.length > 0 ? rv : null;
}

function get_text_and_generate_TOCs_if_any(spec, arr, idx) {
	let txt = spec.chunk;
	
	if (!spec.toc_spans)
		return txt;
	
	console.log({spec, idx, toc_spans: spec.toc_spans});
	
	let base_depth = spec.depth;
	for (let i = idx + 1; i < arr.length; i++) {
		let spec = arr[i];
		
		console.log({spec, i});
		
		if (spec.depth <= base_depth)
			break;
	


	}
	


	return txt;
}
	
