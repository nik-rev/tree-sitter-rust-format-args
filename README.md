# tree-sitter-rustfmt

A grammar for Rust's `format_args!`.

## Why?

It's desirable to have syntax highlighting for arguments in format macros, like `format!`, `write!`, etc.

[tree-sitter-rust decided not to add this feature to their parser](https://github.com/tree-sitter/tree-sitter-rust/pull/164), so this grammar exists to be separately used and injected by editors in Rust.

It can parse the [`format_args!` spec](https://doc.rust-lang.org/std/fmt/index.html#syntax), so for instance, the following contents:

```
empty: {}
variable name: {testing}
padding and alignment: {:>5} {:a<5} {:0^5}
floating points: {:10.2}
hexadecimal and binary: {:b} {:x} {:X}
debug: {:?} {:#?} {hello:#?}
Numbers: {:e} {:E} {.*} {:+} {: } {:-}
Escape: {{ these are literal }}
```

Will be parsed as this tree:

```
(format_string [0, 0] - [8, 0]
  (text [0, 0] - [0, 7])
  (format [0, 7] - [0, 9])
  (text [0, 9] - [1, 15])
  (format [1, 15] - [1, 24]
    (argument [1, 16] - [1, 23]
      (identifier [1, 16] - [1, 23])))
  (text [1, 24] - [2, 23])
  (format [2, 23] - [2, 28]
    (align [2, 25] - [2, 26])
    (width [2, 26] - [2, 27]
      (integer [2, 26] - [2, 27])))
  (text [2, 28] - [2, 29])
  (format [2, 29] - [2, 35]
    (fill [2, 31] - [2, 32])
    (align [2, 32] - [2, 33])
    (width [2, 33] - [2, 34]
      (integer [2, 33] - [2, 34])))
  (text [2, 35] - [2, 36])
  (format [2, 36] - [2, 42]
    (fill [2, 38] - [2, 39])
    (align [2, 39] - [2, 40])
    (width [2, 40] - [2, 41]
      (integer [2, 40] - [2, 41])))
  (text [2, 42] - [3, 17])
  (format [3, 17] - [3, 24]
    (width [3, 19] - [3, 21]
      (integer [3, 19] - [3, 21]))
    (count [3, 22] - [3, 23]
      (integer [3, 22] - [3, 23])))
  (text [3, 24] - [4, 24])
  (format [4, 24] - [4, 28]
    (type [4, 26] - [4, 27]))
  (text [4, 28] - [4, 29])
  (format [4, 29] - [4, 33]
    (type [4, 31] - [4, 32]))
  (text [4, 33] - [4, 34])
  (format [4, 34] - [4, 38]
    (type [4, 36] - [4, 37]))
  (text [4, 38] - [5, 7])
  (format [5, 7] - [5, 11]
    (type [5, 9] - [5, 10]))
  (text [5, 11] - [5, 12])
  (format [5, 12] - [5, 17]
    (type [5, 15] - [5, 16]))
  (text [5, 17] - [5, 18])
  (format [5, 18] - [5, 28]
    (argument [5, 19] - [5, 24]
      (identifier [5, 19] - [5, 24]))
    (type [5, 26] - [5, 27]))
  (text [5, 28] - [6, 9])
  (format [6, 9] - [6, 13]
    (type [6, 11] - [6, 12]))
  (text [6, 13] - [6, 14])
  (format [6, 14] - [6, 18]
    (type [6, 16] - [6, 17]))
  (text [6, 18] - [6, 19])
  (format [6, 19] - [6, 23]
    (ERROR [6, 20] - [6, 22]))
  (text [6, 23] - [6, 24])
  (format [6, 24] - [6, 28]
    (sign [6, 26] - [6, 27]))
  (text [6, 28] - [6, 29])
  (format [6, 29] - [6, 33])
  (text [6, 33] - [6, 34])
  (format [6, 34] - [6, 38]
    (sign [6, 36] - [6, 37]))
  (text [6, 38] - [7, 8])
  (escaped [7, 8] - [7, 10])
  (text [7, 10] - [7, 29])
  (escaped [7, 29] - [7, 31])
  (text [7, 31] - [8, 0]))
```
