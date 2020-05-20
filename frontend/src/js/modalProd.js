// MODAL PRODUTO
const showProd = (id) => {
    document.querySelector('[iProd]').onclick = () => {
        document.querySelector('#modalProd').style.display = 'none'
    }
    document.querySelector('#modalProd').style.display = 'flex'
    axios.get('http://localhost:3001/produtos/' + id).then(resp => {
        const data = resp.data
        document.querySelector('#img').src = data.img
        document.querySelector('#nome').textContent = data.nome
        document.querySelector('#desc').textContent = data.desc
        document.querySelector('#marca').textContent = data.marca
        document.querySelector('#preco').textContent = `R$${data.preco}`
        document.querySelector('#addCart').onclick = () => {
            const currentUser = JSON.parse(sessionStorage.getItem('logado'))
            axios.get(`http://localhost:3001/users/${currentUser.id}`).then(resp => {
                const data = resp.data
                let teste = 0
                data.carrinho.produtos.forEach(e => {
                    e === id ? teste++ : ''
                })
                if (teste === 0) {
                    data.carrinho.produtos.push({id: id, quantidade: 1})
                    data.carrinho.quantidade = data.carrinho.produtos.length
                    axios.put(`http://localhost:3001/users/${currentUser.id}`, data)
                }
            })
        }
    })
}