<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $id = $this->route('sport')?->id;

        return [
            'name' => ['required', 'string', 'max:120', Rule::unique('sports')->ignore($id)],
            'icon' => ['nullable', 'string', 'max:80'],
        ];
    }
}
