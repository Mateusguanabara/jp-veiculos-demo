// =========================================
// ELEMENTOS DA PÁGINA
// =========================================

const produtosDestaque = document.querySelector(
    "#produtos-destaque"
);

const produtosCatalogo = document.querySelector(
    "#produtos-catalogo"
);

const botoesFiltro = document.querySelectorAll(
    ".filtro-btn"
);

const pesquisaProduto = document.querySelector(
    "#pesquisa-produto"
);

let categoriaAtual = "todos";
let termoPesquisa = "";

// =========================================
// CRIAR CARD DO PRODUTO
// =========================================

function criarCardProduto(produto) {

    const card = document.createElement("article");

    card.classList.add("produto-card");

    card.innerHTML = `
        <div class="produto-imagem">

            <img
                src="${produto.imagem}"
                alt="${produto.nome}"
            >

        </div>

        <div class="produto-info">

            <span class="produto-categoria">
                ${produto.categoria}
            </span>

            <h3>
                ${produto.nome}
            </h3>

            <div class="produto-specs">

                <span>
                    ⚡ ${produto.potencia}
                </span>

                <span>
                    🔋 ${produto.bateria}
                </span>

                <span>
                    🛣️ ${produto.autonomia}
                </span>

            </div>

            <button
                class="btn-detalhes"
                type="button"
                data-id="${produto.id}">
                Ver detalhes
            </button>

        </div>
    `;

    return card;
}


// =========================================
// CARREGAR DESTAQUES
// =========================================

function carregarDestaques() {

    if (!produtosDestaque) {
        return;
    }

    // Modelos escolhidos para o carrossel
    const nomesDestaque = [
        "A7",
        "P-Cross",
        "P3 Plus",
        "P7",
        "PX9",
        "Storm"
    ];

    produtosDestaque.innerHTML = "";

    nomesDestaque.forEach(nomeProduto => {

        const produto = produtos.find(
            item => item.nome.toLowerCase() === nomeProduto.toLowerCase()
        );

        if (!produto) {
            console.warn(`Produto não encontrado: ${nomeProduto}`);
            return;
        }

        const card = criarCardProduto(produto);

        // Imagem especial do banner somente nos Destaques
        const imagem = card.querySelector(".produto-imagem img");

        if (imagem) {

            const imagensBanner = {
                "A7": "assets/img/banner/a7.png",
                "P-Cross": "assets/img/banner/p-cross.png",
                "P3 Plus": "assets/img/banner/p3-plus.png",
                "P7": "assets/img/banner/p7.png",
                "PX9": "assets/img/banner/px9.png",
                "Storm": "assets/img/banner/storm.png"
            };

            imagem.src = imagensBanner[produto.nome] || produto.imagem;
        }

        produtosDestaque.appendChild(card);

    });

}
// =========================================
// CARREGAR CATÁLOGO
// =========================================

function carregarCatalogo() {

    if (!produtosCatalogo) {
        return;
    }

    let produtosFiltrados = produtos;


    // FILTRAR POR CATEGORIA
    if (categoriaAtual !== "todos") {

        produtosFiltrados = produtosFiltrados.filter(
            produto => produto.categoria === categoriaAtual
        );

    }


    // FILTRAR PELA PESQUISA
    if (termoPesquisa !== "") {

        produtosFiltrados = produtosFiltrados.filter(produto => {

            const nome = produto.nome.toLowerCase();

            return nome.includes(termoPesquisa);

        });

    }


    produtosCatalogo.innerHTML = "";


    // NENHUM RESULTADO
    if (produtosFiltrados.length === 0) {

        produtosCatalogo.innerHTML = `
            <div class="catalogo-vazio">

                <p>
                    Nenhum modelo encontrado.
                </p>

            </div>
        `;

        return;
    }


    // CRIAR CARDS
    produtosFiltrados.forEach(produto => {

        const card = criarCardProduto(produto);

        produtosCatalogo.appendChild(card);

    });

}


// =========================================
// FILTROS DO CATÁLOGO
// =========================================

botoesFiltro.forEach(botao => {

    botao.addEventListener("click", () => {

        botoesFiltro.forEach(item => {
            item.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        categoriaAtual = botao.dataset.categoria;

        carregarCatalogo();

    });

});

// =========================================
// PESQUISA DE PRODUTOS
// =========================================

if (pesquisaProduto) {

    pesquisaProduto.addEventListener("input", () => {

        termoPesquisa =
            pesquisaProduto.value
                .trim()
                .toLowerCase();

        carregarCatalogo();

    });

}


// =========================================
// INICIAR SITE
// =========================================

carregarDestaques();
carregarCatalogo();

// =========================================
// MODAL - ELEMENTOS
// =========================================

const modalProduto = document.querySelector("#modal-produto");
const modalOverlay = document.querySelector("#modal-overlay");
const modalFechar = document.querySelector("#modal-fechar");
const modalImagem = document.querySelector("#modal-imagem");
const modalCategoria = document.querySelector("#modal-categoria");
const modalNome = document.querySelector("#modal-nome");
const modalPotencia = document.querySelector("#modal-potencia");
const modalBateria = document.querySelector("#modal-bateria");
const modalAutonomia = document.querySelector("#modal-autonomia");
const modalRe = document.querySelector("#modal-re");
const modalCores = document.querySelector("#modal-cores");
const modalSpecsExtras =
    document.querySelector("#modal-specs-extras");
const modalInteresse = document.querySelector("#modal-interesse");

// =========================================
// ABRIR MODAL
// =========================================

function abrirModalProduto(idProduto) {

    const produto = produtos.find(
        produto => produto.id === idProduto
    );

    if (!produto) {
        return;
    }

    // IMAGEM
    modalImagem.src = produto.imagem;
    modalImagem.alt = produto.nome;

    // TAMANHO ESPECIAL PARA PATINETES
    modalImagem.classList.remove("imagem-patinete");

    if (produto.categoria === "patinetes") {
        modalImagem.classList.add("imagem-patinete");
    }

    // INFORMAÇÕES
    modalCategoria.textContent = produto.categoria;
    modalNome.textContent = produto.nome;
    modalPotencia.textContent = produto.potencia;
    modalBateria.textContent = produto.bateria;
    modalAutonomia.textContent = produto.autonomia;

    // WHATSAPP - INTERESSE NO MODELO

    if (modalInteresse) {

        const mensagem =
            `Olá! Tenho interesse no ${produto.nome}. Gostaria de saber mais informações sobre este modelo.`;

        modalInteresse.href =
            `https://wa.me/553898941134?text=${encodeURIComponent(mensagem)}`;

        modalInteresse.target = "_blank";
        modalInteresse.rel = "noopener noreferrer";
    }

    modalRe.textContent =
        produto.re === true
            ? "Sim"
            : produto.re === false
                ? "Não"
                : "Consulte disponibilidade";
    // CORES
    modalCores.innerHTML = "";

    if (produto.cores && produto.cores.length > 0) {

        produto.cores.forEach(cor => {

            const elementoCor = document.createElement("span");

            elementoCor.classList.add("modal-cor");

            elementoCor.textContent = cor;

            modalCores.appendChild(elementoCor);

        });

    } else {

        const semCor = document.createElement("span");

        semCor.classList.add("modal-cor");

        semCor.textContent = "Consulte disponibilidade";

        modalCores.appendChild(semCor);
    }

    // =========================================
    // ESPECIFICAÇÕES EXTRAS
    // =========================================

    if (modalSpecsExtras) {
        modalSpecsExtras.innerHTML = "";
    }

    function adicionarSpecExtra(icone, titulo, valor) {

        if (
            valor === undefined ||
            valor === null ||
            valor === ""
        ) {
            return;
        }

        const spec = document.createElement("div");

        spec.classList.add("modal-spec");

        spec.innerHTML = `
        <span>
            ${icone} ${titulo}
        </span>

        <strong>
            ${valor}
        </strong>
    `;

        if (modalSpecsExtras) {
            modalSpecsExtras.appendChild(spec);
        }
    }

    // TEMPO DE RECARGA
    adicionarSpecExtra(
        "🔌",
        "Tempo de recarga",
        produto.tempoRecarga
    );


    // VELOCIDADE

    adicionarSpecExtra(
        "🏁",
        "Velocidade máxima",
        produto.velocidade
    );


    // NÍVEIS DE VELOCIDADE

    adicionarSpecExtra(
        "⚙️",
        "Velocidades",
        produto.niveisVelocidade
    );


    // ALARME

    if (produto.alarme === true) {

        adicionarSpecExtra(
            "🛡️",
            "Sistema de alarme",
            "Sim"
        );

    }


    // PARTIDA REMOTA

    if (produto.partidaRemota === true) {

        adicionarSpecExtra(
            "🔑",
            "Partida remota",
            "Sim"
        );

    }

    // ABRIR
    modalProduto.classList.add("ativo");

    document.body.style.overflow = "hidden";
}


// =========================================
// FECHAR MODAL
// =========================================

function fecharModalProduto() {

    modalProduto.classList.remove("ativo");

    document.body.style.overflow = "";
}


// =========================================
// CLIQUE EM VER DETALHES
// =========================================

document.addEventListener("click", event => {

    const botao = event.target.closest(".btn-detalhes");

    if (!botao) {
        return;
    }

    const idProduto = botao.dataset.id;

    abrirModalProduto(idProduto);
});


// =========================================
// BOTÃO X
// =========================================

modalFechar.addEventListener(
    "click",
    fecharModalProduto
);


// =========================================
// CLIQUE FORA DO MODAL
// =========================================

modalOverlay.addEventListener(
    "click",
    fecharModalProduto
);


// =========================================
// TECLA ESC
// =========================================

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        modalProduto.classList.contains("ativo")
    ) {

        fecharModalProduto();

    }

});

// =========================================
// MENU MOBILE
// =========================================

const menuToggle = document.querySelector("#menu-toggle");
const nav = document.querySelector("#nav");

if (menuToggle && nav) {

    // ABRIR / FECHAR MENU
    menuToggle.addEventListener("click", () => {

        const menuAberto = nav.classList.toggle("ativo");

        menuToggle.classList.toggle("ativo", menuAberto);

        menuToggle.setAttribute(
            "aria-expanded",
            menuAberto
        );

        // Troca ☰ por ×
        menuToggle.textContent =
            menuAberto ? "×" : "☰";

    });


    // FECHAR AO CLICAR EM UM LINK
    const linksMenu = nav.querySelectorAll("a");

    linksMenu.forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("ativo");
            menuToggle.classList.remove("ativo");

            menuToggle.textContent = "☰";

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    // FECHAR AO CLICAR FORA
    document.addEventListener("click", event => {

        const clicouNoMenu =
            nav.contains(event.target);

        const clicouNoBotao =
            menuToggle.contains(event.target);

        if (
            !clicouNoMenu &&
            !clicouNoBotao &&
            nav.classList.contains("ativo")
        ) {

            nav.classList.remove("ativo");
            menuToggle.classList.remove("ativo");

            menuToggle.textContent = "☰";

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}

// =========================================
// CARROSSEL DE DESTAQUES
// =========================================

const destaqueAnterior =
    document.querySelector("#destaque-anterior");

const destaqueProximo =
    document.querySelector("#destaque-proximo");

const destaquesIndicadores =
    document.querySelectorAll(".destaque-indicador");

let paginaDestaque = 0;


// =========================================
// QUANTIDADE VISÍVEL
// =========================================

function quantidadeDestaquesVisiveis() {

    if (window.innerWidth <= 520) {
        return 1;
    }

    return 3;
}


// =========================================
// ATUALIZAR CARROSSEL
// =========================================

function atualizarCarrosselDestaques() {

    if (!produtosDestaque) {
        return;
    }

    const cards =
        produtosDestaque.querySelectorAll(".produto-card");

    if (cards.length === 0) {
        return;
    }

    const quantidadeVisivel =
        quantidadeDestaquesVisiveis();


    // CELULAR - 1 PRODUTO POR VEZ
    if (quantidadeVisivel === 1) {

        cards.forEach((card, index) => {

            card.classList.toggle(
                "destaque-visivel",
                index === paginaDestaque
            );

        });

    }

    // PC - 3 PRODUTOS POR VEZ
    else {

        const inicio =
            paginaDestaque * quantidadeVisivel;

        const fim =
            inicio + quantidadeVisivel;

        cards.forEach((card, index) => {

            card.classList.toggle(
                "destaque-visivel",
                index >= inicio && index < fim
            );

        });

    }


    // INDICADORES
    destaquesIndicadores.forEach((indicador, index) => {

        let indicadorAtivo;

        if (quantidadeVisivel === 1) {

            indicadorAtivo =
                paginaDestaque < 3 ? 0 : 1;

        } else {

            indicadorAtivo = paginaDestaque;

        }

        indicador.classList.toggle(
            "ativo",
            index === indicadorAtivo
        );

    });

}


// =========================================
// SETA DIREITA
// =========================================

if (destaqueProximo) {

    destaqueProximo.addEventListener("click", () => {

        const cards =
            produtosDestaque.querySelectorAll(".produto-card");

        const quantidadeVisivel =
            quantidadeDestaquesVisiveis();


        if (quantidadeVisivel === 1) {

            paginaDestaque++;

            if (paginaDestaque >= cards.length) {
                paginaDestaque = 0;
            }

        } else {

            paginaDestaque =
                paginaDestaque === 0 ? 1 : 0;

        }

        atualizarCarrosselDestaques();

    });

}


// =========================================
// SETA ESQUERDA
// =========================================

if (destaqueAnterior) {

    destaqueAnterior.addEventListener("click", () => {

        const cards =
            produtosDestaque.querySelectorAll(".produto-card");

        const quantidadeVisivel =
            quantidadeDestaquesVisiveis();


        if (quantidadeVisivel === 1) {

            paginaDestaque--;

            if (paginaDestaque < 0) {
                paginaDestaque = cards.length - 1;
            }

        } else {

            paginaDestaque =
                paginaDestaque === 0 ? 1 : 0;

        }

        atualizarCarrosselDestaques();

    });

}


// =========================================
// INDICADORES
// =========================================

destaquesIndicadores.forEach(indicador => {

    indicador.addEventListener("click", () => {

        const pagina =
            Number(indicador.dataset.pagina);

        if (quantidadeDestaquesVisiveis() === 1) {

            paginaDestaque =
                pagina === 0 ? 0 : 3;

        } else {

            paginaDestaque = pagina;

        }

        atualizarCarrosselDestaques();

    });

});


// =========================================
// RESPONSIVIDADE
// =========================================

window.addEventListener("resize", () => {

    paginaDestaque = 0;

    atualizarCarrosselDestaques();

});


// INICIAR CARROSSEL
atualizarCarrosselDestaques();