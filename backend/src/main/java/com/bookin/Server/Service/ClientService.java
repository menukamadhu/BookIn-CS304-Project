package com.bookin.Server.Service;

import com.bookin.Server.Dto.ClientDTO;
import com.bookin.Server.Dto.LoginDTO;
import com.bookin.Server.Dto.SalonDTO;
import com.bookin.Server.Entity.Client;
import com.bookin.Server.Entity.Login;
import com.bookin.Server.Entity.Salon;
import com.bookin.Server.Repository.ClientRepo;
import com.bookin.Server.Response.LoginResponse;
import com.bookin.Server.Util.VarList;
import jakarta.transaction.Transactional;
import org.aspectj.weaver.ast.Var;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ClientService {
    @Autowired
    private ClientRepo clientRepo;

    @Autowired
    private SalonService salonService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    LoginService loginService;
    public ClientDTO registerClient(ClientDTO clientDTO){
        Client client1 = clientRepo.findByEmail(clientDTO.getEmail());
        if (client1!=null){
            return null;
        }else {
            Client client = new Client();

                    client.setClientID(clientDTO.getClientID());
                    client.setFirstName(clientDTO.getFirstName());
                    client.setLastName(clientDTO.getLastName());
                    client.setEmail(clientDTO.getEmail());
                    client.setGender(clientDTO.getGender());
                    client.setContactNum(clientDTO.getContactNum());
                    client.setPassword(passwordEncoder.encode(clientDTO.getPassword()));
            Client c = clientRepo.save(client);

            if (c!=null){
                Login l = new Login();
                l.setRole("Client");
                l.setId(c.getClientID());
                l.setEmail(c.getEmail());
                l.setPassword(this.passwordEncoder.encode(clientDTO.getPassword()));

                LoginDTO k = loginService.addLoginService(modelMapper.map(l,new TypeToken<LoginDTO>(){}.getType()));
            }
            return modelMapper.map(c, new TypeToken<ClientDTO>(){}.getType());
        }
    }
    public String updateClient(ClientDTO clientDTO){
        if (clientRepo.existsById(clientDTO.getClientID())){
            clientRepo.save(modelMapper.map(clientDTO, Client.class));
            return VarList.RSP_SUCCESS;
        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }
    public List<ClientDTO> getAllClients(){
        List<Client> clientsList = clientRepo.findAll();
        return modelMapper.map(clientsList, new TypeToken<ArrayList<ClientDTO>>(){}.getType());
    }
    public ClientDTO getClientById(int clientID){
        if (clientRepo.existsById(clientID)){
            Client client = clientRepo.findById(clientID).orElse(null);
            return modelMapper.map(client, ClientDTO.class);
        }else {
            return null;
        }
    }
    public String deleteClient(int clientID){
        if (clientRepo.existsById(clientID)){
            clientRepo.deleteById(clientID);
            return VarList.RSP_SUCCESS;
        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }
}
