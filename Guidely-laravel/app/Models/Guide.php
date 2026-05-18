<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guide extends Model
{
    protected $fillable = [
    'photo','nom_complet', 'email', 'mot_de_passe', 'cni_file', 
    'biographie', 'langues', 'ville_couverte', 'prix_par_jour'
];
}
