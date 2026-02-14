/**
 * @file Ungrammar grammar for tree-sitter
 * @author Philipp Mildenberger <philipp@mildenberger.me>
 * @author Amaan Qureshi <amaanq12@gmail.com>
 * @author b4D8 <hello@b4d8.fr>
 * @license MIT
 * @see {@link https://rust-analyzer.github.io/blog/2020/10/24/introducing-ungrammar.html|official syntax spec}
 */

module.exports = grammar({
  name: "ungrammar",

  extras: ($) => [$.comment, /\s/],

  conflicts: ($) => [[$.sequence]],

  word: ($) => $.identifier,

  rules: {
    grammar: ($) => repeat($.node),

    node: ($) => seq(alias($.identifier, $.definition), "=", $.rule),

    rule: ($) => $.alternation,

    _atom_rule: ($) =>
      choice(
        $.node_rule,
        $.token,
        $.generic_token,
        $.literal_token,
        $.label,
        seq("(", $.rule, ")"),
        $.repetition,
        $.optional,
      ),

    repetition: ($) => seq($._atom_rule, "*"),

    optional: ($) => seq($._atom_rule, "?"),

    node_rule: ($) => $.identifier,

    token: ($) => seq("'", $.token_identifier, "'"),

    generic_token: (_) => token(prec(1, seq("'#", /[a-zA-Z_]+/, "'"))),

    literal_token: (_) => token(prec(1, seq("'@", /[a-zA-Z_]+/, "'"))),

    label: ($) =>
      prec.left(1, seq(alias($.identifier, $.label_name), ":", $._atom_rule)),

    sequence: ($) => repeat1($._atom_rule),

    alternation: ($) => seq($.sequence, repeat(seq("|", $.sequence))),

    identifier: (_) => /[a-zA-Z_]+/,
    token_identifier: (_) => /(?:[^'\\]|\\\\|\\')+/,

    comment: (_) => token(seq("//", /.*/)),
  },
});
