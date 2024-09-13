<?php

namespace App\Http\Controllers;

use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Sanctum\PersonalAccessToken;



class LoginController extends Controller
{
    public function handleGoogleLogin($email, $name) {

        try{
           
            $user = User::whereEmail($email)->first();
            $role = 'user';

            if(Role::whereName($role)->first()->is_deleted == true){
                return (new ServiceController())->apiResponse(404,[],"This role is deleted!");
    
            }

            if (!$user) {
                $user = new User();
                $user->name = $name;
                $user->email = $email;
                $user->Oauth = 1;
                $user->password = bcrypt("Password@22");
                $user->save();
                return (new ServiceController())->apiResponse(200,['user'=>$user, 'role'=>$role],"Connection successfully completed!");
            } else {
                return (new ServiceController())->apiResponse(400,[],"This user alredy existing!");
            }
        
        } catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }

    public function login(Request $request) {
        try {

            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);
    
            $email = $request-> email;
            $password = $request-> password;
    
            $user = User::where('email', $email)->first();
    
            if (!$user) {
                return (new ServiceController())->apiResponse(404,$user,"User not found. Please create an account first!");
            }
            if (Hash::check($password, $user->password)) {
                $token = $user->createToken('auth_token')->plainTextToken;
                return (new ServiceController())->apiResponse(200,['user'=>$user, 'token'=>$token],"Login successful!");

            } else {
               
                return (new ServiceController())->apiResponse(401,[],"Incorrect password!");

            }
            
        } catch (\Exception $e) {

            return (new ServiceController())->apiResponse(500,[],$e->getMessage());

        }
    }
}
