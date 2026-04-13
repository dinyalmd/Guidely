<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;     
use Illuminate\Support\Facades\Hash; 

class TouristeController extends Controller
{
      public function store(Request $request)
    {
        DB::table('touristes')->insert([
            'nom_complet' => $request->nom_complet,
            'email'         => $request->email,
            'mot_de_passe'  => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Touriste créé avec succès !!'], 201);
    }
}
