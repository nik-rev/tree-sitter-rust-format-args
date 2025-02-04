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
Numbers: {:e} {:E} {:+} {: } {:-}
Escape: {{ these are literal }}
```

Will be parsed as this tree:

````
(format_string [0, 0] - [8, 0]
  (text [0, 0] - [0, 7])
  (format [0, 7] - [0, 9])
  (text [0, 9] - [1, 15])
  (format [1, 15] - [1, 24]
    (argument [1, 16] - [1, 23]
      (identifier [1, 16] - [1, 23])))
  (text [1, 24] - [2, 23])
  (format [2, 23] - [2, 28]
    (colon [2, 24] - [2, 25])
    (align [2, 25] - [2, 26])
    (width [2, 26] - [2, 27]
      (number [2, 26] - [2, 27])))
  (text [2, 28] - [2, 29])
  (format [2, 29] - [2, 35]
    (colon [2, 30] - [2, 31])
    (fill [2, 31] - [2, 32])
    (align [2, 32] - [2, 33])
    (width [2, 33] - [2, 34]
      (number [2, 33] - [2, 34])))
  (text [2, 35] - [2, 36])
  (format [2, 36] - [2, 42]
    (colon [2, 37] - [2, 38])
    (fill [2, 38] - [2, 39])
    (align [2, 39] - [2, 40])
    (width [2, 40] - [2, 41]
      (number [2, 40] - [2, 41])))
  (text [2, 42] - [3, 17])
  (format [3, 17] - [3, 24]
    (colon [3, 18] - [3, 19])
    (width [3, 19] - [3, 21]
      (number [3, 19] - [3, 21]))
    (number [3, 21] - [3, 22])
    (number [3, 22] - [3, 23]
      (number [3, 22] - [3, 23])))
  (text [3, 24] - [4, 24])
  (format [4, 24] - [4, 28]
    (colon [4, 25] - [4, 26])
    (type [4, 26] - [4, 27]))
  (text [4, 28] - [4, 29])
  (format [4, 29] - [4, 33]
    (colon [4, 30] - [4, 31])
    (type [4, 31] - [4, 32]))
  (text [4, 33] - [4, 34])
  (format [4, 34] - [4, 38]
    (colon [4, 35] - [4, 36])
    (type [4, 36] - [4, 37]))
  (text [4, 38] - [5, 7])
  (format [5, 7] - [5, 11]
    (colon [5, 8] - [5, 9])
    (type [5, 9] - [5, 10]))
  (text [5, 11] - [5, 12])
  (format [5, 12] - [5, 17]
    (colon [5, 13] - [5, 14])
    (type [5, 15] - [5, 16]))
  (text [5, 17] - [5, 18])
  (format [5, 18] - [5, 28]
    (argument [5, 19] - [5, 24]
      (identifier [5, 19] - [5, 24]))
    (colon [5, 24] - [5, 25])
    (type [5, 26] - [5, 27]))
  (text [5, 28] - [6, 9])
  (format [6, 9] - [6, 13]
    (colon [6, 10] - [6, 11])
    (type [6, 11] - [6, 12]))
  (text [6, 13] - [6, 14])
  (format [6, 14] - [6, 18]
    (colon [6, 15] - [6, 16])
    (type [6, 16] - [6, 17]))
  (text [6, 18] - [6, 19])
  (format [6, 19] - [6, 23]
    (colon [6, 20] - [6, 21])
    (sign [6, 21] - [6, 22]))
  (text [6, 23] - [6, 24])
  (format [6, 24] - [6, 28]
    (colon [6, 25] - [6, 26]))
  (text [6, 28] - [6, 29])
  (format [6, 29] - [6, 33]
    (colon [6, 30] - [6, 31])
    (sign [6, 31] - [6, 32]))
  (text [6, 33] - [7, 8])
  (escaped [7, 8] - [7, 10])
  (text [7, 10] - [7, 29])
  (escaped [7, 29] - [7, 31])
  (text [7, 31] - [8, 0]))```
````
