#ifndef TREE_SITTER_RUSTFMT_H_
#define TREE_SITTER_RUSTFMT_H_

typedef struct TSLanguage TSLanguage;

#ifdef __cplusplus
extern "C" {
#endif

const TSLanguage *tree_sitter_rust_format_args(void);

#ifdef __cplusplus
}
#endif

#endif // TREE_SITTER_RUSTFMT_H_
