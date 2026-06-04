<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('medals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('municipality_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('gold')->default(0);
            $table->unsignedInteger('silver')->default(0);
            $table->unsignedInteger('bronze')->default(0);
            $table->unsignedInteger('total')->default(0);
            $table->timestamps();
            $table->unique('municipality_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('medals');
    }
};
