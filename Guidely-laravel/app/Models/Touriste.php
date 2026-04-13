<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Touriste extends Model
{
        protected $fillable = [
    'nom_complet', 'email', 'mot_de_passe'
];
}
