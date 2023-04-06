package com.bookin.Server.Controller;

import com.bookin.Server.Dto.ClientDTO;
import com.bookin.Server.Dto.LoginDTO;
import com.bookin.Server.Dto.ResponseDTO;
import com.bookin.Server.Dto.SalonDTO;
import com.bookin.Server.Repository.ClientRepo;
import com.bookin.Server.Repository.SalonRepo;
import com.bookin.Server.Response.LoginResponse;
import com.bookin.Server.Service.ClientService;
import com.bookin.Server.Util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/client")
public class ClientController {
    @Autowired
    private ClientService clientService;
    @Autowired
    private ResponseDTO responseDTO;
    @Autowired
    private ClientRepo clientRepo;

    @PostMapping(value = "/registerClient")
    public ResponseEntity registerClient(@RequestBody ClientDTO clientDTO){
        try {
            ClientDTO res = clientService.registerClient(clientDTO);
           if (res!= null){
               responseDTO.setCode(VarList.RSP_SUCCESS);
               responseDTO.setMessage("Success");
               responseDTO.setContent(res);
               return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
           }
           else if (res == null){
               responseDTO.setCode(VarList.RSP_DUPLICATE);
               responseDTO.setMessage("Client has registered");
               responseDTO.setContent(clientDTO);
               return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
           }else {
               responseDTO.setCode(VarList.RSP_FAIL);
               responseDTO.setMessage("Error");
               responseDTO.setContent(null);
               return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
           }
        }catch (Exception e){
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(value = "/updateClient")
    public ResponseEntity updateClient(@RequestBody ClientDTO clientDTO){
        try {
            String res = clientService.updateClient(clientDTO);
            if (res == "00"){
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(clientDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            }
            else if (res == "06"){
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("Not a registered Client");
                responseDTO.setContent(clientDTO);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }else {
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("Error");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/getAllClients")
    public ResponseEntity getAllClients(){
        try {
            List<ClientDTO> clientDTOList = clientService.getAllClients();
            responseDTO.setCode(VarList.RSP_SUCCESS);
            responseDTO.setMessage("Success");
            responseDTO.setContent(clientDTOList);
            return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
        }catch (Exception e){
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping(value = "/getClient/{clientID}")
    public ResponseEntity getClientById(@PathVariable int clientID){
        try{
            ClientDTO clientDTO = clientService.getClientById(clientID);
            if (clientDTO!=null){
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(clientDTO);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            }else{
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No client available to this ID");
                responseDTO.setContent(null);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            }
        }catch (Exception e){
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/deleteClient/{clientID}")
    public ResponseEntity deleteClient(@PathVariable int clientID){
        try {
            String res = clientService.deleteClient(clientID);
            if (res.equals("00")){
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Success");
                responseDTO.setContent(true);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            }else {
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No client available to this ID");
                responseDTO.setContent(false);
                return new ResponseEntity(responseDTO, HttpStatus.ACCEPTED);
            }
        }catch (Exception e){
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity(responseDTO, HttpStatus.BAD_REQUEST);
        }
    }
}
