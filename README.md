#  Minha Lista de Tarefas Interativa

Aplicação frontend desenvolvida como prova técnica para o Consórcio Magalu.
O objetivo é gerenciar uma lista de tarefas de forma prática, interativa e acessível,
com foco na experiência do usuário, responsividade e boas práticas modernas de desenvolvimento frontend.

 Acesse a aplicação online: (https://minha-lista-interativa.vercel.app)

---

##  Tecnologias Utilizadas

- [Next.js 15 (App Router)](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jest.js](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [next/font/local](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Google Analytics v4](https://analytics.google.com/)
- REST mock local com `/api/tasks` via rotas do App Router
- Deploy via [Vercel](https://vercel.com/)

---

##  Funcionalidades

- ✅ Exibição da lista de tarefas com nome, descrição, status e data.
- ✅ Tarefas recém-criadas começam como pendentes, aguardando conclusão.
- ✅ Adição de novas tarefas por input de texto.
- ✅ Marcar tarefas como concluídas.
- ✅ Remover tarefas da lista.
- ✅ Filtro por: todas, pendentes e concluídas.
- ✅ Diferenciação visual para tarefas concluídas.
- ✅ Persistência automática com `localStorage`.
- ✅ Suporte completo a mobile, tablet e desktop.
- ✅ PWA.

---

##  Testes Automatizados

- Testes implementados com **Jest.js** e **React Testing Library**
- Cobertura das principais funcionalidades:
  - Adição de tarefa
  - Marcação como concluída
  - Filtro de tarefas
  - Exclusão de tarefas

"npm run test"

---

##  Simulação de API (Mock)

A aplicação utiliza uma API REST mockada localmente via rota /api/tasks, podendo ser substituída facilmente por endpoints reais.

export const createTask = async (task) => { {<br/>
  const res = await fetch(BASE_URL, { <br/>
  method: 'POST', <br/>
  headers: { 'Content-Type': 'application/json' },<br/>
  body: JSON.stringify(task),<br/>
});

---

##  Google Analytics

Integrado com GA4 para rastrear interações do usuário como:

- Adição de tarefas
- Conclusão de tarefas
- Uso de filtros

---

##  Design e UX

- Interface mobile-first com Tailwind CSS
- Layout simples e funcional, com feedback visual
- Tipografia com fontes locais MagaluTextos
- Componente centralizado (TaskList) controla todo o estado
- UX intuitiva e sem distrações

---

#  Como Rodar o Projeto

 Clone o repositório
git clone https://github.com/seu-usuario/minha-lista-interativa.git

 Acesse a pasta<br/>
"cd minha-lista-interativa"


 Instale as dependências<br/>
"npm install"


 Rode o ambiente de desenvolvimento<br/>
"npm run dev"


 Acesse: http://localhost:3000
 

Desenvolvido com muito capricho por João;
