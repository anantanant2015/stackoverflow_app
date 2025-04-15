# Use working Elixir image
FROM hexpm/elixir:1.18.3-erlang-26.2.2-ubuntu-jammy AS build

# Install necessary packages
RUN apt-get update && \
    apt-get install -y build-essential git curl npm && \
    mix local.hex --force && \
    mix local.rebar --force

# Set workdir
WORKDIR /app
ENV MIX_ENV=prod

# Copy files and compile
COPY mix.exs mix.lock ./
COPY config ./config
RUN mix deps.get --only prod && mix deps.compile

COPY assets ./assets
WORKDIR /app/assets
RUN npm install && npm run deploy

WORKDIR /app
COPY lib ./lib
COPY priv ./priv
RUN mix phx.digest
RUN mix compile && mix release

# Release stage
FROM debian:bullseye-slim AS app
RUN apt-get update && apt-get install -y openssl libncurses5 locales && rm -rf /var/lib/apt/lists/*
ENV LANG=C.UTF-8

WORKDIR /app
COPY --from=build /app/_build/prod/rel/YOUR_APP_NAME ./
ENV REPLACE_OS_VARS=true PHX_SERVER=true MIX_ENV=prod
CMD ["bin/YOUR_APP_NAME", "start"]
