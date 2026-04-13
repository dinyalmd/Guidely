<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class GuideController extends Controller
{
    public function store(Request $request)
    {
        try {
            DB::table('guides')->insert([
                'nom_complet'   => $request->nom_complet,  
                'email'         => $request->email,
                'mot_de_passe'  => Hash::make($request->password),
                'num_cni'       => $request->cni,           
                'biographie'    => $request->bio,           
                'langues'       => $request->languages,     
                'ville_couverte'=> $request->city,          
                'prix_par_jour' => $request->price,         
                'created_at'    => now(),
                'updated_at'    => now(),
            ]);

            return response()->json(['message' => 'Guide créé avec succès !!'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}