import XCTest
import SwiftTreeSitter
import TreeSitterRustFmt

final class TreeSitterRustFmtTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_rustfmt())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading RustFmt grammar")
    }
}
