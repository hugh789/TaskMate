## helpful git commands


#### how to pull others code changes when working in your branch

Check your current directory before pulling latest changes from Main branch.

```
-- stash your unsaved work.
git stash save <message>
git stash save "wip"

-- go to main branch
git checkout main

-- pull latest files from origin (remote)
git pull

-- go back to my working branch
git checkout <branch> 
git checkout susmitha

-- copy files from main to my working branch (resolve conflicts if any)
git rebase main

-- unstash your work
git stash pop
```