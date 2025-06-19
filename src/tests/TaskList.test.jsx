import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../app/components/TaskList';

describe('TaskList', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('adiciona uma nova tarefa à lista', () => {
        render(<TaskList />);

        const tituloInput = screen.getByPlaceholderText('Título da tarefa');
        const descricaoInput = screen.getByPlaceholderText('Descrição da tarefa');
        const botaoAdicionar = screen.getByRole('button', { name: /adicionar/i });

        fireEvent.change(tituloInput, { target: { value: 'Nova Tarefa' } });
        fireEvent.change(descricaoInput, { target: { value: 'Nova descrição' } });
        fireEvent.click(botaoAdicionar);

        expect(screen.getByText('Nova Tarefa')).toBeInTheDocument();
        expect(screen.getByText('Nova descrição')).toBeInTheDocument();
    });

    it('marca tarefa como concluída ao clicar em "Alterar status da tarefa"', () => {
        render(<TaskList />);

        // encontra primeiro botão de status (ícone com aria-label)
        const botaoConcluir = screen.getAllByRole('button', {
        name: /alterar status da tarefa/i,
        })[0];
        fireEvent.click(botaoConcluir);

        const tarefa = screen.getByText('Verificar saldo de crédito');
        expect(tarefa).toHaveClass('line-through');
    });

    it('remove uma tarefa ao clicar em "Remover"', () => {
        render(<TaskList />);

        const botaoRemover = screen.getAllByRole('button', { name: /remover/i })[0];
        const tarefaParaRemover = screen.getByText('Verificar saldo de crédito');

        fireEvent.click(botaoRemover);

        expect(screen.queryByText('Verificar saldo de crédito')).not.toBeInTheDocument();
    });

    it('filtra apenas tarefas pendentes', () => {
    render(<TaskList />);

    // A tarefa "Enviar documentação complementar" já está concluída por padrão
    const botaoPendente = screen.getByRole('button', { name: /pendente/i });
    fireEvent.click(botaoPendente);

    expect(screen.getByText('Verificar saldo de crédito')).toBeInTheDocument();
    expect(screen.getByText('Simular parcelas')).toBeInTheDocument();

    // Essa tarefa está marcada como "concluída"
    expect(screen.queryByText('Enviar documentação complementar')).not.toBeInTheDocument();
});
});

