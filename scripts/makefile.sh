# Makefile
# Usage:
# make up ENV=dev     # starts services after validation
# make backend-shell
# make frontend-shell

ENV ?= dev
ENV_FILE = .env.$(ENV)
COMPOSE = docker-compose -f docker-compose.yml -f docker-compose.$(ENV).yml

.PHONY: up validate check-env generate-env docker-check backend-shell frontend-shell db-shell clean restart logs ps

up:
	@echo "🚀 Starting project in '$(ENV)' mode..."
	@./scripts/docker-setup.sh
	@if [ ! -f "$(ENV_FILE)" ]; then \
		echo "⚠️  $(ENV_FILE) not found."; \
		read -p "Generate default env files? (y/n): " yn; \
		if [ "$$yn" = "y" ]; then \
			./scripts/generate_env_files.sh; \
		else \
			echo "❌ Env file is required to continue. Exiting."; \
			exit 1; \
		fi \
	fi
	@./scripts/validate_env.sh $(ENV_FILE)
	@if [ $$? -ne 0 ]; then \
		echo "❌ Env validation failed. Fix issues before continuing."; \
		exit 1; \
	fi
	@make generate-certs
	@./scripts/start-server.sh


validate:
	@./scripts/validate_env.sh $(ENV_FILE)

generate-env:
	@./scripts/generate_env_files.sh

generate-certs:
	@./scripts/generate_certs.sh

docker-check:
	@./scripts/docker-setup.sh

restart:
	$(COMPOSE) down && $(COMPOSE) up --build

down:
	$(COMPOSE) down

logs:
	$(COMPOSE) logs -f

ps:
	$(COMPOSE) ps

clean:
	$(COMPOSE) down -v

frontend-shell:
	docker exec -it stackoverflow_fe-frontend-1 sh

backend-shell:
	docker exec -it stackoverflow_be-backend-1 sh

db-shell:
	docker exec -it stackoverflow_be-db-1 psql -U $$DB_USERNAME -d $$DB_NAME
