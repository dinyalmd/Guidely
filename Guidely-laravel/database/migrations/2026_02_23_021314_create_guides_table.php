<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
  public function up(): void
{
    Schema::create('guides', function (Blueprint $table) {
        $table->id();
        $table->string('photo')->nullable(); 
        $table->string('nom_complet');
        $table->string('email')->unique();
        $table->string('mot_de_passe');
        $table->string('cni_file')->nullable();   
        $table->text('biographie');
        $table->string('langues');
        $table->string('ville_couverte');
        $table->decimal('prix_par_jour', 8, 2);
        $table->timestamps();
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guides');
    }
};
