<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    // Connexion Guide
    public function loginGuide(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $guide = DB::table('guides')->where('email', $request->email)->first();

        if (!$guide || !Hash::check($request->password, $guide->mot_de_passe)) {
            return response()->json([
                'success' => false,
                'message' => 'Email ou mot de passe incorrect.'
            ], 401);
        }

        return response()->json([
            'success'  => true,
            'role'     => 'guide',
            'redirect' => '/dashboard',
            'user'     => [
                'id'          => $guide->id,
                'nom_complet' => $guide->nom_complet,
                'email'       => $guide->email,
            ]
        ], 200);
    }

    // Connexion Touriste
    public function loginTouriste(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $touriste = DB::table('touristes')->where('email', $request->email)->first();

        if (!$touriste || !Hash::check($request->password, $touriste->mot_de_passe)) {
            return response()->json([
                'success' => false,
                'message' => 'Email ou mot de passe incorrect.'
            ], 401);
        }

        return response()->json([
            'success'  => true,
            'role'     => 'touriste',
            'redirect' => '/villes',
            'user'     => [
                'id'          => $touriste->id,
                'nom_complet' => $touriste->nom_complet,
                'email'       => $touriste->email,
            ]
        ], 200);
    }
}