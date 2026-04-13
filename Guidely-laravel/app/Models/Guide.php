<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guide extends Model
{
    protected $fillable = [
    'nom_complet', 'email', 'mot_de_passe', 'num_cni', 
    'biographie', 'langues', 'ville_couverte', 'prix_par_jour'
];
}
