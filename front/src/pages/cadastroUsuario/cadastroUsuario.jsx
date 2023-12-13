import React, { useState, useEffect } from 'react';
import './cadastroUsuario.css';
import Formulario from '../../componets/Formulario/Formulario';
import api from '../../services/api';
import Tabela from '../../componets/Tabela/Tabela';


const CadastroUsuario = () => {

    const [mensagem, setMensagem] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [itemSelecionado, setItemSelecionado] = useState(null);
    const [dadosDoFormulario, setDadosDoFormulario] = useState({});

    const listaForm = [
        { nome: 'nome', label: 'Nome', tipo: 'text' },
        { nome: 'email', label: 'Email', tipo: 'text' },
        { nome: 'datanasc', label: 'Data Nascimento', tipo: 'number' },
        { nome: 'senha', label: 'Senha', tipo: 'text' },
        { nome: 'confirmarSenha', label: 'Confirmar Senha', tipo: 'text' },
    ];

    const colunasUsuarios = ['id', 'nome', 'email', 'datanasc', 'senha'];

    const validarEmail = (email) => {
        const validaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return validaEmail.test(email);
    };


    const enviarFormulario = async (dadosDoFormulario) => {

            // Verifica se todos os campos foram preenchidos
            if (!dadosDoFormulario.nome || !dadosDoFormulario.email || !dadosDoFormulario.datanasc || !dadosDoFormulario.senha) {
                alert("Todos os campos são obrigatórios!");
                return;
            }
        
            // Verifica se a senha e a confirmação de senha são iguais
            if (dadosDoFormulario.senha !== dadosDoFormulario.senha2) {
                alert("As senhas devem ser iguais!");
                return;
            }
        
            if (dadosDoFormulario.senha.length < 8) {
                alert("Senha deve ter mais de 8 caracteres!")
                return;
            }
        
            if (!validarEmail(dadosDoFormulario.email)) {
                alert('E-mail inválido!');
                return;
            }
        
            try {
                await api.gravarUsuario(dadosDoFormulario);
                setMensagem('Usuário salvo com sucesso');
        
            } catch (error) {
                console.error('Erro ao salvar o usuário:', error.message);
                setMensagem('Erro ao salvar o usuário');
            }
        };
        

    


    const editarFormulario = async (dadosDoFormulario) => {
        try {
            await api.atualizarUsuario(dadosDoFormulario)

            setMensagem('Usuario editado com sucesso');
        } catch (error) {
            console.error('Erro ao editar o usuario:', error.message);
            setMensagem('Erro ao editar o usuario');
        }
    };

    useEffect(() => {
        const carregarUsuarios = async () => {
            try {
                const dados = await api.getUsuarios();
                setUsuarios(dados);
            } catch (error) {
                console.error('Erro ao carregar os usuarios:', error.message);
            }
        };
        carregarUsuarios();
       
    }, []);


    const excluirUsuario = async (id) => {
        try {
            await api.excluirUsuario(id);
            const novaLista = usuarios.filter((usuario) => usuario.id !== id);
            setUsuarios(novaLista);
        } catch (error) {
            console.error('Erro ao excluir o usuario:', error.message);
        }
    };

    const editarUsuario = async (id) => {
        try {
            const usuarioSelecionado = await api.buscarUsuarioPorId(id);
            setItemSelecionado(usuarioSelecionado);
            console.log('item:',itemSelecionado)
            setDadosDoFormulario(usuarioSelecionado.resultado[0]);

        } catch (error) {
            console.error('Erro ao editar o usuario:', error.message);
        }
    };


    return (
        <>
            <div className="classeCSS">
                <h1>Cadastro de Usuario</h1>
                <Formulario
                    campos={listaForm}
                    onSubmit={enviarFormulario}
                    itemSelecionado={itemSelecionado}
                    onUpdate={editarFormulario}
                   />
                    
                {mensagem && <p>{mensagem}</p>}



                <h2>Usuarios Cadastrados</h2>
                <Tabela
                    dados={usuarios}
                    onExcluirItem={excluirUsuario}
                    onEditarItem={editarUsuario}
                    colunas={colunasUsuarios}
                />
            </div>
        </>
    )
};

export default CadastroUsuario;
