const container = document.getElementById('container')
const inputFiltro = document.getElementById('filtro')


//Retorna um array com 250 objetos (países)
async function requisicaoApiRestCountries (){
    try{
    const fetchApiRestCountries = await fetch ('https://restcountries.com/v3.1/all')
    const respostaConvertida = await fetchApiRestCountries.json()
    const arrayPaises = respostaConvertida
    return arrayPaises
    }catch(erro){
        console.log(erro)
    }
}

//Filtra o array de países ou não, de acordo com um nome determinado
async function filtraPaisesPorNome (nomePais){
    const arrayPaisesCompleto = await requisicaoApiRestCountries()
    
    const arrayPaisesFiltrado = arrayPaisesCompleto.filter(
        (pais) => pais.name.common.toLowerCase().includes(nomePais.toLowerCase())
    )
    return arrayPaisesFiltrado 
}

//Exibe os países
async function renderizaPaises (){
    const arrayPaises = await filtraPaisesPorNome(inputFiltro.value)
    const cardPaises = arrayPaises.map((pais)=> {
        return `
            <div class="card-container">
                <img src="${pais.flags.png}" alt="">

                <div class="card-texto">

                    <h2>${pais.name.common}</h2>

                    <div>
                        <h3>População:</h3>
                        <p>${pais.population}</p>
                    </div>

                    <div>
                        <h3>Capital:</h3>
                        <p>${pais.capital === undefined ? '-' : pais.capital}</p>
                    </div>
                    
                    <div>
                        <h3>Continente</h3>
                        <p>${pais.continents}</p>
                    </div>
                    
                    <div>
                        <h3>Sigla:</h3>
                        <p>${pais.fifa === undefined ? '-' : pais.fifa}</p>
                    </div>

                </div>
            </div>
            `
    })
    container.innerHTML = cardPaises.join(' ')
}

renderizaPaises()
inputFiltro.addEventListener('keyup', renderizaPaises)