import { getGeralApi, criarDivs } from "./apiPokemon.js";

// varialvel que ira determinar por qual pokemon começar;
let inicio = 0;

// FUNÇÂO que exibe os Pokémon na página com limite de 6 pokemons por vez;
async function carregarPokemons(ondeComecaPokemon, limite) {
    
    document.querySelector("#mainAparecepokemon").innerHTML = ""; //limpa o main para os proximos 6 pokemons


    const response = await getGeralApi(ondeComecaPokemon, limite);

    for (let valor of response) { //Nesse for ele pecorrerá o array da VAR Response 
        const response = await fetch(valor.url);
        const date = await response.json();
        await criarDivs(date.name, "#mainAparecepokemon", date.sprites.front_default); //cria card dos pokemons

    }
    return await response;
}

carregarPokemons(inicio, 6)


//Button que chamará os proximos 6 pokemons

const btnProximaList = document.querySelector("#btnProximaList");
const paginas = document.querySelector("small");
let contPaginas = 1;

btnProximaList.addEventListener("click", async () => {
    
    if (inicio <= 1302){ //Para não somar 6 a mais dos pokemons existentes(1302)
        
        btnProximaList.disabled = true; //Desabilita Button(proximo), para evitar somar mais do que 6 por vez

        contPaginas += 1;//Conta a pagina pokemon
        paginas.innerHTML = contPaginas
        
        inicio += 6;//Determina qual pokemon começar a exibir

        await carregarPokemons(inicio, 6);

        btnProximaList.disabled = false;
    }
})


//Button que chamará os 6 pokemons anteriores

const btnVoltarList = document.querySelector("#btnVoltarList");

btnVoltarList.addEventListener("click", () => {
    if (inicio >= 6) {
        contPaginas -= 1;//Conta a pagina pokemon
        paginas.innerHTML = contPaginas;
        inicio -= 6;//Determina qual pokemon começar a exibir
        carregarPokemons(inicio, 6);
    }
});


//Button(VOLTAR) que fecha o card que exibe informações detalhadas do pokemon

const btnFecharInformacaoPokemon = document.querySelector("#btnFecharInformacaoPokemon");
const footerFecharInfo = document.querySelector("#footerFecharInfo");
const footerProximoAnterior = document.querySelector("#footerProximoAnterior");
const divInformacao = document.querySelector("#mainApareceInformacao");
const mainAparecePokemon = document.querySelector("#mainAparecepokemon");

btnFecharInformacaoPokemon.addEventListener("click", () => { 
    footerFecharInfo.style.display = "none";
    divInformacao.style.display = "none";
    footerProximoAnterior.style.display = "flex";
    mainAparecePokemon.style.display = "flex";
    carregarPokemons(inicio, 6);
})


//Button e input que irá permitir buscar Pokemon pelo nome

const btnPesquisa = document.querySelector("#btnPesquisa");
const pesquisaPokemon = document.querySelector("#pesquisaPokemon");


btnPesquisa.addEventListener("click", async () => {
    const pegaPesquisa = pesquisaPokemon.value.toLowerCase();

    try {
        //busca pokemon pesquisado
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pegaPesquisa}`);
        
        if (!response.ok) {
            throw new Error("Pokémon não encontrado");
        } else {


            const dados = await response.json();

            console.log(dados)
            if (dados.previous === null) {
                alert("Pokémon não encontrado!");
            } else {

                divInformacao.style.display = "none";// Desativa o card informações do pokemon(Caso seja exibido)

                // Limpa a tela e mostra apenas o resultado da pesquisa
                mainAparecePokemon.innerHTML = "";

                mainAparecePokemon.style.display = "flex";//Caso os outros button tenham desativado

                await criarDivs(dados.name, "#mainAparecepokemon", dados.sprites.front_default);//criar card do pokemon pesquisado

                //Desativa Buttons("PROXIMO" e "ANTERIOR")
                footerProximoAnterior.style.display = "none";
                btnFecharInformacaoPokemon.style.display = "grid";
            }
        }
    } catch (error) {
        console.log(error.message);
        alert("Pokémon não encontrado!");
    }


});



