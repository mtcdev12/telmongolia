# Deployment rule

- Work locally by default.
- Never push changes to Git or deploy them to the Apache production server unless the user explicitly asks for that specific push or deployment.
- Do not run production `git pull`, builds, PM2 restarts, Apache restarts, or other server-changing commands without explicit deployment authorization from the user.
- A request to edit, fix, test, preview, or finish code is not deployment authorization.
- Before any authorized deployment, summarize exactly which files/commit will be deployed and exclude unrelated work such as chatbot or English-site changes unless the user explicitly includes them.
