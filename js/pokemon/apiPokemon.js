const url = "https://pokeapi.co/api/v2/pokemon/"

//Funcao para aparecer todos os pokemons 
async function getGeralApi(inicio, limite) {

    const response = await fetch(url + "?limit=" + limite + "&offset=" + inicio);
    const data = await response.json();
    const obj = await data.results;
    return obj;

}

//funcao para setar informaçoes dentro do card Dos detalhes dos pokemon

async function mostrar(pokemon) {
    const nomePokemon = document.querySelector("#nomePokemon");
    const idPokemon = document.querySelector("#idPokemon");
    const habilidadePokemon = document.querySelector("#habilidadePokemon");
    const alturaPokemon = document.querySelector("#alturaPokemon");
    const pesoPokemon = document.querySelector("#pesoPokemon");
    const tipoPokemon = document.querySelector("#tipoPokemon");
    const experienciaPokemon = document.querySelector("#experienciaPokemon");
    const imagemInformacao = document.querySelector("#imageminformacao");
    const divInformacao = document.querySelector("#mainApareceInformacao");
    const mainAparecePokemon = document.querySelector("#mainAparecepokemon");
    const footerFecharInfo = document.querySelector("#footerFecharInfo");
    const footerProximoAnterior = document.querySelector("#footerProximoAnterior");

    //Valores setados recebidos da api
    nomePokemon.textContent = pokemon.name;
    idPokemon.textContent = "#" + pokemon.id;
    alturaPokemon.textContent = pokemon.height / 10 + " m";
    pesoPokemon.textContent = pokemon.weight / 10 + " kg";
    tipoPokemon.innerHTML = pokemon.types.map((t) => '<p style="display: inline;" class="verde">' + t.type.name + '</p>').join(" ");
    experienciaPokemon.textContent = pokemon.base_experience + " XP";
    habilidadePokemon.innerHTML = pokemon.abilities.map((hab) => '<p style="display: inline;" class="color">' + hab.ability.name + '</p>').join(" ");
    imagemInformacao.src = pokemon.sprites.front_shiny;
    mainAparecePokemon.style.display = "none";
    divInformacao.style.display = "flex";
    footerProximoAnterior.style.display = "none";
    footerFecharInfo.style.display = "flex";

}

//funcao cria as divs para exibir "NOME" e "IMGAGEM" do Pokemon
async function criarDivs(nome, id, src) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const main = document.querySelector(id);

    //alterações DIV
    div.setAttribute("id", nome);
    div.setAttribute("class", "divPokemon");
    div.style.animation = "aparecer 1s";

    //alterações h2 e img
    img.setAttribute("src", src)
    h2.innerHTML = nome;

    //Adiciona 'h2' e 'img' na DIV
    div.appendChild(img);
    div.appendChild(h2);

    //Adiciona tudo no main da pagina
    main.appendChild(div);

    //FUNÇÂO PARA CRIAR CARD dos detalhes dos pokemons
    div.addEventListener("click", async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
        const data = await response.json();
        mostrar(data);
    });


}


export { getGeralApi, criarDivs }