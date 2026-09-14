# Git Repository Beginner Guide

This project uses Git to keep `main` stable while allowing changes to be developed and reviewed safely in separate branches.

---

## 1. Basic Branch Structure

The main branch should contain the stable version:

```text
main
 │
 ├── review/current-changes
 │
 ├── fix/api-cancellation
 │
 └── feature/new-dashboard
```

### Recommended meaning

- `main` → stable version
- `review/current-changes` → current work that needs review
- `fix/...` → bug fixes
- `feature/...` → new features

Do not work directly on `main unless the change is small and you intentionally want it there.

---

# 2. Check Your Current Branch

Always check before doing Git operations:

```bash
git branch --show-current
```

or:

```bash
git status
```

Example:

```text
On branch review/current-changes
```

---

# 3. See All Branches

```bash
git branch
```

Example:

```text
* review/current-changes
  main
```

The `*` shows the branch you are currently using.

To also see remote branches:

```bash
git branch -a
```

---

# 4. Switch to Main

If you are currently on another branch:

```bash
git switch main
```

Then update it from GitHub:

```bash
git pull origin main
```

Your current project is now using `main`.

---

# 5. Switch Back to a Review Branch

For example:

```bash
git switch review/current-changes
```

Then:

```bash
git pull origin review/current-changes
```

---

# 6. Create a New Branch

Before creating a new branch, make sure you are starting from the correct branch.

For a new feature based on the latest `main`:

```bash
git switch main
git pull origin main
git switch -c feature/my-new-feature
```

Example:

```bash
git switch -c feature/dashboard-search
```

---

# 7. Save Current Changes in a New Branch

If you are currently working on `main` but realize:

> "These changes need to be reviewed before going into main."

You can create a branch without losing your current changes:

```bash
git switch -c review/current-changes
```

Your existing uncommitted changes stay with you.

Then check:

```bash
git status
```

Commit them:

```bash
git add .
git commit -m "Save current changes for review"
```

Push the branch:

```bash
git push -u origin review/current-changes
```

---

# 8. Review Your Changes

Switch to the review branch:

```bash
git switch review/current-changes
```

See what changed compared with `main`:

```bash
git diff main...review/current-changes
```

You can also see commits:

```bash
git log --oneline main..review/current-changes
```

This is useful for checking exactly what will eventually go into `main`.

---

# 9. If the Review Is Good → Merge Into Main

First make sure your review branch is committed:

```bash
git status
```

Then switch to `main`:

```bash
git switch main
```

Update `main`:

```bash
git pull origin main
```

Merge the reviewed branch:

```bash
git merge review/current-changes
```

If there are no conflicts, push:

```bash
git push origin main
```

The result:

```text
review/current-changes
          │
          │ merge
          ▼
        main
```

---

# 10. Recommended GitHub Workflow

If using GitHub, an even better workflow is:

```text
main
  │
  └── review/current-changes
            │
            ▼
      Pull Request
            │
         Review
            │
            ▼
          main
```

Instead of immediately merging locally, push the branch:

```bash
git push -u origin review/current-changes
```

Then create a Pull Request on GitHub:

```text
review/current-changes → main
```

Review the changes before clicking **Merge**.

This is especially useful when your current changes are large or still being tested.

---

# 11. If the Changes Are Bad → Roll Back

There are several meanings of "rollback."

## A. Just return to main

If you simply want to stop working on the review branch:

```bash
git switch main
```

Your review branch is still preserved.

Nothing is deleted.

---

## B. Delete the Review Branch After Deciding You Don't Need It

First switch to main:

```bash
git switch main
```

Then delete the local branch:

```bash
git branch -d review/current-changes
```

If Git says the branch has unmerged changes and you are absolutely sure you don't need them:

```bash
git branch -D review/current-changes
```

Be careful with `-D` because it can discard commits that exist only on that branch.

If the branch was also pushed to GitHub:

```bash
git push origin --delete review/current-changes
```

---

# 12. If You Want to Undo the Merge

If you already merged into `main` and pushed it, **do not immediately use `git reset --hard` on a shared repository.**

The safer approach is usually to create a revert commit.

Find the merge commit:

```bash
git log --oneline
```

Then:

```bash
git revert -m 1 <merge-commit>
```

Then:

```bash
git push origin main
```

This keeps the Git history intact while undoing the changes.

---

# 13. If You Have Uncommitted Changes and Want to Temporarily Switch Branches

Check:

```bash
git status
```

If the changes are not ready to commit, use:

```bash
git stash
```

Switch branches:

```bash
git switch main
```

Later return:

```bash
git switch review/current-changes
```

Restore the changes:

```bash
git stash pop
```

---

# 14. Keep Main Stable

A good rule:

```text
main
↓
Stable / tested code
```

Work on:

```text
feature/...
fix/...
review/...
```

Then merge into `main` only after testing.

For example:

```text
main
 │
 └── review/current-changes
       │
       ├── API changes
       ├── Dashboard changes
       └── Error handling changes
                │
                ▼
              Test
                │
                ▼
             Review
                │
                ▼
            Merge main
```

---

# 15. Daily Workflow

## Starting work

```bash
git switch main
git pull origin main
```

Create or switch to your work branch:

```bash
git switch review/current-changes
```

---

## While working

Check changes:

```bash
git status
```

Save your work:

```bash
git add .
git commit -m "Describe what changed"
```

Push:

```bash
git push
```

---

## Before merging

Compare against main:

```bash
git diff main...review/current-changes
```

Test the application.

If everything is good:

```bash
git switch main
git pull origin main
git merge review/current-changes
git push origin main
```

---

# 16. Recommended Branch Names

Use names that describe the purpose.

### Features

```text
feature/dashboard-search
feature/user-management
feature/api-integration
```

### Bug fixes

```text
fix/api-timeout
fix/login-error
fix/dashboard-loading
```

### Review / experimental work

```text
review/current-changes
review/api-refactor
review/dashboard
```

Avoid names like:

```text
test
new
branch1
asdf
changes
```

because they become difficult to understand later.

---

# 17. Important Commands Cheat Sheet

| Task                     | Command                          |
| ------------------------ | -------------------------------- |
| Check status             | `git status`                     |
| Current branch           | `git branch --show-current`      |
| List branches            | `git branch`                     |
| Switch branch            | `git switch branch-name`         |
| Create branch            | `git switch -c branch-name`      |
| Update branch            | `git pull`                       |
| See changes              | `git diff`                       |
| Stage changes            | `git add .`                      |
| Commit                   | `git commit -m "message"`        |
| Push                     | `git push`                       |
| Push new branch          | `git push -u origin branch-name` |
| Compare with main        | `git diff main...branch-name`    |
| Merge branch             | `git merge branch-name`          |
| Delete local branch      | `git branch -d branch-name`      |
| Temporarily save changes | `git stash`                      |
| Restore stashed changes  | `git stash pop`                  |

---

# 18. Recommended Workflow for This Project

For your current project, use:

```text
main
 │
 │ latest stable version
 │
 └── review/current-changes
          │
          ├── current dashboard work
          ├── API error handling
          ├── request cancellation
          └── other changes being reviewed
```

When you want to work normally:

```bash
git switch main
```

When you want to continue the current work:

```bash
git switch review/current-changes
```

When the work is finished:

```bash
git switch main
git pull origin main
git merge review/current-changes
git push origin main
```

After you are completely finished with the review branch, you can delete it.

---

# 19. Golden Rule

Before running any destructive Git command, check:

```bash
git status
git branch --show-current
```

If you are unsure what a command will do, **don't run it yet**.

In particular, be careful with:

```bash
git reset --hard
git clean
git branch -D
git push --force
```

These can permanently remove work.

For a beginner workflow, prefer:

```text
main = stable
branch = work
commit = save point
push = backup/share
Pull Request = review
merge = put reviewed work into main
revert = safely undo a merged change
```
