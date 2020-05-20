document.querySelector('#openCad').onclick = e => {
    const section = document.querySelector('#cadastro')
    section.className = "show"
}

document.querySelector('#openLog').onclick = e => {
    const section = document.querySelector('#cadastro')
    section.className = "hide"
}

document.querySelector('#btnCadastrar').onclick = () => {
    const inputs = document.querySelectorAll('#cadastro input')
    axios.post('http://localhost:3001/users', {
        nome: inputs[0].value,
        email: inputs[1].value,
        senha: inputs[2].value,
        carrinho: {
            quantidade: 0,
            produtos: []
        }
    })
}

document.querySelector('#btnLogar').onclick = () => {
    const inputs = document.querySelectorAll('#login input')
    axios.get('http://localhost:3001/users').then(resp => {
        const pessoas = resp.data
        for (i = 0; i < pessoas.length; i++) {
            if (pessoas[i].nome == inputs[0].value && pessoas[i].senha == inputs[1].value) {
                sessionStorage.setItem('logado', JSON.stringify({ nome: pessoas[i].nome, id: pessoas[i].id }))
                window.location.href = './index.html'
            }
        }
    })
}