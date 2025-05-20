const url = "https://68082478942707d722dd6afc.mockapi.io/api/users/users";


//Função para criar usuario
async function postApi(nome, email, senha) {
    try {
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: nome,
                email: email,
                senha: senha
            })
        })

    } catch {
        console.log("Error!!")
    }

}


//função para procurar usuario
async function getApi(usuario, senha) {
    
    const response = await fetch(url);
    const data = await response.json();
    
    const procuraUser = data.find(valor => valor.name === usuario || valor.email === usuario);
    
    if (procuraUser  && procuraUser.senha === senha) {
        console.log(procuraUser)
        return true;
    } else {
        console.log(procuraUser)

        return false;
    }
    
}

//Função para procurar usuario e email existente antes de criar
async function getGeralApi(usuario, email) {
    
    const response = await fetch(url);
    const data = await response.json();
    
    const procuraUser = data.find(valor => valor.name === usuario || valor.email === email);
    
    if (procuraUser && procuraUser.email === email) {
        console.log(procuraUser)
        return true;
    } else {
        console.log(procuraUser)

        return false;
    }
    
}


export { postApi, getApi, getGeralApi}
