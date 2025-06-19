import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '../app/components/TaskItem';

describe('TaskItem', () => {
    const mockTask = {
        id: 1,
        name: 'Testar componente',
        description: 'Verificar se renderiza corretamente',
        status: 'pendente',
        createdate: '19/06/2025',
    };

    const setup = (overrides = {}) => {
        const onToggle = jest.fn();
        const onRemove = jest.fn();

        const task = { ...mockTask, ...overrides };

        render(<TaskItem task={task} onToggle={onToggle} onRemove={onRemove} />);
        return { onToggle, onRemove };
    };

    it('renderiza corretamente os dados da tarefa', () => {
        setup();

        expect(screen.getByText('Testar componente')).toBeInTheDocument();
        expect(screen.getByText('Verificar se renderiza corretamente')).toBeInTheDocument();
        expect(screen.getByText('19/06/2025')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /remover/i })).toBeInTheDocument();
    });

    it('chama onToggle ao clicar no botão de status', () => {
        const { onToggle } = setup();

        const botaoStatus = screen.getByRole('button', {
        name: /alterar status da tarefa/i,
        });
        fireEvent.click(botaoStatus);

        expect(onToggle).toHaveBeenCalledTimes(1);
        expect(onToggle).toHaveBeenCalledWith(1);
    });

    it('chama onRemove ao clicar no botão "Remover"', () => {
        const { onRemove } = setup();

        const botaoRemover = screen.getByRole('button', { name: /remover/i });
        fireEvent.click(botaoRemover);

        expect(onRemove).toHaveBeenCalledTimes(1);
        expect(onRemove).toHaveBeenCalledWith(1);
    });

    it('exibe tarefa com estilo riscado se estiver concluída', () => {
        setup({ status: 'concluída' });

        const titulo = screen.getByText('Testar componente');
        expect(titulo).toHaveClass('line-through');
        expect(titulo).toHaveClass('text-green-600');
});
});
