import XCTest
import SwiftTreeSitter
import TreeSitterRustFmt

final class TreeSitterRustFmtTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_rust-format-args())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading RustFmt grammar")
    }
}
