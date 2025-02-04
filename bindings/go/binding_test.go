package tree_sitter_rustfmt_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_rustfmt "github.com/nik-rev/tree-sitter-rustfmt/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_rustfmt.Language())
	if language == nil {
		t.Errorf("Error loading RustFmt grammar")
	}
}
