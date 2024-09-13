<?php

namespace App\Http\Controllers;

use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Sanctum\PersonalAccessToken;


/**
 * @OA\Info(
 *      title="Environnement de test des API du dashboard",
 *      version="1.0.0",
 *      description="test",
 *      @OA\Contact(
 *          email="",
 *      )
 * )
 */

class LoginController extends Controller
{
    public function handleGoogleLogin($email, $name) {

        try{
           
            $user = User::whereEmail($email)->first();


            if (!$user) {
                $user = new User();
                $user->name = $name;
                $user->email = $email;
                $user->Oauth = 1;
                $user->password = bcrypt("Password@22");
                $user->save();
                return (new ServiceController())->apiResponse(200,['user'=>$user, 'admin'=>0],"Connection successfully completed!");
            } else {
                return (new ServiceController())->apiResponse(400,[],"This user alredy existing!");
            }
        
        } catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }

      
    /**
 * @OA\Post(
 *     path="/api/login",
 *     summary="make authentification",
 *     tags={"Authentication"},
 *      @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name"},
 *             @OA\Property(property="email", type="string", example="a@gmail.com"),
 *             @OA\Property(property="password", type="string", example="P@$$w0rd")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="connected successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="status_code", type="string", example="200"),
 *             @OA\Property(property="data", type="array", @OA\Items(type="string")),
 *            @OA\Property(property="message", type="string", example="Login successful!")
 *         )
 *     ),
 *     @OA\Response(
 *         response=202,
 *         description="Invalid credentials"
 *     )
 * )
 */



    public function login(Request $request) {
        try {

            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);
    
            $email = trim($request-> email);
            $password = trim($request-> password);
            
            $user = User::where('email', $email)->first();
            
            if (!$user) {
                return (new ServiceController())->apiResponse(404,$user,"User not found. Please create an account first!");
            }
            $role = $user->is_admin;
            if (Hash::check($password, $user->password)) {
                $token = $user->createToken('auth_token')->plainTextToken;
                return (new ServiceController())->apiResponse(200,['user'=>$user, 'token'=>$token,'admin'=>$role],"Login successful!");

            } else {
               
                return (new ServiceController())->apiResponse(401,[],"Incorrect password!");

            }
            
        } catch (\Exception $e) {

            return (new ServiceController())->apiResponse(500,[],$e->getMessage());

        }
    }



}
