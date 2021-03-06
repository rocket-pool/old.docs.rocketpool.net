# Contribution Guidelines

Pull requests to this repository are welcome. If you have not worked with pull requests before, refer to [ this Github documentation page ]( https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests ).

## File structure

The documentation files are in `src/`, the `.md` files are rendered into the documentation webpage.

When writing markdown files you may use the `!!!include(./path/to/file.md)!!!` syntax to import markdown files into markdown files. The path used in `include` is relative to `src/`.