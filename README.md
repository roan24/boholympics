# Boholympics 2026 Sports Tally

Laravel, Inertia React, Tailwind CSS, MySQL, and Docker development setup for the Boholympics 2026 public results site and admin dashboard.

## Docker Services

- `app`: PHP 8.3 FPM Laravel container at `/var/www/html`
- `nginx`: serves Laravel on `http://localhost:8000`
- `mysql`: MySQL 8 on `localhost:3307` from the host and `mysql:3306` inside Docker
- `node`: Vite/React dev server on `http://localhost:5174`
- `phpmyadmin`: database UI on `http://localhost:8081`
- `redis`: optional local Redis for cache/queues, exposed as `localhost:6380`

## Local Setup

Copy the environment file:

```bash
cp .env.example .env
```

Build and start the containers:

```bash
docker compose up -d --build
```

Install PHP dependencies:

```bash
docker compose exec app composer install
```

Install Node dependencies:

```bash
docker compose exec node npm install
```

Generate the Laravel app key:

```bash
docker compose exec app php artisan key:generate
```

Run migrations and seed sample Boholympics data:

```bash
docker compose exec app php artisan migrate --seed
```

Start Vite if it is not already running in the `node` service:

```bash
docker compose exec node npm run dev
```

## URLs

- Public website: `http://localhost:8000`
- Admin login: `http://localhost:8000/login`
- Vite dev server: `http://localhost:5174`
- phpMyAdmin: `http://localhost:8081`

Seeded admin credentials:

```text
Email: admin@boholympics.test
Password: password
```

## Docker Database Values

The Docker `.env.example` is configured for service-to-service MySQL access:

```text
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=boholympics
DB_USERNAME=boholympics_user
DB_PASSWORD=secret
```

Vite is configured to bind inside Docker:

```text
VITE_HOST=0.0.0.0
```

## Common Commands

```bash
docker compose exec app php artisan migrate:fresh --seed
docker compose exec app php artisan route:list
docker compose exec node npm run build
docker compose logs -f app nginx node
docker compose down
```
