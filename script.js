let quantidade = document.getElementById('quantidade');
// let botao = document.getElementById('botao');
quantidade.addEventListener('keyup', ()=>{
    pegaPokemon(quantidade.value);
})

function pegaPokemon(qnt){
    //receita de bolo pra usar o fetch
    fetch('https://pokeapi.co/api/v2/pokemon?limit='+qnt)
    .then(response => response.json())
    .then(allpokemon => {
        let pokemons = [];

        setTimeout(() => {
            allpokemon.results.forEach((val)=>{
                fetch(val.url)
                .then(response => response.json())
                .then(pokemon => {
                    pokemons.push({
                        name: val.name, 
                        img: pokemon.sprites.front_default, 
                        xp: pokemon.base_experience
                    });
        
                    if(pokemons.length == allpokemon.results.length){
                        const boxes = document.querySelector('.pokemon-boxes');
                        boxes.innerHTML = '';
        
                        pokemons.forEach((el => {
                            boxes.innerHTML +=`
                            <div class="pokemon-box">
                                <img src="${el.img}" alt="${el.name}">
                                <h3>${el.name} - <span>${el.xp} xp<span></h3>
                            </div>
                            `
                        }))
                    }
                }).catch(error => console.error('Erro ao buscar detalhes do Pokémon:', error));
            });   
        }, 500);
    
    })
    .catch(error => console.error('Erro ao buscar lista de Pokémon:', error));
}
