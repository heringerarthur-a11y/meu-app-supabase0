import { SUPABASE_CONFIG } from './config.js';
const supabase = window.supabase.createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.KEY);

export async function enviarMensagem(texto, container) {
    // 1. Salvar mensagem do usuário no Supabase
    const { data: userMsg, error } = await supabase
        .from('mensagens')
        .insert([{ texto: texto, enviado_por_ai: false }]);

    renderizarMsg(texto, 'user', container);

    // 2. Simular Resposta da IA (Aqui você conectaria com a API da OpenAI/Gemini no futuro)
    setTimeout(async () => {
        const respostaIA = "Sou sua IA assistente! Recebi sua mensagem: " + texto;
        
        await supabase
            .from('mensagens')
            .insert([{ texto: respostaIA, enviado_por_ai: true }]);
            
        renderizarMsg(respostaIA, 'ai', container);
    }, 1000);
}

function renderizarMsg(texto, tipo, container) {
    const div = document.createElement('div');
    div.className = `msg ${tipo}`;
    div.innerText = texto;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight; // Auto-scroll
}
// assets/js/chat.js

// ... (mantenha a função enviarMensagem)

export async function carregarHistorico(container) {
    // Busca as mensagens da tabela, ordenadas pela data de criação
    const { data, error } = await supabase
        .from('mensagens')
        .select('*')
        .order('criado_em', { ascending: true });

    if (error) {
        console.error("Erro ao carregar histórico:", error);
        return;
    }

    // Limpa o container e renderiza cada mensagem
    container.innerHTML = ''; 
    data.forEach(msg => {
        const tipo = msg.enviado_por_ai ? 'ai' : 'user';
        renderizarMsg(msg.texto, tipo, container);
    });
}