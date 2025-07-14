/**
 * @file A grammar for Rust's std::fmt formatting language
 * @author Nik Revenco <pm@nikrev.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

// NOTE: matches the empty string, so cannot be a rule
// 
// format_spec := [[fill]align][sign]['#']['0'][width]['.' precision][type]
const format_spec = $ => seq(
  optional(seq(optional($.fill), $.align)),
  optional($.sign),
  optional("#"),
  optional("0"),
  optional($.width),
  optional(seq(".", $.precision)),
  optional($.type),
);

module.exports = grammar({
  name: "rust_format_args",

  // syntax: https://doc.rust-lang.org/std/fmt/index.html#syntax
  rules: {
    // format_string := text [ maybe_format text ] *
    format_string: $ =>
      seq(
        $.text,
        repeat(
          seq(
            $._maybe_format,
            $.text,
          ),
        ),
      ),

    // maybe_format := '{' '{' | '}' '}' | format
    _maybe_format: $ => choice($.escaped, $.format),
    escaped: $ => choice("{{", "}}"),

    // FIXME: `{: }` is syntactically valid, because the `format_spec`
    // can match the empty string. However, our grammar generates an ERROR
    // 
    // format := '{' [ argument ] [ ':' format_spec ] [ ws ] * '}'
    format: ($) =>
      seq(
        "{",
        optional($.argument),
        optional(
          seq(
            $.colon,
            format_spec($),
          ),
        ),
        repeat($._ws),
        "}",
      ),
    colon: $ => ":",

    // argument := integer | identifier
    argument: $ => choice($.integer, $.identifier),

    // NOTE: Have to do it in a weird way, otherwise
    // tree-sitter generates some ERROR nodes
    // 
    // fill := character
    fill: _ => choice(/[^0]/, "0"),

    // align := '<' | '^' | '>'
    align: _ => choice("<", "^", ">"),

    // sign := '+' | '-'
    sign: _ => choice("+", "-"),

    // width := count
    width: $ => $.count,

    // precision := count | '*'
    precision: $ => choice($.count, "*"),

    // FIXME: Substituting the `$.identifier` in place of the
    // identifier characters breaks the grammar - it's as if
    // it is not there
    // 
    // type := '?' | 'x?' | 'X?' | identifier
    type: $ =>
      choice("?", "x?", "X?", "o", "x", "X", "p", "b", "e", "E"),

    // count := parameter | integer
    count: $ => choice($.parameter, $.integer),

    // parameter := argument '$'
    parameter: $ => seq($.argument, "$"),

    // ---

    // ws is any character for which `char::is_whitespace` returns true
    _ws: _ => /\s/,

    // text must not contain any '{' or '}' characters
    text: _ => /[^\{\}]*/,

    // integer is a decimal integer that may contain leading zeroes and must fit into a usize
    integer: _ => /\d+/,

    // identifier is an IDENTIFIER_OR_KEYWORD as defined by the Rust language reference
    identifier: _ => /[_a-zA-Z][_a-zA-Z0-9]*/,
  },
});
