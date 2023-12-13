const API_URL = 'http://localhost:3000/api';

const api = {

    async gravarUsuario(dadosDoFormulario) {
        const resposta = await fetch(`${API_URL}/usuarios/salvar-usuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosDoFormulario),
        });
        if (!resposta.ok) {
            throw new Error('Erro ao gravar o usuario');
        }
    },

    async getUsuarios() {
        const resposta = await fetch(`${API_URL}/usuarios/listar-usuarios`);
        if (!resposta.ok) {
            throw new Error('Erro ao carregar os usuarios');
        }
        return resposta.json();
    },

    async buscarUsuarioPorId(id) {
        const resposta = await fetch(`${API_URL}/usuarios/listar-usuarios/${id}`);
        if (!resposta.ok) {
            throw new Error('Erro ao carregar os usuarios');
        }
        return resposta.json();
    },

    async excluirUsuario(id) {
        const resposta = await fetch(`${API_URL}/usuarios/excluir-usuario/${id}`, {
            method: 'DELETE',
        });
        if (!resposta.ok) {
            throw new Error('Erro ao excluir o usuario');
        }
    },

    async atualizarUsuario(dadosDoFormulario) {
        const resposta = await fetch(`${API_URL}/usuarios/atualizarusuario`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosDoFormulario),
        });
        if (!resposta.ok) {
            throw new Error('Erro ao gravar o usuario');
        }
    }
        // Adicione aqui outras chamadas de API conforme necessário
    
}

export default api
