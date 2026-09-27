# Commit Naming Convention

This repository follows a strict versioning format for commit messages:

**`v[Major].[TaskNumber].[StepNumber]`**

For example: `v1.13.4 - Add AI discoverability and copy-summary feature`

## Breakdown

- **Major (`1`)**: Represents the major version of the project. A `1` indicates that the first version (MVP) is complete and the current development phase is ongoing.
- **TaskNumber (`13`)**: Represents the overall objective or feature currently being worked on. For instance, `13` refers to the 13th major task of the project (e.g., SEO and AI discoverability improvements).
- **StepNumber (`4`)**: Represents the sequential step or iteration within that specific task. For example, `4` means this is the fourth commit towards completing task `13`.

## Guidelines

- Every commit message MUST start with the version tag (e.g., `v1.13.4`).
- Include a brief, descriptive summary of what has been done immediately after the version tag.
- When starting a brand new task, increment the `TaskNumber` and reset the `StepNumber` to `1` (e.g., `v1.14.1`).
- When making iterative progress or fixes on the same task, increment only the `StepNumber` (e.g., `v1.14.2`).
