import { postApi, getApi, getGeralApi } from "./ConexaoApi.js";

/*BOTÃO QUE DIRECIONA PARA "CRIAR CONTA" E "FAZER LOGiN'*/

const btnDirecionaLogin = document.querySelector("#btnDirecionaCreate"),
    btnDirecionaCriarConta = document.querySelector("#btnDirecionaLogin"),
    containerLogin = document.querySelector(".containerLogin"),
    containerCriar = document.querySelector(".containerCreateAccount");


//Button que abre tela LOGIN
btnDirecionaLogin.addEventListener("click", () => {
    containerLogin.style.display = "none";
    containerCriar.style.display = "flex";
    btnDirecionaCriarConta.style.display = "block";
    btnDirecionaLogin.style.display = "none";
})

//Button que abre teta de CRIAR CONTA
btnDirecionaCriarConta.addEventListener("click", () => {
    containerLogin.style.display = "flex";
    containerCriar.style.display = "none";
    btnDirecionaLogin.style.display = "block";
    btnDirecionaCriarConta.style.display = "none";
})



/*AÇÕES AO CLICAR BOTAO DE LOGIN PARA ENVIAR O FORMULARIO*/


const btnFazerLogin = document.querySelector("#btnFazerLogin"),
    inputNome = document.querySelector("#nome"),
    inputSenha = document.querySelector("#senha");


btnFazerLogin.addEventListener("click", () => { //Button que faz login

    //INPUT NOME E SENHA
    let pegaNome = inputNome.value,
        pegaSenha = inputSenha.value,
        mensagemErrorLogin = document.querySelector("#mensagemErrorLogin");

    try {
        if (pegaNome === "" || pegaSenha === "") { //Verificção de campo vazio e mensagem de erro
            mensagemErrorLogin.style.display = "block";
            mensagemErrorLogin.textContent = "Porfavor, preencha todos os campos!";

            setTimeout(() => {
                mensagemErrorLogin.style.display = "none";
            }, 3000)

        } else {//Caso esteja tudo preenchido fará isso

            const verificacaoUser = getApi(pegaNome, pegaSenha);
            verificacaoUser
                .then(response => {//verifica usuario e senha

                    switch (response) {
                        case true:

                            console.log(response)
                            mensagemErrorLogin.style.display = "none";
                            window.location.href = "html/pokemon.html"; //direciona outra pagina
                            break;

                        case false:

                            //input nome altera isso
                            inputNome.style.boxShadow = "2px 2px 5px red";
                            inputNome.style.transition = "box-shadow 0.1s";

                            //input senha altera isso
                            inputSenha.style.boxShadow = "2px 2px 5px red";
                            inputSenha.style.transition = "box-shadow 0.1s";
                            inputSenha.value = "";


                            mensagemErrorLogin.style.display = "block";
                            mensagemErrorLogin.textContent = "USUARIO ou SENHA incorretos!";
                            break;
                    }
                })
        }
    } catch (error) {
        mensagemErrorLogin.style.display = "block";
        mensagemErrorLogin.textContent = "ERROR 404!";
    }






})



//AÇÕES AO CLICAR BOTAO DE ""Criar conta"" PARA ENVIAR O USUARIO

const btnCriarConta = document.querySelector("#btnCriarConta");
const inputCriarNome = document.querySelector("#inputCriarNome");
const inputCriarEmail = document.querySelector("#inputCriarEmail");
const inputCriarSenha = document.querySelector("#inputCriarSenha");



btnCriarConta.addEventListener("click", () => { //Button cria conta
    let pegaNome = inputCriarNome.value,
        pegaSenha = inputCriarSenha.value,
        pegaEmail = inputCriarEmail.value,
        mensagemErrorCriar = document.querySelector("#mensagemErrorCriar");

    try {
        if (pegaNome === "" || pegaSenha === "" || pegaEmail === "") {//Verificção de campo vazio e mensagem de erro
            mensagemErrorCriar.style.display = "block";
            mensagemErrorCriar.textContent = "Porfavor, preencha todos os campos!";

            setTimeout(() => {
                mensagemErrorCriar.style.display = "none";
            }, 3000)

        } else {

            const verificacaoUser = getGeralApi(pegaNome, pegaEmail);
            console.log(verificacaoUser)
            verificacaoUser          // Verifica usuario ou email existente
                .then(response => {   

                    switch (response) {
                        case true:
                            //input nome altera isso

                            inputCriarNome.style.boxShadow = "2px 2px 5px red";
                            inputCriarNome.style.transition = "box-shadow 0.1s";

                            //input EMAIL altera isso

                            inputCriarEmail.style.boxShadow = "2px 2px 5px red";
                            inputCriarEmail.style.transition = "box-shadow 0.1s";


                            mensagemErrorCriar.style.display = "block";
                            mensagemErrorCriar.textContent = "USUARIO ou EMAIL já existe!";
                            break;

                        case false:

                            try {
                                postApi(pegaNome, pegaEmail, pegaSenha);
                                containerLogin.style.display = "flex";
                                containerCriar.style.display = "none";
                            } catch (error) {

                            }

                            break;
                    }
                })
        }

    } catch {
    }

})
