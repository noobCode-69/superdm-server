postgres:
	docker run --name superdm -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d -p 5432:5432 postgres

createdb:
	docker exec -it superdm createdb --username=root --owner=root superdm-db


createmigration:
	npm run db:generate && npm run db:migrate

.PHONY: postgres createdb createmigration