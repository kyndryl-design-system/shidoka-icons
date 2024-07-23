# Contributing

## Scripts

```bash
# install
npm i

# run storybook
npm run dev

# build
npm run build
```

## Guidelines

1. Commits
   1. Commit messages MUST use [Conventional Commit format](https://www.conventionalcommits.org).
   1. [Certain commit types](https://semantic-release.gitbook.io/semantic-release/#commit-message-format) like `fix:` (patch), `feat:` (minor), and `perf:` (major) or `BREAKING CHANGE:` (in the commit body or footer, major), will automatically trigger a release to publish a new package and update the semantic version.
   1. [Conventional Commits Cheat Sheet](https://gist.github.com/Zekfad/f51cb06ac76e2457f11c80ed705c95a3)
   1. Git hooks are installed to enforce commit message formatting with commitlint, and code formatting with Prettier.
1. Branching
   1. `main` branch is for stable/current version changes.
   1. `beta` branch is for minor version/prerelease.
   1. `next` branch is for major version/prerelease/breaking changes.
   1. Prefix your branch names based on the type of change, ex `feat/` or `fix/`.
   1. Use the [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow).
      ![image](https://i0.wp.com/build5nines.com/wp-content/uploads/2018/01/GitHub-Flow.png)
1. Code Review
   1. Always have someone peer review your PR.
   1. Status checks must pass.
   1. Strongly recommend using the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) to ensure consistent formatting.
1. Releases
   1. Releases will trigger automatically when the right commit messages are pushed to `main`, `beta`, or `next`.
   1. All testing must be done on the PR level before merging, since the release will happen automatically after merge.
1. Adding Icons
   1. Export icons from Figma using the SVG Export plugin.
      1. There are presets for Monochrome and Duotone.
   1. Add the new icon definitions to `manifest/icons.json`.
   1. Examine your icon in Storybook to make sure it works properly.

## Third-Party Docs Reference

1. [Lit](https://lit.dev/docs/)
1. [Storybook](https://storybook.js.org/docs)
