<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $estado[0] = 'abierto';
       $estado[1] = 'cerrado';   
       for ($i = 1; $i <= 10; $i++) {
        DB::table('tickets')->insert([
            'created_at' => '2022-12-15 10:15:03',
            'updated_at' => '2022-12-16 14:25:48',
            'user_id' => random_int(1,10),
            'status' => $estado[random_int(0,1)],
        ]);
       }
        
    }
}
