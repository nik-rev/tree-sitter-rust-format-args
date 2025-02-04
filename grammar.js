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
    format_string: ($) =>
      seq(
        $.text,
        repeat(
          seq(
            choice(alias("{{", $.escaped), alias("}}", $.escaped), $.format),
            $.text,
          ),
        ),
      ),

    format: ($) =>
      seq(
        "{",
        optional($.argument),
        optional(
          seq(
            alias(":", $.colon),
            seq(
              optional(seq(optional($.fill), $.align)),
              optional($.sign),
              optional("#"),
              optional(alias("0", $.number)),
              optional(alias($.count, $.width)),
              optional(alias(seq(".", choice($.count, "*")), $.number)),
              optional($.type),
            ),
          ),
        ),
        "}",
      ),

    escaped: () => "escaped",
    width: () => "width",
    number: () => "number",
    colon: () => "colon",

    fill: () => choice(/[^0]/, "0"),

    align: () => choice("<", "^", ">"),

    sign: () => choice("+", "-"),
    type: ($) =>
      choice("?", "x?", "X?", "o", "x", "X", "p", "b", "e", "E", $.identifier),

    count: ($) => choice(alias($.integer, $.number), $.parameter),

    parameter: ($) => seq($.argument, "$"),

    argument: ($) => choice($.integer, $.identifier),

    text: () => /[^\{\}]*/,

    integer: () => /\d+/,

    identifier: () => /[_a-zA-Z][_a-zA-Z0-9]*/,
  },
});
