# tree-sitter-rust-format-args

A grammar for Rust's `format_args!`.

## Why?

It's desirable to have syntax highlighting for arguments in format macros, like `format!`, `write!`, etc.

[tree-sitter-rust decided not to add this feature to their parser](https://github.com/tree-sitter/tree-sitter-rust/pull/164), so this grammar exists to be separately used and injected by editors in Rust.

## Showcase

Editor: [Helix](https://github.com/helix-editor/helix)

![image](https://github.com/user-attachments/assets/d2b06b05-d922-443f-af31-0bf7219526cb)

It can parse the [`format_args!` spec](https://doc.rust-lang.org/std/fmt/index.html#syntax)
