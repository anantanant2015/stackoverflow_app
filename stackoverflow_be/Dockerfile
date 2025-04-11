# ---- Build Stage ----
  FROM hexpm/elixir:1.18.3-erlang-26.2.2-ubuntu-jammy-20240109 as build

  RUN apt-get update && \
      apt-get install -y build-essential git curl npm && \
      mix local.hex --force && \
      mix local.rebar --force

  WORKDIR /app

  ENV MIX_ENV=prod

  COPY mix.exs mix.lock ./
  COPY config config
  RUN mix deps.get --only prod
  RUN mix deps.compile

  COPY assets assets
  RUN cd assets && npm install && npm run deploy
  RUN mix phx.digest

  COPY lib lib
  COPY priv priv
  RUN mix compile

  RUN mix release

  # ---- Release Stage ----
  FROM debian:bullseye-slim AS app

  RUN apt-get update && apt-get install -y openssl libncurses5 locales && rm -rf /var/lib/apt/lists/*
  ENV LANG=C.UTF-8

  WORKDIR /app
  COPY --from=build /app/_build/prod/rel/stackoverflow_be ./

  ENV REPLACE_OS_VARS=true \
      PHX_SERVER=true \
      MIX_ENV=prod

  CMD ["bin/stackoverflow_be", "start"]
