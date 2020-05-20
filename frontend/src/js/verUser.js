const obj = JSON.parse(sessionStorage.getItem('logado'))
const inputs = document.querySelectorAll('input')
const title = document.querySelector('.form h1')
const id = obj.id
if(sessionStorage.getItem('logado')){
    title.textContent = `Editar ${obj.nome}`
    document.querySelector('#logado').textContent = obj.nome
}
else{
    document.querySelector('#logado').textContent = 'Usuário'
}
document.querySelector('#btnSair').onclick = () => {
    sessionStorage.removeItem('logado')
    window.location.href = './login.html'
}
axios.get('http://localhost:3001/users').then(resp => {
    const data = resp.data
    data.forEach(e => {
        if(obj.id == e.id){
            inputs[0].value = e.nome
            inputs[1].value = e.email
            inputs[2].value = e.senha
        }
    })
})