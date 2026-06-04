#!/bin/sh
set -e

# Generate a valid APP_KEY (base64:<32-random-bytes>) if one was not supplied
if [ -z "$APP_KEY" ]; then
    echo "APP_KEY is not set — generating a secure key..."
    APP_KEY="base64:$(openssl rand -base64 32)"
    echo "Generated APP_KEY."
fi

# Create .env file from environment variables if it does not exist
if [ ! -f ".env" ]; then
    echo "No .env file found — creating one from environment variables..."

    # Strip any existing prefix then re-apply it, so APP_KEY always has exactly
    # one "base64:" prefix regardless of whether the variable was supplied with
    # or without it, or was generated above.
    APP_KEY_RAW="${APP_KEY#base64:}"
    APP_KEY_FULL="base64:${APP_KEY_RAW}"

    cat > .env <<EOF
APP_NAME="${APP_NAME:-Boholympics 2026}"
APP_ENV=${APP_ENV:-production}
APP_KEY=${APP_KEY_FULL}
APP_DEBUG=${APP_DEBUG:-false}
APP_URL=${APP_URL:-${RAILWAY_PUBLIC_DOMAIN:+https://${RAILWAY_PUBLIC_DOMAIN}}}
ASSET_URL=${ASSET_URL:-${RAILWAY_PUBLIC_DOMAIN:+https://${RAILWAY_PUBLIC_DOMAIN}}}
TRUSTED_PROXIES=${TRUSTED_PROXIES:-*}

LOG_CHANNEL=${LOG_CHANNEL:-stack}
LOG_LEVEL=${LOG_LEVEL:-error}

DB_CONNECTION=${DB_CONNECTION:-mysql}
DB_HOST=${DB_HOST:-127.0.0.1}
DB_PORT=${DB_PORT:-3306}
DB_DATABASE=${DB_DATABASE:-boholympics}
DB_USERNAME=${DB_USERNAME:-root}
DB_PASSWORD=${DB_PASSWORD:-}

SESSION_DRIVER=${SESSION_DRIVER:-file}
CACHE_STORE=${CACHE_STORE:-file}
QUEUE_CONNECTION=${QUEUE_CONNECTION:-sync}

REDIS_HOST=${REDIS_HOST:-127.0.0.1}
REDIS_PORT=${REDIS_PORT:-6379}

VITE_APP_NAME="${VITE_APP_NAME:-${APP_NAME:-Boholympics 2026}}"
EOF
    chmod 644 .env
    echo ".env file created."
fi

# Run database migrations
echo "Running database migrations..."
php artisan migrate --force

# Seed the database
echo "Seeding the database..."
php artisan db:seed --force

# Ensure only mpm_prefork is loaded (remove conflicting MPM modules)
rm -f /etc/apache2/mods-enabled/mpm_event.load /etc/apache2/mods-enabled/mpm_event.conf \
      /etc/apache2/mods-enabled/mpm_worker.load /etc/apache2/mods-enabled/mpm_worker.conf
a2enmod -q mpm_prefork

# Adjust Apache to listen on the correct port
sed -i "s/Listen 80/Listen ${PORT:-8080}/" /etc/apache2/ports.conf
sed -i "s/:80/:${PORT:-8080}/" /etc/apache2/sites-available/000-default.conf

# Start Apache
echo "Starting Apache..."
exec apache2-foreground
