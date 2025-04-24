.PHONY: rebuild init-rebuild keep-rebuild clean-rebuild docker-up

# Entry point
rebuild:
	@REBUILD_MODE=rebuild ./scripts/rebuild.sh

init-rebuild:
	@REBUILD_MODE=init-rebuild ./scripts/rebuild.sh

clean-rebuild:
	@REBUILD_MODE=clean-rebuild ./scripts/rebuild.sh

docker-up:
	docker compose up --build
