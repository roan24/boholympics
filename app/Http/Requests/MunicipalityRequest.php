<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MunicipalityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $id = $this->route('municipality')?->id;

        return [
            'name' => ['required', 'string', 'max:120', Rule::unique('municipalities')->ignore($id)],
            'logo' => ['nullable', 'string', 'max:255'],
        ];
    }
}
