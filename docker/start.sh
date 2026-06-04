#!/bin/sh
set -e

# Generate APP_KEY if not set
if [ -z "$APP_KEY" ]; then
    echo "APP_KEY is not set — generating one now..."
    php artisan key:generate --force
fi

# Run database migrations
echo "Running database migrations..."
php artisan migrate --force

# Adjust Apache to listen on the correct port
sed -i "s/Listen 80/Listen ${PORT:-8080}/" /etc/apache2/ports.conf
sed -i "s/:80/:${PORT:-8080}/" /etc/apache2/sites-available/000-default.conf

# Start Apache
echo "Starting Apache..."
exec apache2-foreground
