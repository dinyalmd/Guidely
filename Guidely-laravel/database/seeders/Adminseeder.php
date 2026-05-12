<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // Vérifie si un admin existe déjà
        $exists = DB::table('admins')->where('email', 'admin@guidely.ma')->exists();

        if (!$exists) {
            DB::table('admins')->insert([
                'email'        => 'admin@guidely.ma',
                'mot_de_passe' => Hash::make('admin1234'),
                'created_at'   => now(),
                'updated_at'   => now(),
            ]);
            echo "Admin créé : admin@guidely.ma / admin1234\n";
        } else {
            echo "Admin déjà existant.\n";
        }
    }
}