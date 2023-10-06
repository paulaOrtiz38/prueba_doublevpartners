<?php

namespace App\Http\Controllers;

use App\Http\Resources\TicektResource;
use App\Models\Ticket;
use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;

class TicketController extends BaseController
{
    public function index(Request $request)
    {

        try {
            $tickets = Ticket::query();
              // Filtrar por id
            if ($request->has('id')) {
                $tickets->where('id', $request->input('id'));
            }
            // Filtrar por usuario
            if ($request->has('user_id')) {
                $tickets->where('user_id', $request->input('user_id'));
            }
            
            // Filtrar por estatus
            if ($request->has('status')) {
                $tickets->where('status', $request->input('status'));
            }         

            $tickets = $tickets->paginate(10);
            return $this->sendResponse( TicektResource::collection($tickets), 'tickets fetched.');

        } catch (\Exception $e) {
            return $this->sendError($e); 
        }
    }

    public function store(Request $request)
    {
        date_default_timezone_set ('America/Bogota');
        try {
            $ticket = Ticket::create($request->all());
            return $this->sendResponse( new TicektResource($ticket), 'Ticket created.');
        } catch (\Exception $e) {
            return $this->sendError($e); 
        }       
    }

    public function show($id)
    {
        try {
            $ticket = Ticket::findOrFail($id);
            return $this->sendResponse( new TicektResource($ticket), 'Ticket.');
        } catch (\Exception $e) {
            return $this->sendError($e); 
        } 
    }

    public function update(Request $request, $id)
    {
        date_default_timezone_set ('America/Bogota');
        try {
            $ticket = Ticket::findOrFail($id);
            $ticket->user_id = $request->input('user_id');
            $ticket->updated_at = now();
            $ticket->status = $request->input('status');
            $ticket->save();
    
            return $this->sendResponse( new TicektResource($ticket), 'Ticket updated.');
        } catch (\Exception $e) {
            return $this->sendError($e); 
        } 
       
    }

    public function destroy($id)
    {
        try {
            $ticket = Ticket::findOrFail($id);
            $ticket->delete();
            return $this->sendResponse('', 'Ticket delete.');
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return $this->sendError($e); 
        }  
       
    }
}
