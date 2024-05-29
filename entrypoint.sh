#!/bin/sh

# Function to check if PostgreSQL is ready
wait_for_postgres() {
  echo "Waiting for PostgreSQL to be ready..."
  while ! nc -z "$POSTGRES_HOST" "$POSTGRES_PORT"; do
    sleep 1
    echo "Waiting for PostgreSQL..."
  done
  echo "PostgreSQL is up and running!"
}

# Environment variables for PostgreSQL connection
POSTGRES_HOST=${POSTGRES_HOST:-postgres}
POSTGRES_PORT=${POSTGRES_PORT:-5432}

# Wait for PostgreSQL to be ready
wait_for_postgres

# Check if database schema needs to be pushed
echo "Checking if database schema needs to be pushed..."
DB_CHANGES=$(npx prisma migrate status --schema=./prisma/schema.prisma --experimental | grep 'Database schema is not in sync with the schema file')

if [ -n "$DB_CHANGES" ]; then
  echo "Database schema is not in sync, running npx prisma db push..."
  npx prisma db push --schema=./prisma/schema.prisma
else
  echo "Database schema is already in sync, no need to push."
fi

# Then start your application
echo "Starting the application..."
exec "$@"

