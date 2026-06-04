<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->cascadeOnDelete();
            $table->foreignId('municipality_id')->constrained()->cascadeOnDelete();
            $table->enum('medal_type', ['gold', 'silver', 'bronze']);
            $table->string('athlete_name')->nullable();
            $table->string('team_name')->nullable();
            $table->string('score')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
            $table->unique(['event_id', 'medal_type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('results');
    }
};
