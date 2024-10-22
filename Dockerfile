# Use an official Node.js runtime as a parent image
FROM node:22-alpine AS base

# Set the working directory
WORKDIR /app

# Update npm to the desired version (optional, or remove if not needed)
RUN npm install -g npm@latest

# Base image to install dependencies
FROM base AS deps

# Copy package files first to leverage caching
COPY package.json package-lock.json* ./

# Install only production dependencies to optimize image size
RUN npm ci 

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy package files again (only if they change)
COPY package.json package-lock.json* ./
# Install all dependencies (including devDependencies)
RUN npm ci

# Copy the rest of the project files
COPY . .

# Generate Prisma client
RUN npm run db-gen:prod

# Build the application
RUN npm run build

# Production image, copy all the necessary files and run next
FROM base AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Create non-root user and group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built app, production node_modules, and necessary files from deps and builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

# Ensure proper permissions for prerender cache
RUN mkdir -p .next && chown nextjs:nodejs .next

# Switch to non-root user
USER nextjs

# Expose the application port
EXPOSE 3000

# Set the default command to run the application
CMD ["node", "server.js"]