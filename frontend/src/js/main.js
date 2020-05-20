function render() {
    axios.get('http://localhost:3001/produtos').then(resp => {
        document.querySelector('#produtos').innerHTML =
            resp.data.map(e => `
        <div class="produto" onclick="showProd(${e.id})">
            <div class="img">
                <img src="${e.img}">
            </div>
            <div class="title">
                <h1>${e.nome}</h1>
            </div>
            <div class="preco">
                <h2>R$${e.preco}</h2>
            </div>
        </div>    
    `).join('')
    })
}

document.querySelector('#btnSair').onclick = () => {
    sessionStorage.removeItem('logado')
    sessionStorage.removeItem('carrinho')
    window.location.href = './login.html'
}
document.querySelector('#verUser').onclick = () => {
    window.location.href = './verUser.html'
}
if (sessionStorage.getItem('logado')) {
    const obj = JSON.parse(sessionStorage.getItem('logado'))
    document.querySelector('#logado').textContent = obj.nome

    axios.get('http://localhost:3001/users/' + obj.id).then(resp => {
        const { data } = resp
        document.querySelector('#qtCart').textContent = data.carrinho.quantidade
        sessionStorage.setItem('carrinho', JSON.stringify({ quantidade: data.carrinho.quantidade, produtos: data.carrinho.produtos }))
    })
}
else {
    document.querySelector('#logado').textContent = 'Usuário'

    document.querySelector('#btnSair').innerHTML = '<i class="fas fa-sign-out-alt"></i>Entrar'
    document.querySelector('#verUser').style.display = 'none'
}

document.querySelector('#navCart').onclick = () => [
    window.location.href = './cart.html'
]
render()