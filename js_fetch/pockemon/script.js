const pockeId = document.querySelector('.pocke_id')
const getPocke = document.querySelector('.show_poke')
const numPocke = document.querySelector('.num_pocke')
const pockeName = document.querySelector('.poke_name')
const type_1 = document.querySelector('.type-1')
const type_2 = document.querySelector('.type-2')

const height = document.querySelector('.height')
const weight = document.querySelector('.weight')

const hp = document.querySelector('.hp')
const attack = document.querySelector('.attack')
const defense = document.querySelector('.defense')
const specialAttack = document.querySelector('.special-attack')
const specialDefense = document.querySelector('.special-defense')
const speed = document.querySelector('.speed')

getPocke.addEventListener('click', () => {
    console.log(pockeId.value)
    fetch(`https://pokeapi.co/api/v2/pokemon/${pockeId.value}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            numPocke.textContent = data.id
            pockeName.textContent = data.name
            type_1.textContent = `(${data.types[0].type.name} +`
            type_2.textContent = `${data.types[1].type.name})`

            weight.textContent = data.weight
            height.textContent = data.height
          
            hp.textContent = data.stats[0].base_stat
            attack.textContent = data.stats[1].base_stat
            defense.textContent = data.stats[2].base_stat
            specialAttack.textContent = data.stats[3].base_stat
            specialDefense.textContent = data.stats[4].base_stat
            speed.textContent = data.stats[5].base_stat
        })
})
