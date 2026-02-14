# Generate the parser from grammar.js
build:
    tree-sitter generate

# Run tree-sitter tests
test: build
    tree-sitter test

# Remove generated files
clean:
    rm -rf src/
