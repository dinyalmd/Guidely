<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    // ── Connexion Admin ────────────────────────────────────
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $admin = DB::table('admins')->where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->mot_de_passe)) {
            return response()->json([
                'success' => false,
                'message' => 'Email ou mot de passe incorrect.'
            ], 401);
        }

        return response()->json([
            'success' => true,
            'role'    => 'admin',
            'admin'   => [
                'id'    => $admin->id,
                'email' => $admin->email,
            ]
        ], 200);
    }

    // ── Guides ─────────────────────────────────────────────
    public function getGuides()
    {
        $guides = DB::table('guides')
            ->select('id', 'nom_complet', 'email', 'ville_couverte', 'langues', 'prix_par_jour', 'statut', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($guides);
    }

    public function validerGuide($id)
    {
        $guide = DB::table('guides')->where('id', $id)->first();
        if (!$guide) return response()->json(['error' => 'Guide non trouvé'], 404);

        DB::table('guides')->where('id', $id)->update(['statut' => 'validé']);
        return response()->json(['message' => 'Guide validé avec succès']);
    }

    public function supprimerGuide($id)
    {
        $guide = DB::table('guides')->where('id', $id)->first();
        if (!$guide) return response()->json(['error' => 'Guide non trouvé'], 404);

        DB::table('guides')->where('id', $id)->delete();
        return response()->json(['message' => 'Guide supprimé avec succès']);
    }

    // ── Touristes ──────────────────────────────────────────
    public function getTouristes()
    {
        $touristes = DB::table('touristes')
            ->select('id', 'nom_complet', 'email', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($touristes);
    }

    public function supprimerTouriste($id)
    {
        $touriste = DB::table('touristes')->where('id', $id)->first();
        if (!$touriste) return response()->json(['error' => 'Touriste non trouvé'], 404);

        DB::table('touristes')->where('id', $id)->delete();
        return response()->json(['message' => 'Touriste supprimé avec succès']);
    }

    // ── Réservations ───────────────────────────────────────
    public function getReservations()
    {
        $reservations = DB::table('reservations')
            ->join('guides',   'reservations.guide_id',   '=', 'guides.id')
            ->join('touristes','reservations.touriste_id', '=', 'touristes.id')
            ->select(
                'reservations.id',
                'reservations.date',
                'reservations.statut',
                'reservations.created_at',
                'guides.nom_complet as guide_nom',
                'touristes.nom_complet as touriste_nom'
            )
            ->orderBy('reservations.created_at', 'desc')
            ->get();

        return response()->json($reservations);
    }

    public function updateReservationStatut(Request $request, $id)
    {
        $request->validate(['statut' => 'required|in:en_attente,confirmé,annulé']);

        $res = DB::table('reservations')->where('id', $id)->first();
        if (!$res) return response()->json(['error' => 'Réservation non trouvée'], 404);

        DB::table('reservations')->where('id', $id)->update(['statut' => $request->statut]);
        return response()->json(['message' => 'Statut mis à jour']);
    }

    public function supprimerReservation($id)
    {
        DB::table('reservations')->where('id', $id)->delete();
        return response()->json(['message' => 'Réservation supprimée']);
    }

    // ── Stats dashboard ────────────────────────────────────
    public function getStats()
    {
        return response()->json([
            'total_guides'       => DB::table('guides')->count(),
            'guides_valides'     => DB::table('guides')->where('statut', 'validé')->count(),
            'guides_en_attente'  => DB::table('guides')->where('statut', 'en_attente')->count(),
            'total_touristes'    => DB::table('touristes')->count(),
            'total_reservations' => DB::table('reservations')->count(),
            'res_confirmees'     => DB::table('reservations')->where('statut', 'confirmé')->count(),
            'res_en_attente'     => DB::table('reservations')->where('statut', 'en_attente')->count(),
            'res_annulees'       => DB::table('reservations')->where('statut', 'annulé')->count(),
        ]);
    }
}