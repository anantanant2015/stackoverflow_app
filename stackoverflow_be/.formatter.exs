# .formatter.exs
[
  inputs: [
    "{mix,.formatter}.exs",
    "lib/**/*.{ex,exs}",
    "test/**/*.{ex,exs}",
    "config/**/*.{ex,exs}"
  ],
  # optional - common DSLs to avoid parens
  locals_without_parens: [
    # your custom functions/macros here
  ]
]
