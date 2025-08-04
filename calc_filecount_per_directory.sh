#! /bin/bash


function report_on_tree {
	#echo "report_on_tree: $*"
	# args:    level, path
	for f in $( find "$2" -mindepth 1 -maxdepth 1 -type d ) ; do 
		report_on_dir "$1" "$f"
	done 
}

function report_on_dir {
	#echo "report_on_dir: $*"
	# args:    level, path
	COUNT=$( find "$2" -type f | wc -l )
	LVL=$(($1 + 1))
	#echo "level: $1 -> $LVL"
	printf "%3d:   %-60s   :: %d\\n"  "$1"  "$2"  "${COUNT}"
	if [ ${COUNT} -ge 1000 ] ; then
		report_on_tree $LVL "$2"
	fi
}

( 
	printf "%5s  %-60s   :: %s\\n"  "level"  "path"  "count"
	printf "%5s  %-60s   :: %s\\n"  "====="  "=========================================================="  "======="
	report_on_tree  1  ./
)   | tee filecount_per_dir.txt



