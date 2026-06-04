<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sport_medal_tallies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('medal_import_id')->constrained()->cascadeOnDelete();
            $table->foreignId('sport_id')->constrained()->cascadeOnDelete();
            $table->foreignId('municipality_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('gold')->default(0);
            $table->unsignedInteger('silver')->default(0);
            $table->unsignedInteger('bronze')->default(0);
            $table->unsignedInteger('total')->default(0);
            $table->string('source_sheet');
            $table->unsignedInteger('source_row');
            $table->timestamps();

            $table->unique(['medal_import_id', 'sport_id', 'municipality_id'], 'sport_tally_import_sport_municipality_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sport_medal_tallies');
    }
};
