<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $id = $this->route('user')?->id;
        $passwordRule = $id ? ['nullable', 'string', 'min:8'] : ['required', 'string', 'min:8'];

        return [
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:160', Rule::unique('users')->ignore($id)],
            'password' => $passwordRule,
            'role' => ['required', Rule::in(['admin', 'encoder'])],
        ];
    }
}
