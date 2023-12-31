import { cadastrarUsuarios, encontrarUsuario } from "../db/usuariosDb.js";

function registrarEventosCadastro(socket, io){
    socket.on("cadastrar_usuario", async (dados)=>{
        const usuario = await encontrarUsuario(dados.user);

        if(usuario === null){
            const resultado = await cadastrarUsuarios(dados);

            if(resultado.acknowledged){
                socket.emit("cadastro_sucesso");
            }else{
                socket.emit("cadastro_erro");

            }
        }else{
            socket.emit("cadastro_usuario_existente");
        }


        
    });
}

export default registrarEventosCadastro;