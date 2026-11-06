// ==========================================
// 1. NAVEGAÇÃO E HISTÓRICO DE SEÇÕES ANTIGAS
// ==========================================

function navegarPara(idPagina, nomeAmigavel = null) {
    const paginas = document.querySelectorAll('.pagina');
    paginas.forEach(p => p.style.display = 'none');

    const paginaAlvo = document.getElementById(idPagina);
    if (paginaAlvo) {
        paginaAlvo.style.display = 'block';
    }

    // Registrar no histórico de navegação
    if (nomeAmigavel) {
        salvarHistoricoNavegacao(idPagina, nomeAmigavel);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function salvarHistoricoNavegacao(idPagina, titulo, dadosExtras = null) {
    let historico = JSON.parse(localStorage.getItem('historico_secoes_erer') || '[]');
    const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    historico.unshift({ idPagina, titulo, hora, dadosExtras });
    
    // Evita duplicatas consecutivas
    historico = historico.filter((item, index, self) =>
        index === self.findIndex((t) => t.idPagina === item.idPagina && t.titulo === item.titulo)
    );

    localStorage.setItem('historico_secoes_erer', JSON.stringify(historico.slice(0, 15)));
    renderizarHistoricoNavegacao();
}

function renderizarHistoricoNavegacao() {
    const container = document.getElementById('lista-historico-navegacao');
    if (!container) return;

    const historico = JSON.parse(localStorage.getItem('historico_secoes_erer') || '[]');

    if (historico.length === 0) {
        container.innerHTML = '<p style="color: #94a3b8; font-size: 0.9rem;">Você ainda não navegou por nenhuma seção nesta sessão.</p>';
        return;
    }

    container.innerHTML = historico.map(item => `
        <div onclick="reabrirSecaoAntiga('${item.idPagina}', '${item.dadosExtras || ''}')" style="background: #f8fafc; padding: 12px 16px; border-radius: 10px; border: 1px solid #e2e8f0; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: background 0.2s;">
            <div>
                <strong style="color: #5c2c16; font-size: 0.95rem;">${item.titulo}</strong>
                <span style="font-size: 0.8rem; color: #64748b; display: block;">Clique para abrir novamente</span>
            </div>
            <span style="font-size: 0.8rem; color: #94a3b8; font-weight: 600;">${item.hora}</span>
        </div>
    `).join('');
}

function reabrirSecaoAntiga(idPagina, paramExtra) {
    if (idPagina === 'pagina-detalhe-biografia' && paramExtra) {
        abrirDetalheBiografia(paramExtra, false);
    } else {
        navegarPara(idPagina);
    }
}

function limparHistoricoNavegacao() {
    localStorage.removeItem('historico_secoes_erer');
    renderizarHistoricoNavegacao();
}

// ==========================================
// 2. BIOGRAFIAS EXTENSAS E DETALHADAS
// ==========================================

const dadosBiografias = {
    dandara: {
        nome: "Dandara dos Palmares",
        subtitulo: "Guerreira, Liderança Quilombola e Símbolo da Resistência Antiescravista",
        foto: "assets/dandara.png",
        texto: `
            <h3 style="color: #5c2c16; margin-top: 0;">1. Origens e Contexto Histórico</h3>
            <p><strong>Dandara dos Palmares</strong> foi uma das figuras centrais no maior abrigo de pessoas escravizadas das Américas: o Quilombo dos Palmares, localizado na Serra da Barriga (atual estado de Alagoas). Apesar dos registros históricos escritos sobre mulheres negras no século XVII serem escassos devido ao apagamento colonial, a tradição oral e as pesquisas historiográficas resgataram a sua importância vital como estrategista militar e política.</p>
            
            <h3 style="color: #5c2c16;">2. Liderança Militar e Estratégia</h3>
            <p>Dandara não atuava apenas na retaguarda. Ela dominava as técnicas da capoeira e liderava diretamente batalhas armadas contra as expedições portuguesas e holandesas que tentavam destruir o quilombo. Era conhecida por sua recusa intransigente a qualquer acordo que concedesse liberdade parcial mantendo outros negros escravizados — como o Tratado de Recife proposto em 1678.</p>

            <h3 style="color: #5c2c16;">3. Legado para o Antirracismo Contemporâneo</h3>
            <p>Após ser presa em combate em 1694, Dandara preferiu a morte a retornar à condição de escravizada. Atualmente, seu nome está inscrito no <em>Livro dos Heróis e Heroínas da Pátria</em> e ela é uma referência fundamental para o feminismo negro e a luta por equidade racial no Brasil.</p>
        `
    },
    krenak: {
        nome: "Ailton Krenak",
        subtitulo: "Líder Indígena, Filósofo, Ambientalista e Escritor Imortal",
        foto: "assets/krenak.png",
        texto: `
            <h3 style="color: #2e5a44; margin-top: 0;">1. Trajetória e Ativismo Político</h3>
            <p>Nascido na região do Vale do Rio Doce (MG), <strong>Ailton Krenak</strong> pertence ao povo Krenak. Durante a Assembleia Nacional Constituinte em 1987, ele protagonizou uma das cenas mais emblemáticas da história do Brasil: pintou o rosto com o sumo preto do urucum enquanto discursava na tribuna em defesa dos direitos territoriais e culturais dos povos originários.</p>

            <h3 style="color: #2e5a44;">2. Contribuição Filosófica e Literária</h3>
            <p>Krenak é autor de obras aclamadas internacionalmente, como <em>"Ideias para adiar o fim do mundo"</em>, <em>"A vida não é útil"</em> e <em>"Futuro ancestral"</em>. Seus escritos questionam a visão ocidental de progresso desenfreado e propõem uma reconexão respeitosa com a natureza e com os saberes tradicionais.</p>

            <h3 style="color: #2e5a44;">3. Reconhecimento na Academia Brasileira de Letras</h3>
            <p>Em 2023, tornou-se o primeiro indígena a ser eleito imortal da Academia Brasileira de Letras (ABL), ocupando a cadeira de número 5, um marco histórico de representatividade das matrizes indígenas no pensamento nacional.</p>
        `
    },
    sueli: {
        nome: "Sueli Carneiro",
        subtitulo: "Filósofa, Escritora e Referência do Feminismo Negro",
        foto: "assets/sueli.png",
        texto: `
            <h3 style="color: #d97724; margin-top: 0;">1. Formação e Intelectualidade</h3>
            <p><strong>Aparecida Sueli Carneiro</strong> é doutora em Filosofia da Educação pela USP. Desde a década de 1970, dedica sua vida acadêmica e política ao estudo das interseções entre raça, gênero e classe social na estrutura brasileira.</p>

            <h3 style="color: #d97724;">2. Fundação do Geledés e Políticas Públicas</h3>
            <p>Em 1988, fundou o <em>Geledés — Instituto da Mulher Negra</em>, uma das organizações civis mais importantes do país na defesa dos direitos das mulheres negras e na articulação de políticas públicas de ação afirmativa e cotas raciais nas universidades.</p>

            <h3 style="color: #d97724;">3. Conceitos Fundamentais</h3>
            <p>Sueli formulou o conceito de <em>"Epistemicídio"</em> na realidade brasileira — o processo de apagamento e desvalorização dos saberes e produções intelectuais de populações negras e indígenas.</p>
        `
    },
    machado: {
        nome: "Machado de Assis",
        subtitulo: "Fundador da ABL e Genialidade da Literatura Brasileira",
        foto: "assets/machado.png",
        texto: `
            <h3 style="color: #5c2c16; margin-top: 0;">1. Vida e Letramento</h3>
            <p><strong>Joaquim Maria Machado de Assis</strong> (1839–1908), homem negro nascido no Rio de Janeiro, superou barreiras sociais e a epilepsia para se tornar o maior romancista, contista e cronista da língua portuguesa.</p>

            <h3 style="color: #5c2c16;">2. Obras Mágicas e Crítica Social</h3>
            <p>Autor de clássicos como <em>"Dom Casmurro"</em> e <em>"Memórias Póstumas de Brás Cubas"</em>, utilizou a ironia e a sofisticação psicológica para denunciar a hipocrisia das elites da época e a estrutura escravocrata do Brasil colonial e imperial.</p>
        `
    },
    zumbi: {
        nome: "Zumbi dos Palmares",
        subtitulo: "Líder Guerreiro e Símbolo da Consciência Negra",
        foto: "assets/zumbi.png",
        texto: `
            <h3 style="color: #5c2c16; margin-top: 0;">1. Liderança em Palmares</h3>
            <p><strong>Zumbi dos Palmares</strong> foi o último dos grandes líderes do Quilombo dos Palmares. Sob seu comando, o quilombo resistiu a dezenas de ataques militares, abrigando milhares de pessoas em busca de liberdade e autonomia.</p>

            <h3 style="color: #5c2c16;">2. O 20 de Novembro</h3>
            <p>Morto em combate no dia 20 de novembro de 1695, sua data de falecimento foi escolhida como o <strong>Dia Nacional da Consciência Negra</strong>, celebrando a luta contínua por direitos e igualdade.</p>
        `
    }
};

function abrirDetalheBiografia(idPersonagem, registrarHistorico = true) {
    const dados = dadosBiografias[idPersonagem];
    if (!dados) return;

    document.getElementById('bio-nome').innerText = dados.nome;
    document.getElementById('bio-subtitulo').innerText = dados.subtitulo;
    document.getElementById('bio-foto').src = dados.foto;
    document.getElementById('bio-texto').innerHTML = dados.texto;

    if (registrarHistorico) {
        salvarHistoricoNavegacao('pagina-detalhe-biografia', `Biografia: ${dados.nome}`, idPersonagem);
    }

    navegarPara('pagina-detalhe-biografia');
}

// ==========================================
// 3. AUTENTICAÇÃO E CONTA
// ==========================================

function alternarAba(aba) {
    const formLogin = document.getElementById('form-login');
    const formCadastro = document.getElementById('form-cadastro');
    const abaLogin = document.getElementById('aba-login');
    const abaCadastro = document.getElementById('aba-cadastro');

    if (aba === 'login') {
        formLogin.style.display = 'block';
        formCadastro.style.display = 'none';
        abaLogin.style.background = '#ffffff';
        abaLogin.style.color = '#5c2c16';
        abaCadastro.style.background = 'transparent';
        abaCadastro.style.color = '#64748b';
    } else {
        formLogin.style.display = 'none';
        formCadastro.style.display = 'block';
        abaCadastro.style.background = '#ffffff';
        abaCadastro.style.color = '#d97724';
        abaLogin.style.background = 'transparent';
        abaLogin.style.color = '#64748b';
    }
}

function realizarCadastro() {
    const nome = document.getElementById('cad-nome').value.trim();
    const turma = document.getElementById('cad-turma').value.trim();
    const email = document.getElementById('cad-email').value.trim().toLowerCase();
    const senha = document.getElementById('cad-senha').value.trim();

    if (!nome || !turma || !email || !senha) {
        alert("Preencha todos os campos do cadastro.");
        return;
    }

    const contas = JSON.parse(localStorage.getItem('contas_erer') || '{}');

    if (contas[email]) {
        alert("E-mail já cadastrado! Faça login.");
        alternarAba('login');
        document.getElementById('login-email').value = email;
        return;
    }

    contas[email] = { nome, turma, email, senha };
    localStorage.setItem('contas_erer', JSON.stringify(contas));

    alert("Conta criada com sucesso! Faça login com suas credenciais.");
    document.getElementById('form-cadastro').reset();
    alternarAba('login');
    document.getElementById('login-email').value = email;
}

function realizarLogin() {
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const senha = document.getElementById('login-senha').value.trim();

    const contas = JSON.parse(localStorage.getItem('contas_erer') || '{}');

    if (!contas[email]) {
        alert("Conta não encontrada. Crie uma nova conta!");
        return;
    }

    if (contas[email].senha !== senha) {
        alert("Senha incorreta!");
        return;
    }

    const usuario = contas[email];

    const historico = JSON.parse(localStorage.getItem('historico_login') || '[]');
    const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    historico.unshift({ nome: usuario.nome, turma: usuario.turma, hora: horaAtual });
    localStorage.setItem('historico_login', JSON.stringify(historico.slice(0, 5)));

    document.getElementById('label-usuario').innerText = `${usuario.nome} (${usuario.turma})`;
    document.getElementById('secao-login').style.display = 'none';
    document.getElementById('app-conteudo').style.display = 'block';

    navegarPara('pagina-home', 'Página Inicial');
    carregarHistoricoLogin();
}

function logout() {
    document.getElementById('secao-login').style.display = 'flex';
    document.getElementById('app-conteudo').style.display = 'none';
    document.getElementById('form-login').reset();
    document.getElementById('form-cadastro').reset();
}

function carregarHistoricoLogin() {
    const historicoContainer = document.getElementById('historico-login');
    if (!historicoContainer) return;

    const historico = JSON.parse(localStorage.getItem('historico_login') || '[]');

    if (historico.length === 0) {
        historicoContainer.innerHTML = '<span style="font-size: 0.8rem; color: #94a3b8;">Nenhum acesso recente.</span>';
        return;
    }

    historicoContainer.innerHTML = historico.map(item => `
        <div style="background: #f8fafc; padding: 6px 10px; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 0.8rem; display: flex; justify-content: space-between;">
            <strong>${item.nome} (${item.turma})</strong>
            <span style="color: #64748b;">${item.hora}</span>
        </div>
    `).join('');
}

// ==========================================
// 4. TUTOR IA COM RESPOSTAS EXTENSAS
// ==========================================

const baseRespostasIA = [
    {
        chave: "dandara",
        resposta: "Dandara dos Palmares foi uma grande líder militar e política do século XVII no Quilombo dos Palmares. Dominava a capoeira e combateu os colonizadores portugueses e holandeses. Ela se recusou expressamente a aceitar tratados que mantivessem outros irmãos negros na escravidão, tornando-se um marco indiscutível de resistência total."
    },
    {
        chave: "krenak",
        resposta: "Ailton Krenak é um dos maiores pensadores contemporâneos do Brasil. Líder do povo Krenak, teve papel decisivo na elaboração dos artigos 231 e 232 da Constituição de 1988 que asseguram os direitos indígenas. É autor de 'Ideias para adiar o fim do mundo' e membro imortal da Academia Brasileira de Letras."
    },
    {
        chave: "sueli",
        resposta: "Sueli Carneiro é doutora em Filosofia da Educação pela USP e uma das maiores teóricas do antirracismo nas Américas. Fundou o Geledés — Instituto da Mulher Negra e desenvolveu o conceito de 'epistemicídio', denunciando a anulação histórica dos saberes negros e originários."
    },
    {
        chave: "estrutural",
        resposta: "Racismo Estrutural significa que as desigualdades raciais não ocorrem apenas por preconceitos individuais isolados, mas sim porque as instituições políticas, jurídicas e econômicas da sociedade foram construídas de forma a privilegiar historicamente um grupo em detrimento de outros."
    },
    {
        chave: "antirracismo",
        resposta: "O Antirracismo é a compreensão ativa de que não basta apenas não ser abertamente racista. Exige uma postura constante de identificação, denúncia e desconstrução das práticas, privilégios e estruturas discriminatórias no cotidiano e nas instituições."
    }
];

function enviarMensagemIA() {
    const input = document.getElementById('mensagem-usuario');
    const texto = input.value.trim();

    if (!texto) return;

    const caixaChat = document.getElementById('caixa-chat');

    const msgUsuario = document.createElement('div');
    msgUsuario.style.cssText = "background: #5c2c16; color: #ffffff; padding: 10px 14px; border-radius: 12px; max-width: 80%; align-self: flex-end; font-size: 0.9rem;";
    msgUsuario.innerText = texto;
    caixaChat.appendChild(msgUsuario);

    input.value = "";
    caixaChat.scrollTop = caixaChat.scrollHeight;

    setTimeout(() => {
        let respostaTexto = "Essa é uma excelente questão pedagógica! No âmbito das Relações Étnico-Raciais (ERER), é fundamental entender como os saberes de matrizes africanas e indígenas moldaram a formação social, cultural e científica do Brasil. Recomendo pesquisar o Glossário e nossas Biografias para um detalhamento profundo.";

        const busca = texto.toLowerCase();
        const encontrado = baseRespostasIA.find(item => busca.includes(item.chave));
        if (encontrado) {
            respostaTexto = encontrado.resposta;
        }

        const msgIA = document.createElement('div');
        msgIA.style.cssText = "background: #e2e8f0; color: #0f172a; padding: 12px 16px; border-radius: 12px; max-width: 85%; align-self: flex-start; font-size: 0.95rem; line-height: 1.6;";
        msgIA.innerText = respostaTexto;
        caixaChat.appendChild(msgIA);

        caixaChat.scrollTop = caixaChat.scrollHeight;
    }, 600);
}

// ==========================================
// 5. QUIZ COM EXPLICATIVO DETALHADO
// ==========================================

const perguntasQuiz = [
    {
        pergunta: "Qual foi a postura histórica de Dandara dos Palmares frente ao Tratado de Recife?",
        opcoes: [
            "Rejeitou o acordo por não garantir a liberdade total de todas as pessoas escravizadas",
            "Aceitou o acordo imediatamente para encerrar os conflitos",
            "Abandonou o quilombo para viver isolada"
        ],
        correta: 0,
        explicacao: "Dandara se opôs categoricamente ao acordo de paz proporsto em 1678 porque ele libertava apenas os nascidos em Palmares, mantendo todos os demais africanos na escravidão."
    },
    {
        pergunta: "O que caracteriza o conceito de Epistemicídio formulado no pensamento social?",
        opcoes: [
            "Um tipo de ritual de passagem indígena",
            "O processo sistemático de desvalorização e apagamento dos conhecimentos de povos marginalizados",
            "Um movimento literário do século XIX"
        ],
        correta: 1,
        explicacao: "Conceituado por intelectuais como Sueli Carneiro, o epistemicídio se refere à negação e destruição dos saberes e produções intelectuais de negros e indígenas."
    }
];

function gerarPerguntaIA() {
    const areaPergunta = document.getElementById('quiz-pergunta');
    const areaOpcoes = document.getElementById('quiz-opcoes');
    const areaFeedback = document.getElementById('quiz-feedback');

    areaFeedback.style.display = "none";
    areaOpcoes.innerHTML = "";

    const sorteada = perguntasQuiz[Math.floor(Math.random() * perguntasQuiz.length)];
    areaPergunta.innerText = sorteada.pergunta;

    sorteada.opcoes.forEach((opcao, index) => {
        const btn = document.createElement('button');
        btn.style.cssText = "background: rgba(255, 255, 255, 0.1); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.2); padding: 12px; border-radius: 8px; text-align: left; cursor: pointer; font-size: 0.95rem;";
        btn.innerText = opcao;

        btn.onclick = () => {
            if (index === sorteada.correta) {
                areaFeedback.style.cssText = "margin-top: 1rem; padding: 1rem; border-radius: 8px; background: rgba(74, 222, 128, 0.15); border: 1px solid #4ade80; color: #4ade80;";
                areaFeedback.innerHTML = `✨ <strong>Resposta Correta!</strong><br>${sorteada.explicacao}`;
            } else {
                areaFeedback.style.cssText = "margin-top: 1rem; padding: 1rem; border-radius: 8px; background: rgba(248, 113, 113, 0.15); border: 1px solid #f87171; color: #f87171;";
                areaFeedback.innerHTML = `❌ <strong>Resposta Incorreta.</strong><br>${sorteada.explicacao}`;
            }
            areaFeedback.style.display = "block";
        };

        areaOpcoes.appendChild(btn);
    });
}

// ==========================================
// 6. GLOSSÁRIO & INICIALIZAÇÃO
// ==========================================

const glossarioDados = [
    { termo: "Antirracismo", definicao: "Postura ativa, política e diária de desconstrução e combate ao racismo nas esferas interpessoal e institucional." },
    { termo: "Ancestralidade", definicao: "Princípio de conexão e respeito com os conhecimentos, memórias e trajetórias dos antepassados." },
    { termo: "Pertencimento", definicao: "Sentimento de acolhimento e validação da identidade no meio social e comunitário." }
];

function renderizarGlossario(itens) {
    const container = document.getElementById("listaGlossario");
    if (!container) return;

    container.innerHTML = itens.map(item => `
        <div style="background: #f8fafc; padding: 1rem; margin-bottom: 8px; border-radius: 8px; border-left: 4px solid #5c2c16;">
            <h4 style="margin: 0; color: #5c2c16;">${item.termo}</h4>
            <p style="margin: 4px 0 0 0; font-size: 0.9rem; color: #475569;">${item.definicao}</p>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    carregarHistoricoLogin();
    renderizarGlossario(glossarioDados);
    renderizarHistoricoNavegacao();

    const campoBusca = document.getElementById("campoBusca");
    if (campoBusca) {
        campoBusca.addEventListener("input", (e) => {
            const texto = e.target.value.toLowerCase();
            const filtrados = glossarioDados.filter(i => 
                i.termo.toLowerCase().includes(texto) || i.definicao.toLowerCase().includes(texto)
            );
            renderizarGlossario(filtrados);
        });
    }
});