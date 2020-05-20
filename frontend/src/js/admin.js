axios.get('http://localhost:3001/users').then(resp => {
    data = resp.data
    document.querySelector('#tabUser').innerHTML = data.map(e => `
        <tr>
            <td>${e.id}</td>
            <td>${e.nome}</td>
            <td>${e.email}</td>
            <td>${e.senha}</td>
            <td>
                <button onclick="editarU(${e.id})"><i class="fas fa-edit"></i></button>
                <button onclick="deletarU(${e.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('')
})

axios.get('http://localhost:3001/produtos').then(resp => {
    data = resp.data
    document.querySelector('#tabProdu').innerHTML = data.map(e => `
        <tr>
            <td>${e.id}</td>
            <td>${e.nome}</td>
            <td>${e.marca}</td>
            <td>${e.img}</td>
            <td>${e.quantidade}</td>
            <td>${e.preco}</td>
            <td>
                <button onclick="editarP(${e.id})"><i class="fas fa-edit"></i></button>
                <button onclick="deletarP(${e.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('')
})

document.querySelector('#addUser').onclick = () => {
    const modal = document.querySelector('#formUser')
    modal.style.display = 'flex'

    document.querySelector('[iUser]').onclick = () => {
        modal.style.display = 'none'
    }

    document.querySelector('#btnAddUser').onclick = () => {
        const inputs = document.querySelectorAll('#formUser input')
        axios.post('http://localhost:3001/users', {
            nome: inputs[0].value,
            email: inputs[1].value,
            senha: inputs[2].value,
            carrinho: {
                quantidade: 0,
                produtosID: []
            }
        })
        modal.style.display = 'none'
    }
}
document.querySelector('#addProd').onclick = () => {
    const modal = document.querySelector('#formProd')
    modal.style.display = 'flex'

    document.querySelector('[iProd]').onclick = () => {
        modal.style.display = 'none'
    }

    document.querySelector('#btnAddProd').onclick = () => {
        const inputs = document.querySelectorAll('#formProd input')
        axios.post('http://localhost:3001/produtos', {
            nome: inputs[0].value,
            descricao: inputs[1].value,
            marca: inputs[2].value,
            img: inputs[3].value,
            quantidade: inputs[4].value,
            preco: inputs[5].value
        })
        modal.style.display = 'none'
    }
}

function editarU(id) {
    const modal = document.querySelector('#formUser')
    modal.style.display = 'flex'
    const inputs = document.querySelectorAll('#formUser input')
    document.querySelector('[iuser]').onclick = () => {
        modal.style.display = 'none'
    }
    const url = 'http://localhost:3001/users/' + id
    axios.get(url).then(resp => {
        const data = resp.data
        modal.childNodes[1].childNodes[3].textContent = `Editar ${data.nome}`
        inputs[0].value = data.nome
        inputs[1].value = data.email
        inputs[2].value = data.senha
    })
    document.querySelector('#btnAddUser').onclick = () => {
        axios.put(url, {
            nome: inputs[0].value,
            email: inputs[1].value,
            senha: inputs[2].value
        })
        modal.style.display = 'none'
    }
}

function editarP(id) {
    const modal = document.querySelector('#formProd')
    modal.style.display = 'flex'

    const inputs = document.querySelectorAll('#formProd input')
    const textField = document.querySelector('#txtDescp')
    document.querySelector('[iprod]').onclick = () => {
        modal.style.display = 'none'
    }
    const url = 'http://localhost:3001/produtos/' + id
    axios.get(url).then(resp => {
        const data = resp.data
        modal.childNodes[1].childNodes[3].textContent = `Editar ${data.nome}`
        inputs[0].value = data.nome
        inputs[1].value = data.marca
        inputs[2].value = data.img
        inputs[3].value = data.quantidade
        inputs[4].value = data.preco
        textField.value = data.descricao
    })
    document.querySelector('#btnAddProd').onclick = () => {
        axios.put(url, {
            nome: inputs[0].value,
            marca: inputs[1].value,
            img: inputs[2].value,
            quantidade: inputs[3].value,
            preco: inputs[4].value,
            descricao: textField.value
        })
        modal.style.display = 'none'
    }
}

function deletarP(id) {
    const modal = document.querySelector('#confirm')
    modal.style.display = 'flex'

    const url = 'http://localhost:3001/produtos/' + id
    document.querySelector('#sim').onclick = () => {
        axios.delete(url)
        modal.style.display = 'none'
    }
    document.querySelector('#nao').onclick = () => {
        modal.style.display = 'none'
    }
}
function deletarU(id) {
    const modal = document.querySelector('#confirm')
    modal.style.display = 'flex'

    const url = 'http://localhost:3001/users/' + id
    document.querySelector('#sim').onclick = () => {
        axios.delete(url)
        modal.style.display = 'none'
    }
    document.querySelector('#nao').onclick = () => {
        modal.style.display = 'none'
    }
}