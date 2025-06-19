import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../app/components/TaskForm';
import React from 'react';

describe('TaskForm', () => {
    it('chama onAdd com título e descrição preenchidos', () => {
        const mockOnAdd = jest.fn();

        render(<TaskForm onAdd={mockOnAdd} />);

        const nomeInput = screen.getByPlaceholderText('Título da tarefa');
        const descricaoInput = screen.getByPlaceholderText('Descrição da tarefa');
        const botaoAdicionar = screen.getByRole('button', { name: /adicionar/i });

        fireEvent.change(nomeInput, { target: { value: 'Nova Tarefa' } });
        fireEvent.change(descricaoInput, { target: { value: 'Descrição exemplo' } });
        fireEvent.click(botaoAdicionar);

        expect(mockOnAdd).toHaveBeenCalledWith('Nova Tarefa', 'Descrição exemplo');
    });

    it('exibe alerta se campos estiverem vazios', () => {
        const mockOnAdd = jest.fn();
        window.alert = jest.fn(); // mock do alert

        render(<TaskForm onAdd={mockOnAdd} />);
        const botaoAdicionar = screen.getByRole('button', { name: /adicionar/i });

        fireEvent.click(botaoAdicionar);

        expect(window.alert).toHaveBeenCalledWith('Adicione o nome e descrição da tarefa');
        expect(mockOnAdd).not.toHaveBeenCalled();
    });
});

