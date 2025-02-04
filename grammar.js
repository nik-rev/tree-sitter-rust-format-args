/**
 * @file A grammar for Rust's std::fmt formatting language
 * @author Nikita Revenco <pm@nikrev.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check
/**
 * @file A grammar for Rust's std::fmt formatting language
 * @author ...
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "rustfmt",

  rules: {
    // syntax: https://doc.rust-lang.org/std/fmt/index.html#syntax
    format_string: ($) => seq($.text, repeat(seq($.maybe_format, $.text))),

    maybe_format: ($) => choice("{{", "}}", $.format),

    format: ($) =>
      seq(
        "{",
        optional($.argument),
        optional(
          seq(
            ":",
            seq(
              optional(seq(optional($.fill), $.align)),
              optional($.sign),
              optional("#"),
              optional("0"),
              optional($.count),
              optional(seq(".", choice($.count, "*"))),
              optional($.type),
            ),
          ),
        ),
        "}",
      ),

    // this is actually optional, but we mark as repeat1 to avoid
    // tree-sitter complaining that it matches an empty string.
    //
    // Then, when we use this rule we add optional(...)

    fill: () => /./,

    align: () => choice("<", "^", ">"),

    sign: () => choice("+", "-"),

    // precision: ($) => ,

    // it can also be "", the empty string. But we don't put it here
    // otherwise tree-sitter will complain about matching the empty string.
    //
    // Instead, what we do is mark it as "optional" anywhere we use it
    type: ($) =>
      choice("?", "x?", "X?", "o", "x", "X", "p", "b", "e", "E", $.identifier),

    count: ($) => choice($.integer, $.parameter),

    parameter: ($) => seq($.argument, "$"),

    argument: ($) => choice($.integer, $.identifier),

    // primitives

    // text must not contain '{' or '}'
    text: () => /[^\{\}]*/,

    // any character for which char::is_whitespace returns true
    ws: () => /\s/,

    integer: () => /\d+/,

    identifier: () => /[_a-zA-Z][_a-zA-Z0-9]*/,
  },
});
