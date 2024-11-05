document.addEventListener("DOMContentLoaded", function () { // Aguarda que o documento seja completamente carregado antes de executar o código
    const form = document.querySelector("form");  // Seleciona o formulário na página
    const nomeInput = document.getElementById("nome-contato"); // Seleciona o campo de input onde o usuário insere o nome do contato
    const numInput = document.getElementById("num-contato"); // Seleciona o campo de input onde o usuário insere o número de telefone do contato
    const tbody = document.querySelector("tbody"); // Seleciona o elemento <tbody> da tabela, onde os novos contatos serão inseridos
    const contagemDisplay = document.getElementById("contagem");  // Seleciona o elemento onde é exibida a contagem de contatos no rodapé
    let contagem = 0;  // Inicializa a variável que mantém o número de contatos salvos

    form.addEventListener("submit", function (event) { // Adiciona um evento para o envio do formulário (quando o usuário clicar em "Adicionar")
        event.preventDefault();

        const nome = nomeInput.value.trim(); // Obtém o valor inserido no campo de nome, removendo quaisquer espaços extras no início ou no fim
        let numero = numInput.value.trim();  // Obtém o valor inserido no campo de número de telefone, também removendo espaços extras

        if (!validarNome(nome)) { // Verifica se o nome é válido, ou seja, se contém pelo menos um nome e sobrenome
            alert("Favor, digite nome e sobrenome.");
            return;
        }

        if (!validarNumero(numero)) { // Verifica se o número de telefone é válido, ou seja, se contém exatamente 11 dígitos
            alert("O número de telefone deve conter 11 dígitos!");
            return;
        }

        numero = formatarNumero(numero); // Se o número for válido, ele é formatado no padrão (XX) X.XXXX-XXXX

        adicionarContatoTabela(nome, numero); // Adiciona o contato (nome e número formatado) à tabela de contatos

        atualizarContagem();

        nomeInput.value = ""; // Limpa os campos de entrada de nome e número para preparar o formulário para um novo contato
        numInput.value = "";
    });

    function validarNome(nome) { // Função para validar o nome
        const partesNome = nome.split(" "); // Divide o nome em partes com base nos espaços (nome e sobrenome)
        return partesNome.length >= 2 && partesNome[1].length > 0; // Retorna verdadeiro se houver pelo menos 2 partes (nome e sobrenome) e a segunda parte não estiver vazia
    }

    function validarNumero(numero) { // Função para validar o número de telefone
        const regexNumero = /^[0-9]{11}$/; // Define uma expressão regular que verifica se o número contém exatamente 11 dígitos
        return regexNumero.test(numero);  // Testa o número contra a expressão regular e retorna verdadeiro se for válido
    }

    function formatarNumero(numero) { // Função para formatar o número de telefone no padrão (XX) X.XXXX-XXXX
        const parte1 = numero.slice(0, 2); // DDD
        const parte2 = numero.slice(2, 3); // Primeiro dígito do número
        const parte3 = numero.slice(3, 7); // Próximos 4 dígitos
        const parte4 = numero.slice(7, 11); // Últimos 4 dígitos

        return `(${parte1}) ${parte2}.${parte3}-${parte4}`; // Retorna o número formatado como uma string
    }

    function adicionarContatoTabela(nome, numero) { // Função para adicionar um novo contato à tabela
        const novaLinha = document.createElement("tr");

        const colunaNome = document.createElement("td");
        colunaNome.textContent = nome;
        novaLinha.appendChild(colunaNome);

        const colunaNumero = document.createElement("td");
        colunaNumero.textContent = numero;
        novaLinha.appendChild(colunaNumero);

        tbody.appendChild(novaLinha);
    }

    function atualizarContagem() { // Função para atualizar a contagem de contatos salvos
        contagem++;
        contagemDisplay.textContent = `${contagem} Contatos Salvos`;
    }
});