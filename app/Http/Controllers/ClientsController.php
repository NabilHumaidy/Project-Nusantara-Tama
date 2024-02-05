<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientsResource;
use App\Models\Clients;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClientsController extends Controller
{
    public function showData() {
        return ClientsResource::collection(Clients::all());
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'image' => 'required',
            'link' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $clients = new Clients();
        $clients->name = $request->input('name');
        $clients->image = $request->input('image');
        $clients->link = $request->input('link');
        $clients->save();

        return response()->json(['message' => 'Data stored successfully'], 200);
    }

    public function edit($id){
        $client = Clients::find($id);

        if(!$client) {
            return response()->json(['error' => "Data not found (ID with $id is not found)"]);
        }

        return ClientsResource::collection(Clients::find($id));
    }

    public function update(Request $request, $id){
        $clients = Clients::find($id);

        if(!$clients) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'image' => 'required',
            'link' => 'required',
        ]);
        
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $clients->name = $request->input('name');
        $clients->image = $request->input('image');
        $clients->link = $request->input('link');
        $clients->save();

        return response()->json(['message' => 'Data updated successfully'], 200);
    }

    public function delete($id) {
        $clients = Clients::find($id);

        if(!$clients) {
            return response()->json(['message' => 'Not Found']);
        }
        $clients->delete();

        return response()->json(['message' => 'Data deleted successfully'], 200);
    }
}
