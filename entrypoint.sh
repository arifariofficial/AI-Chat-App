#!/bin/sh

# Check if we are in a development environment
if [ "$NODE_ENV" = "development" ]; then
    echo "Running npx prisma db push..."
    npx prisma db push || {
        echo "Failed to update the database schema with Prisma db push."
        exit 1
    }
else
    echo "Running npx prisma migrate deploy..."
    npx prisma migrate deploy || {
        echo "Failed to deploy migrations using Prisma migrate."
        exit 1
    }
fi

# Then start your application
echo "Starting the application..."
exec "$@"
