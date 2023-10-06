# prueba_doublevpartners
prueba tecnica
pasos para funcionar en local

1. crear base de datos en MariaDB con el nombre tickets_api

2. correr las migraciones (php artisan migrate)
3. ejecutar los seeders para tener registros base para las consultas
    php artisan db:seed --class=UserSeeder
    php artisan db:seed --class=TicketSeeder
