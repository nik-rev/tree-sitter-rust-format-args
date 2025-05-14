package tree_sitter_rust-format-args_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_rust-format-args "github.com/nik-rev/tree-sitter-rust-format-args/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_rust-format-args.Language())
	if language == nil {
		t.Errorf("Error loading RustFmt grammar")
	}
}
