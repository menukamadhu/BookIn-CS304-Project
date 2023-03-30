package com.bookin.Server.Service;

import com.bookin.Server.Dto.ClientDTO;
import com.bookin.Server.Dto.LoginDTO;
import com.bookin.Server.Dto.SalonDTO;
import com.bookin.Server.Entity.Client;
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
    public ClientDTO registerClient(ClientDTO clientDTO){
        Client client1 = clientRepo.findByEmail(clientDTO.getEmail());
        if (client1!=null){
            return null;
        }else {
            Client client = new Client(

                    clientDTO.getClientID(),
                    clientDTO.getFirstName(),
                    clientDTO.getLastName(),
                    clientDTO.getEmail(),
                    clientDTO.getGender(),
                    clientDTO.getContactNum(),
                    this.passwordEncoder.encode(clientDTO.getPassword())
            );
            Client c = clientRepo.save(client);
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
    public ClientDTO searchClient(int clientID){
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
    public LoginResponse loginClient(LoginDTO loginDTO){
        String msg="";
        Client client = clientRepo.findByEmail(loginDTO.getEmail());
        if (client!=null){

            String password = loginDTO.getPassword();
            String encodedPassword = client.getPassword();

//            System.out.println("hello world");
            boolean isPwdRight = passwordEncoder.matches(password,encodedPassword);
//            System.out.println(isPwdRight);
            if (isPwdRight){

                Client client1 = clientRepo.findOneByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
                if (client1!=null){
                    ClientDTO clientDTO=modelMapper.map(client1,new TypeToken<ClientDTO>(){}.getType());
                    return new LoginResponse("Login Success",true, clientDTO,null);
                }else {
                    return new LoginResponse("Login Failed",false,null,null);
                }
            }else {
                return new LoginResponse("Password not Matching",false,null,null);
            }
        }else {
            return new LoginResponse("Email not Exists",false,null,null);
        }
    }
}
