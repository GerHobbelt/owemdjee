#! /bin/bash

git reset --hard

/z/tools/git_pull_push.sh -p

/z/tools/merge_tracked_git_original_4_branch.sh -m

git reset --hard
