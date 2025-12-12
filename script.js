
const PALAVRAS_PROIBIDAS = [
    'idiota', 'imbecil', 'trouxa', 'vagabunda', 
    'cretino', 'merda', 'puta', 'caralho', 'porra', 
    'foder', 'cuzão', 'buceta', 'rola', 'nazista', 
    'racista', 'pornô', 'nua', 'sexo', 'matar', 
    'explodir', 'ameaça', 'fdp', 'viado', 'macaco','smt','porno','cuzao','cu','gay'
];

function gerarCorAleatoria() {
    let cor = Math.floor(Math.random() * 16777215).toString(16);

    while (cor.length < 6) {
        cor = "0" + cor;
    }
    return "#" + cor;
}

function verificarConteudoOfensivo(texto) {
    const textoMinusculo = texto.toLowerCase();

    return PALAVRAS_PROIBIDAS.some(palavraProibida => 
        textoMinusculo.includes(palavraProibida)
    );
}


function carregarSonhos() {
    const divSonhos = document.querySelector('.sonhos');
    const sonhosSalvosJSON = localStorage.getItem('meusSonhos');

    if (!divSonhos || !sonhosSalvosJSON) return;

    const sonhosSalvos = JSON.parse(sonhosSalvosJSON);

    sonhosSalvos.forEach(textoDoSonho => {
        const addparagrafo = document.createElement('p');
        addparagrafo.textContent = textoDoSonho;
        
        addparagrafo.style.backgroundColor = gerarCorAleatoria(); 
        
        divSonhos.appendChild(addparagrafo);
    });
}

function a() {
    const inputElement = document.querySelector('.pergunta');
    const divSonhos = document.querySelector('.sonhos');
    
    if (!inputElement || !divSonhos) return;

    const sonhodigitado = inputElement.value.trim();
    
    if (sonhodigitado === '') return;

    if (verificarConteudoOfensivo(sonhodigitado)) {
        alert('Conteúdo impróprio detectado! Por favor, use palavras adequadas.');
        inputElement.value = ''; 
        return; 
    }

    const addparagrafo = document.createElement('p');
    addparagrafo.textContent = sonhodigitado;
    
    addparagrafo.style.backgroundColor = gerarCorAleatoria();

    divSonhos.appendChild(addparagrafo);

    const sonhosAtuais = [...divSonhos.querySelectorAll('p')].map(p => p.textContent);
    localStorage.setItem('meusSonhos', JSON.stringify(sonhosAtuais));

    inputElement.value = '';
}

document.addEventListener('DOMContentLoaded', carregarSonhos);