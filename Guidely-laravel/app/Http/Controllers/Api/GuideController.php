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
            // 1. Sauvegarder la photo
            $photoPath = null;
            if ($request->hasFile('photo')) {
                $photoPath = $request->file('photo')->store('guides/photos', 'public');
            }

            // 2. Sauvegarder le PDF CNI
            $cniPath = null;
            if ($request->hasFile('cni_file')) {
                $cniPath = $request->file('cni_file')->store('guides/cni', 'public');
            }

            // 3. Insérer en base
            DB::table('guides')->insert([
                'photo'          => $photoPath,
                'nom_complet'    => $request->nom_complet,
                'email'          => $request->email,
                'mot_de_passe'   => Hash::make($request->password),
                'num_cni'        => $request->cni,
                'cni_file'       => $cniPath,
                'biographie'     => $request->bio,
                'langues'        => $request->languages,
                'ville_couverte' => $request->city,
                'prix_par_jour'  => $request->price,
                'created_at'     => now(),
                'updated_at'     => now(),
            ]);
            
        

            return response()->json(['message' => 'Guide créé avec succès !!'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function show($id)
    {
        $guide = DB::table('guides')->where('id', $id)->first();
        
        if (!$guide) {
            return response()->json(['error' => 'Guide non trouvé'], 404);
        }
        
        return response()->json($guide);
    }
}