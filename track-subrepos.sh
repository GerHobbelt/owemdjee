#! /bin/bash
#
# track the 'original' remotes of each submodule and auto-merge whenever possible, in order to keep up to date with the original "vanilla" repo of each.
#

GPP=/z/tools/git_pull_push.sh
SCRIPT=$( basename "$0" )

if [ "$1" != "TRACK-AND-MERGE" ] ; then
	${GPP} -1x "$( realpath "$0" )" TRACK-AND-MERGE
else
	echo "PWD = $( pwd )"
	if [ -f ${SCRIPT} ] ; then
		echo "Skipping base directory..."
	else
		git reset --hard
		${GPP} -p
		/z/tools/merge_tracked_git_original_4_branch.sh -m
		git reset --hard
	fi
fi
