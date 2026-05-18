const form = document.querySelector('#formBusca');
const input = document.querySelector('#inputBusca');
const resultadosDiv = document.querySelector('#resultados');
const mensagemDiv = document.querySelector('#mensagem');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const termoDeBusca = input.value.trim();

    if (termoDeBusca === "") {
        mensagemDiv.textContent = "Por favor, digite o nome de uma série.";
        mensagemDiv.style.color = "#e74c3c"; 
        resultadosDiv.innerHTML = ""; 
        return; 
    }

    mensagemDiv.textContent = "Carregando...";
    mensagemDiv.style.color = "#3498db"; 
    resultadosDiv.innerHTML = ""; 

    try {
        const url = `https://api.tvmaze.com/search/shows?q=${termoDeBusca}`;
        
        const resposta = await fetch(url);
        
        if (!resposta.ok) {
            throw new Error(`Erro na requisição: Status ${resposta.status}`);
        }

        const dados = await resposta.json();

        mensagemDiv.textContent = "";

        if (dados.length === 0) {
            mensagemDiv.textContent = "Nenhuma série encontrada com esse nome.";
            mensagemDiv.style.color = "#e74c3c";
            return;
        }

        dados.forEach(item => {
            const serie = item.show;
            const scoreInfo = item.score;

            const card = document.createElement('div');
            card.classList.add('card');

            if (serie.image && serie.image.medium) {
                const img = document.createElement('img');
                img.src = serie.image.medium;
                img.alt = `Capa da série ${serie.name}`;
                card.appendChild(img); 
            } else {
                const divSemImagem = document.createElement('div');
                divSemImagem.classList.add('sem-imagem');
                divSemImagem.textContent = "Imagem não disponível";
                card.appendChild(divSemImagem);
            }

            const titulo = document.createElement('h3');
            titulo.textContent = serie.name;
            card.appendChild(titulo);

            const score = document.createElement('p');
            score.classList.add('score');
            score.textContent = `Score: ${(scoreInfo * 10).toFixed(1)} / 10`;
            card.appendChild(score);

            resultadosDiv.appendChild(card);
        });

    } catch (erro) {
        console.error("Erro capturado no catch:", erro);
        mensagemDiv.textContent = "Ocorreu um erro ao buscar as séries. Verifique sua conexão e tente novamente.";
        mensagemDiv.style.color = "#e74c3c";
    }
});