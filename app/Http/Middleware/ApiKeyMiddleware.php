<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiKeyMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $apiKey = $request->header('X-API-Key');

        if(!$apiKey) {
            return response()->json(['error' => 'API key is missing'], 401);
        }

        $user = User::where('api_key', $apiKey)->first();

        if(!$user) {
            return response()->json(['error' => 'Invalid API key'], 401);
        }

        return $next($request);
    }
}
