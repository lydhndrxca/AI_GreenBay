# Green Bay Planner -- Agent Instructions

## Project Management

This project uses **ShawnderPlanner** for planning, task tracking, and manual testing coordination.
The planner runs as a separate Electron app and syncs state via `data/planner-state.json`.

### MCP Integration

You have access to the `shawnder-planner` MCP server with these tools:

| Tool | When to use |
|------|-------------|
| `get_plan_overview` | Start of any session -- understand current state |
| `get_phase_detail` | Before working on a phase -- see all tasks |
| `get_pending_tests` | Check what the user needs to manually verify |
| `get_bug_reports` | See open bugs that need fixing |
| `update_task_status` | After completing a task |
| `add_test_items` | **After every change** -- add items for user to manually test |
| `add_tasks` | When planning breaks down work into tasks |
| `create_phase` | When creating a new project phase |
| `log_change` | After making any significant change |
| `update_bug_fix_status` | After fixing a reported bug |

### Workflow

1. **Start of session**: Call `get_plan_overview` to understand where the project stands.
2. **Before working**: Call `get_phase_detail` for the current phase to see what needs doing.
3. **After making changes**: ALWAYS call `add_test_items` with specific, manual-testable items
   the user can verify. Be concrete: "Click the login button and verify redirect to dashboard"
   rather than "Test login works."
4. **After completing a task**: Call `update_task_status` to mark it done.
5. **Log everything**: Call `log_change` after any significant modification.
6. **Bug fixes**: When fixing a bug from `get_bug_reports`, call `update_bug_fix_status`
   with 'fix-implemented' when done.

### Manual Testing is Critical

The user verifies everything manually. After each change you make:
- Think about what could break or behave unexpectedly
- Create 3-5 specific, actionable test items
- Include exact steps: what to click, what to type, what to expect
- If there are edge cases, add those as separate test items

### Code Standards

- Keep changes focused and atomic -- one logical change per task
- If a change touches multiple files, list them in the log entry
- If you discover scope creep, call `create_phase` or `add_tasks` to capture it
  rather than silently expanding the current task
- When blocked, update the task status to 'blocked' with a note

## Files to Ignore

- `data/` -- ShawnderPlanner state files, managed by the planner app
- `.cursor/rules/planner-context.mdc` -- auto-generated, do not edit manually
