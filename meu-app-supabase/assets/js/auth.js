import { SUPABASE_CONFIG } from './config.js';

// Inicializa o cliente Supabase
const supabase = window.supabase.createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.KEY);

export async function cadastrarUsuario(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
}

export async function logarUsuario(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
}

export async function deslogar() {
    await supabase.auth.signOut();
    window.location.href = 'index.html';
}