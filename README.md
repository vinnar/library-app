This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. Create Nextjs app
    - `create-next-app`
        - Typescript
        - TailWind
        - ESLint
        - App Router
        - `src` directory

2. Install Dependencies
    - `npm install prisma @prisma/client`
    - `npm install @next-auth/prisma-adapter next-auth`

3. Create Database
    - Using Prisma ORM template format
    - Create `prisma/schema.prisma` file with table definitions

4. Deployment
    - Use Dockerfile to setup containerized application environment
    - Create `.devcontainer/Dockerfile` for `node` based container image
    - Create `.devcontainer/docker-compose.yml` to define 2 services - `app` and `db`

5. Startup of application
    - cd `library-lending-app/.devcontainer`
    - `docker compose up -d` # Startup the services (this also kicks off the `npm run dev` command)
    - `docker exec -it library-app /bin/sh` # Login to the app container
    - `npx prisma generate`
    - `npx prisma db push` # Above 2 commands to setup the db on first startup


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
