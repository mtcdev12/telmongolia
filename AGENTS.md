# Deployment rule

- Work locally by default.
- Never push changes to Git or deploy them to the Apache production server unless the user explicitly asks for that specific push or deployment.
- Do not run production `git pull`, builds, PM2 restarts, Apache restarts, or other server-changing commands without explicit deployment authorization from the user.
- A request to edit, fix, test, preview, or finish code is not deployment authorization.
- Before any authorized deployment, summarize exactly which files/commit will be deployed and exclude unrelated work such as chatbot or English-site changes unless the user explicitly includes them.

## Apache production deployment procedure

- Authorized operations workbook: `/Users/angarag/Downloads/Program  documents.xlsx`. Read the Telecom Mongolia frontend row for the current host, ordinary login, project directory, and operational commands. Never copy passwords from the workbook into this file, Git, shell history, scripts, command arguments, or logs.
- Read the SSH host and ordinary login from the authorized operations workbook supplied by the user; do not copy credentials into this repository.
- Connect with the ordinary SSH account, then run `su` and obtain the root password through a secure interactive prompt.
- Never save passwords in Git, `AGENTS.md`, shell history, scripts, command-line arguments, or logs.
- Before changing production, inspect the branch and working tree. The production checkout may contain unrelated uncommitted work, so do not run `git pull`, reset, checkout, clean, or overwrite whole files when that work is present.
- Back up every production file that will change, then apply only the authorized patch while preserving unrelated server edits.
- Run the production build as root, restart only the `telmongolia` PM2 process, and verify its status is `online`.
- Verify the changed live pages and assets over HTTPS after the restart.
