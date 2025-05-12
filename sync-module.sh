#! /bin/bash
#
# WARNING/NOTE: for bulk processing of the submodules, use the 
#
#     track-subrepos.sh
#
# shell script instead!
#
# -------------------------------------------------------------------
#
# Purpose of this script:
#
# to be used as a utility script command line argument in
#
#     gpp -1x   $( realpath ./sync-module.sh )
#
# i.e.
#
#     /z/tools/git_pull_push.sh -1x    $( realpath ./sync-module.sh )
#

git reset --hard

/z/tools/git_pull_push.sh -p

/z/tools/merge_tracked_git_original_4_branch.sh -m 5

git reset --hard
