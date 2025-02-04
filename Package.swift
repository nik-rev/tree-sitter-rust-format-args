// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterRustFmt",
    products: [
        .library(name: "TreeSitterRustFmt", targets: ["TreeSitterRustFmt"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterRustFmt",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                // NOTE: if your language has an external scanner, add it here.
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterRustFmtTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterRustFmt",
            ],
            path: "bindings/swift/TreeSitterRustFmtTests"
        )
    ],
    cLanguageStandard: .c11
)
