const botoesRacas = document.getElementById('botoes-racas');
const galeria = document.getElementById('galeria');
const mensagemCarregamento = document.getElementById('mensagem-carregamento');

async function buscarRacas() {
    try {
        const resposta = await fetch('https://dog.ceo/api/breeds/list/all');
        if (!resposta.ok) throw new Error('Não foi possível carregar as raças. Tente novamente mais tarde.');
        const dados = await resposta.json();
        exibirBotoes(dados.message);
    } catch (erro) {
        alert(erro.message);
    }
}

function exibirBotoes(racas) {
    botoesRacas.innerHTML = '';
    Object.keys(racas).forEach(raca => {
        const botao = document.createElement('button');
        botao.textContent = raca;
        botao.onclick = () => buscarImagensPorRaca(raca);
        botoesRacas.appendChild(botao);
    });
}

async function buscarImagensPorRaca(raca) {
    galeria.innerHTML = '';
    mensagemCarregamento.style.display = 'block'; 

    try {
        const resposta = await fetch(`https://dog.ceo/api/breed/${raca}/images/random/6`);
        if (!resposta.ok) throw new Error('Erro ao carregar as imagens. Tente novamente mais tarde.');
        const dados = await resposta.json();
        exibirImagens(dados.message);
    } catch (erro) {
        alert(erro.message);
    } finally {
        mensagemCarregamento.style.display = 'none'; 
    }
}

function exibirImagens(imagens) {
    imagens.forEach(imagemUrl => {
        const img = document.createElement('img');
        img.src = imagemUrl;
        img.alt = 'Imagem da raça de cachorro';
        img.classList.add('galeria-imagem');
        galeria.appendChild(img);
    });
}

buscarRacas();
