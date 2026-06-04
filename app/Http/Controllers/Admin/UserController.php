<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Users', [
            'users' => User::orderBy('name')->paginate(15),
        ]);
    }

    public function store(UserRequest $request)
    {
        User::create($request->validated());

        return back()->with('success', 'Admin user added.');
    }

    public function update(UserRequest $request, User $user)
    {
        $data = $request->validated();
        if (blank($data['password'] ?? null)) {
            $data = Arr::except($data, ['password']);
        }

        $user->update($data);

        return back()->with('success', 'Admin user updated.');
    }

    public function destroy(User $user)
    {
        abort_if(auth()->id() === $user->id, 422, 'You cannot delete your own account.');

        $user->delete();

        return back()->with('success', 'Admin user deleted.');
    }
}
