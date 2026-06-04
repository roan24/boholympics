<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sport_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('category')->nullable();
            $table->enum('gender', ['male', 'female', 'mixed', 'open'])->default('open');
            $table->enum('status', ['draft', 'scheduled', 'live', 'completed', 'cancelled'])->default('draft');
            $table->timestamps();
            $table->unique(['sport_id', 'name', 'category', 'gender']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
