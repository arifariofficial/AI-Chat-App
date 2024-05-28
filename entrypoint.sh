#!/bin/sh

# Run Prisma db push to update the database schema
echo "Running npx prisma db push..."
npx prisma db push

# Then start your application
echo "Starting the application..."
exec "$@"