function cart() {
    const { produtos } = JSON.parse(sessionStorage.getItem('carrinho'))
    const table = document.querySelector('#table')
    const total = document.querySelector('#total')
    axios.get('http://localhost:3001/produtos').then(resp => {
        const { data } = resp
        const filtered = data.filter(dataElement => produtos.filter(idElement => dataElement.id === idElement.id).length !== 0)
        const precos = filtered.map((produto, index) => produto.preco * produtos[index].quantidade)
        total.textContent = `R$${precos.reduce((prev, preco) => prev + preco).toFixed(2)}`

        // Gerar os options da quantidade
        const gerarOptions = quantidade => {
            let options = ''
            for (i = 0; i < Number(quantidade); i++) {
                options += 
                `<option value="${i + 1}" onchange="alterarQuantidade(${i})">${i + 1}</option>`
            }
            return options
        }

        table.innerHTML = filtered.map((produto, indice) =>
            `
                <tr>
                    <td class="prodTable">
                        <img src="${produto.img}">
                    </td>
                    <td>
                        <h4>${produto.nome}</h4>
                    </td>
                    <td>
                        <select value="${produto.quantidade}" id="quantidade${indice}" indice="${indice}" onchange="alterarQuantidade(this)">
                            ${gerarOptions(produto.quantidade)}
                        </select>
                    </td>
                    <td>
                        <h4>R$${precos[indice]}</h4>
                    </td>
                    <td>
                        <button onclick="excluir(this)" indice="${indice}">X</button>
                    </td>
                </tr>
            `
        ).join('')
    })
}
cart()