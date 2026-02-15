# Generate the parser from grammar.js
build *args='':
    tree-sitter generate {{ args }}

# Run tree-sitter tests
test: build
    tree-sitter test

# Remove generated files
clean:
    rm -rf src/
