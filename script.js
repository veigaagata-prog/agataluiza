                                                                                                     // ==========================================
// 1. FUNCIONALIDADES DO FORMULÁRIO (MODAL)
// ==========================================

function abrirFormulario() {
    document.getElementById('modalFormulario').style.display = 'flex';
}

function fecharFormulario() {
    document.getElementById('modalFormulario').style.display = 'none';
}

function salvarRegistro(event) {
    event.preventDefault(); // Impede a página de recarregar
   
    // Captura o que o usuário preencheu
    const descricao = document.getElementById('descricao').value;
    const valor = document.getElementById('valor').value;
    const tipo = document.getElementById('tipo').value;

    // Mensagem de sucesso simulando a gravação dos dados
    alert(`Sucesso!\nRegistro Salvo:\n- Item: ${descricao}\n- Valor: R$ ${valor}\n- Tipo: ${tipo.toUpperCase()}`);
   
    // Limpa o formulário e fecha a janela
    document.getElementById('meuFormulario').reset();
    fecharFormulario();
}

// Fechar se o usuário clicar fora da caixinha branca
window.onclick = function(event) {
    const modal = document.getElementById('modalFormulario');
    if (event.target == modal) {
        fecharFormulario();
    }
}

// ==========================================
// 2. FUNCIONALIDADES DE ACESSIBILIDADE
// ==========================================

function alternarContraste() {
    document.body.classList.toggle('alto-contraste');
}

let tamanhoFonteAtual = 16;
function alterarFonte(mudanca) {
    tamanhoFonteAtual += mudanca;
    if (tamanhoFonteAtual >= 12 && tamanhoFonteAtual <= 24) {
        document.body.style.fontSize = tamanhoFonteAtual + 'px';
    }
}

// ==========================================
// 3. LÓGICA DO JOGUINHO FINANCEIRO
// ==========================================

let saldoJogo = 1000;
let cenarioAtual = 0;

const cenarios = [
    {
        texto: "Cenário 1: Chegou a época de combater as lagartas na horta de alface. O que você faz?",
        opcoes: [
            { texto: "Comprar defensivo químico caro (Gasta R$ 300)", alteracao: -300 },
            { texto: "Fazer uma receita natural de fumo e sabão (Gasta R$ 50)", alteracao: -50 }
        ]
    },
    {
        texto: "Cenário 2: Um restaurante local quer comprar toda sua produção de tomates por um preço justo, mas pede entrega semanal regular. O que você faz?",
        opcoes: [
            { texto: "Recusar com medo de não dar conta (Ganha R$ 0)", alteracao: 0 },
            { texto: "Aceitar e planejar o plantio escalonado (Ganha R$ 600)", alteracao: 600 }
        ]
    },
    {
        texto: "Cenário 3: O sistema de irrigação está vazando um pouco de água. O que você faz?",
        opcoes: [
            { texto: "Deixar para consertar no mês que vem (Aumento na conta de luz: Gasta R$ 200)", alteracao: -200 },
            { texto: "Consertar imediatamente com fita veda-rosca (Gasta R$ 20)", alteracao: -20 }
        ]
    }
];

function carregarCenario() {
    const statusExibicao = document.getElementById('jogo-status');
    const caixaCenario = document.getElementById('caixa-cenario');
    const caixaOpcoes = document.getElementById('caixa-opcoes');
   
    if (cenarioAtual < cenarios.length) {
        const cenario = cenarios[cenarioAtual];
        caixaCenario.textContent = cenario.texto;
        caixaOpcoes.innerHTML = '';
       
        cenario.opcoes.forEach(opcao => {
            const botao = document.createElement('button');
            botao.className = 'btn-opcao';
            botao.textContent = opcao.texto;
            botao.onclick = () => tomarDecisao(opcao.alteracao);
            caixaOpcoes.appendChild(botao);
        });
       
        statusExibicao.textContent = `Saldo da Fazenda: R$ ${saldoJogo.toFixed(2).replace('.', ',')}`;
    } else {
        caixaCenario.textContent = "Fim do Jogo! Obrigado por administrar sua propriedade de forma consciente.";
        caixaOpcoes.innerHTML = '';
       
        if (saldoJogo > 1000) {
            statusExibicao.textContent = `Resultado: Excelente gestor! Saldo Final: R$ ${saldoJogo.toFixed(2).replace('.', ',')}`;
            statusExibicao.style.color = "#16a34a";
        } else {
            statusExibicao.textContent = `Resultado: Atenção aos seus gastos! Saldo Final: R$ ${saldoJogo.toFixed(2).replace('.', ',')}`;
            statusExibicao.style.color = "#ea580c";
        }
    }
}

function tomarDecisao(valor) {
    saldoJogo += valor;
    cenarioAtual++;
    carregarCenario();
}

// Inicializa o jogo ao carregar a página
window.addEventListener('DOMContentLoaded', carregarCenario)