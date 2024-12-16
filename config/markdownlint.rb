# Enable all rules; we'll configure some of them below.
all

# MD001: Header levels should only increment by one level at a time.
# Normally, this is a fair rule, but it does not quite work for our cases,
# especially in our humongous functions list. So disable it.
exclude_rule 'MD001'

# MD002: First header should be a top level header.
# Some files do not have a top-level header, because it doesn't make sense for
# them, or just looks incredibly stupid on the rendered page. So disable this
# entire rule.
exclude_rule 'MD002'

# MD004: Unordered list style.
# Use dashes for unordered lists. All lists. Even sublists.
rule 'MD004', :style => :dash

# MD013: Line length.
# Allow lines to be up to 120 characters long, see the .editorconfig file.
# We also ignore code blocks, because they are often long and should not be
# wrapped at all. Same goes for tables.
rule 'MD013', :line_length => 120, :ignore_code_blocks => true, :tables => false

# MD024: Multiple headers with the same content.
# Allow multiple headers with the same content so long they are under different
# parent headers.
rule 'MD024', :allow_different_nesting => true

# MD026: Trailling punctuation in header.
# Allow question marks (FAQ-style).
rule 'MD026', :punctuation => '.,;:!'

# MD029: Ordered list item prefix.
# Should increase in numerical order.
rule 'MD029', :style => :ordered

# MD033: Inline HTML.
# Allow certain HTML elements, because we use them for nicer page layout.
rule 'MD033', :allowed_elements => 'center, div, sup, br, kbd'

# MD037: Spaces inside emphasis markers.
# This rule is broken. See https://github.com/markdownlint/markdownlint/issues/84
exclude_rule 'MD037'

# MD041: First line in file should be a top-level header.
# See comment to MD002. It makes no sense to set this to H2 for similar reasons,
# we have TOML frontmatter with an automatic h1 in the rendered page.
exclude_rule 'MD041'
