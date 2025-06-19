import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskFilter from '../app/components/TaskFilter';

describe('TaskFilter', () => {
    const setup = (activeFilter = 'todas') => {
        const setFilter = jest.fn();
        render(<TaskFilter filter={activeFilter} setFilter={setFilter} />);
        return { setFilter };
    };

    it('renderiza os botões de filtro corretamente', () => {
        setup();

        expect(screen.getByRole('button', { name: /todas/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /pendente/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /concluída/i })).toBeInTheDocument();
    });

    it('chama setFilter ao clicar em "Pendente"', () => {
        const { setFilter } = setup();

        const botao = screen.getByRole('button', { name: /pendente/i });
        fireEvent.click(botao);

        expect(setFilter).toHaveBeenCalledTimes(1);
        expect(setFilter).toHaveBeenCalledWith('pendente');
    });

    it('chama setFilter ao clicar em "Concluída"', () => {
        const { setFilter } = setup();

        const botao = screen.getByRole('button', { name: /concluída/i });
        fireEvent.click(botao);

        expect(setFilter).toHaveBeenCalledTimes(1);
        expect(setFilter).toHaveBeenCalledWith('concluída');
    });

    it('aplica estilo de ativo corretamente no botão "Pendente"', () => {
        setup('pendente');

        const botaoPendente = screen.getByRole('button', { name: /pendente/i });
        expect(botaoPendente).toHaveClass('bg-yellow-500');
        expect(botaoPendente).toHaveClass('text-white');
    });

    it('aplica estilo de ativo corretamente no botão "Concluída"', () => {
        setup('concluída');

        const botaoConcluida = screen.getByRole('button', { name: /concluída/i });
        expect(botaoConcluida).toHaveClass('bg-green-500');
        expect(botaoConcluida).toHaveClass('text-white');
    });

    it('aplica estilo de ativo corretamente no botão "Todas"', () => {
        setup('todas');

        const botaoTodas = screen.getByRole('button', { name: /todas/i });
        expect(botaoTodas).toHaveClass('bg-[#0485FF]');
        expect(botaoTodas).toHaveClass('text-white');
});
});
