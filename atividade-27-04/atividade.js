// Definição da classe base do aluno
class Aluno {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }
}

// Definição da classe que gerencia o sistema
class SistemaAlunos {
    constructor() {
        this.alunos = [];
    }

    adicionarAluno(nome, idade) {
        if (idade <= 0 || isNaN(idade)) {
            alert(`Erro: A idade informada para ${nome} é inválida.`);
            return;
        }

        const nomeDuplicado = this.alunos.some(aluno => aluno.nome.toLowerCase() === nome.toLowerCase());
        if (nomeDuplicado) {
            alert(`Erro: O aluno "${nome}" já está cadastrado.`);
            return;
        }

        const novoAluno = new Aluno(nome, idade);
        this.alunos.push(novoAluno);
        alert(`Sucesso: Aluno "${nome}" adicionado.`);
    }

    listarAlunos() {
        if (this.alunos.length === 0) {
            alert("Nenhum aluno cadastrado no momento.");
            return;
        }

        let listaFormatada = "--- Lista de Alunos ---\n\n";
        this.alunos.forEach((aluno, index) => {
            listaFormatada += `[${index + 1}] Nome: ${aluno.nome} | Idade: ${aluno.idade} anos\n`;
        });
        
        alert(listaFormatada);
    }

    buscarAluno(nome) {
        const aluno = this.alunos.find(a => a.nome.toLowerCase() === nome.toLowerCase());
        if (aluno) {
            alert(`Resultado da busca: ${aluno.nome} tem ${aluno.idade} anos.`);
        } else {
            alert(`Erro: Aluno "${nome}" não encontrado.`);
        }
    }

    alterarAluno(nomeBusca, novoNome, novaIdade) {
        const index = this.alunos.findIndex(a => a.nome.toLowerCase() === nomeBusca.toLowerCase());

        if (index === -1) {
            alert(`Erro: Aluno "${nomeBusca}" não encontrado para alteração.`);
            return;
        }

        if (novaIdade <= 0 || isNaN(novaIdade)) {
            alert("Erro: A nova idade é inválida.");
            return;
        }

        if (novoNome.toLowerCase() !== nomeBusca.toLowerCase()) {
            const nomeDuplicado = this.alunos.some(a => a.nome.toLowerCase() === novoNome.toLowerCase());
            if (nomeDuplicado) {
                alert(`Erro: Já existe outro aluno cadastrado com o nome "${novoNome}".`);
                return;
            }
        }

        this.alunos[index].nome = novoNome;
        this.alunos[index].idade = novaIdade;
        alert(`Sucesso: Dados de "${nomeBusca}" atualizados para -> Nome: ${novoNome}, Idade: ${novaIdade}.`);
    }

    removerAluno(nome) {
        const index = this.alunos.findIndex(a => a.nome.toLowerCase() === nome.toLowerCase());

        if (index !== -1) {
            this.alunos.splice(index, 1);
            alert(`Sucesso: Aluno "${nome}" foi removido.`);
        } else {
            alert(`Erro: Aluno "${nome}" não encontrado para remoção.`);
        }
    }
}

// --- Menu Interativo ---

const sistema = new SistemaAlunos();
let opcao;

do {
    opcao = prompt(
        "SISTEMA DE GERENCIAMENTO DE ALUNOS\n\n" +
        "Escolha uma opção digitando o número:\n" +
        "1 - Adicionar aluno\n" +
        "2 - Listar alunos\n" +
        "3 - Buscar aluno\n" +
        "4 - Alterar aluno\n" +
        "5 - Remover aluno\n" +
        "0 - Sair do sistema"
    );

    switch (opcao) {
        case "1":
            let nomeAdd = prompt("Digite o nome do aluno:");
            if (nomeAdd) {
                let idadeAdd = parseInt(prompt("Digite a idade do aluno:"));
                sistema.adicionarAluno(nomeAdd, idadeAdd);
            }
            break;
        case "2":
            sistema.listarAlunos();
            break;
        case "3":
            let nomeBusca = prompt("Digite o nome do aluno que deseja buscar:");
            if (nomeBusca) sistema.buscarAluno(nomeBusca);
            break;
        case "4":
            let nomeAlt = prompt("Digite o nome atual do aluno:");
            if (nomeAlt) {
                let novoNome = prompt("Digite o NOVO nome do aluno:");
                let novaIdade = parseInt(prompt("Digite a NOVA idade do aluno:"));
                if (novoNome) sistema.alterarAluno(nomeAlt, novoNome, novaIdade);
            }
            break;
        case "5":
            let nomeRemover = prompt("Digite o nome do aluno que deseja remover:");
            if (nomeRemover) sistema.removerAluno(nomeRemover);
            break;
        case "0":
            alert("Saindo do sistema...");
            break;
        case null: // Trata o caso de clicar em "Cancelar" no prompt
            opcao = "0"; 
            break;
        default:
            alert("Opção inválida! Tente novamente.");
    }

} while (opcao !== "0");