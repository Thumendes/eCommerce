function quantidade(indice) {
    if (indice) {
        const target = document.querySelector(`#quantidade${indice}`)
        const { produtos } = JSON.parse(sessionStorage.getItem('carrinho'))
        console.log(produtos[indice])
        console.log(target.value)
        produtos[indice].quantidade = target.value
        localStorage.setItem('carrinho', JSON.stringify(produtos))
        // const precos = filtered.map((produto, index) => produto.preco * produtos[index].quantidade)
    }
    else {

    }
}

const alterarQuantidade = element => {
    const value = element.value
    const indice = Number(element.getAttribute('indice'))
    const carrinho = JSON.parse(sessionStorage.getItem('carrinho'))
    carrinho.produtos.find((produto, i) => {
        if(i === indice){
            produto.quantidade = Number(value)
        }
    })
    sessionStorage.setItem('carrinho', JSON.stringify(carrinho))
    cart()
}