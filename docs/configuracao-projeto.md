# Configuração do React + Vite (Vitest, ESLint, Prettier, Tailwind, React Compiler e Husky)

## O que são cada item e para que serve?

Confira a definição e função básica de cada item presente neste artigo, que compõe a arquitetura de um projeto Frontend com React.

### Vitest

- Um framework de **testes unitários** e de **integração** focado em projetos que utilizam Vite. Ele foi criado para ser rápido, simples e totalmente integrado ao ecossistema moderno de Frontend.

### ESLint

- Uma ferramenta de **análise estática de código** (linter) para JavaScript e TypeScript. Analisa automaticamente o código-fonte em busca de erros, padrões problemáticos e inconsistências de estilo antes mesmo da aplicação rodar.

### Prettier

- Um formatador de código automático e opinativo para diversas linguagens, como JavaScript, TypeScript, HTML, CSS, JSON, entre outras.

### Tailwind CSS

- Um framework CSS **utility-first** que permite estilizar componentes diretamente no HTML/JSX através de classes utilitárias. Extremamente rápido para prototipagem e altamente customizável.

### React Compiler

- Um compilador experimental do React que otimiza automaticamente a performance da aplicação, aplicando memoização (`useMemo`, `useCallback`, `React.memo`) de forma transparente, sem intervenção manual do desenvolvedor.

### Husky

- Uma ferramenta que permite configurar **Git Hooks** de forma simples dentro do seu projeto.

### lint-staged

- Complemento do Husky que executa comandos (lint, formatação) **apenas nos arquivos que estão no stage do Git**, tornando os hooks muito mais rápidos.

---

## Inicializando um novo projeto React com Vite

Primeiramente vamos criar e configurar um novo projeto com Vite + React + TypeScript.

### 1) Criando o projeto

O Vite oferece um scaffold oficial que já inclui React 19, TypeScript, ESLint (flat config) e Vitest prontos para uso.

```bash
npm create vite@latest react-educador-financeiro -- --template react-ts
```

Depois entre na pasta e instale as dependências:

```bash
cd react-educador-financeiro
npm install
```

### 2) O que vem pronto no scaffold

O template `react-ts` do Vite já entrega configurado:

- **React 19** com TypeScript
- **ESLint** com flat config (`eslint.config.js`) incluindo regras para React Hooks e React Refresh
- **Vitest** com `jsdom` para testes de componente
- **React Compiler** via `@rolldown/plugin-babel` + `babel-plugin-react-compiler`

O `vite.config.ts` inicial já contém:

```ts
import { defineConfig } from 'vitest/config'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  test: {
    environment: 'jsdom',
  },
})
```

**Projeto criado!**

---

## Configurando Tailwind CSS v4

O Tailwind v4 funciona como um plugin nativo do Vite — sem necessidade de PostCSS ou arquivos `tailwind.config.js`.

### 1) Instalar o Tailwind

```bash
npm install tailwindcss @tailwindcss/vite
```

### 2) Adicionar o plugin no Vite

No arquivo `vite.config.ts`, adicione o plugin do Tailwind:

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ← adicionar
    babel({ presets: [reactCompilerPreset()] }),
  ],
  // ...
})
```

### 3) Importar o Tailwind no CSS global

No `src/index.css`, substitua o conteúdo por:

```css
@import 'tailwindcss';
```

### 4) Testar

Adicione uma classe utilitária em qualquer componente, como `className="text-3xl font-bold"`, e rode `npm run dev`. Se o estilo for aplicado, o Tailwind está funcionando.

**Tailwind CSS pronto!**

---

## Configurando Vitest

O Vitest já vem instalado e com ambiente `jsdom` configurado. Vamos adicionar os pacotes auxiliares para testes de componente React.

### 1) Instalar dependências de teste

```bash
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### 2) Criar arquivo de setup

Crie `src/setupTests.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

> **Importante:** Use o path `/vitest` para compatibilidade com Vitest sem `globals: true`.

### 3) Configurar o setup no Vite

No `vite.config.ts`, adicione `setupFiles` na seção `test`:

```ts
test: {
  environment: 'jsdom',
  setupFiles: ['./src/setupTests.ts'],
},
```

### 4) Criar o primeiro teste

Crie `src/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the heading', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: 'Get started' }),
    ).toBeInTheDocument()
  })

  it('renders the counter and increments on click', async () => {
    render(<App />)
    const buttons = screen.getAllByRole('button', { name: /Count is/ })
    expect(buttons[0]).toBeInTheDocument()

    await userEvent.click(buttons[0])
    expect(buttons[0]).toHaveTextContent('Count is 1')
  })
})
```

### 5) Scripts de teste

No `package.json`, os scripts de teste já vêm configurados:

```json
"test": "vitest",
"test:run": "vitest run"
```

Rode com:

```bash
npm run test:run
```

**Vitest pronto!**

---

## Configurando o ESLint e o Prettier

O ESLint flat config já vem do scaffold, e o Prettier será integrado como complemento.

### 1) Instalar o Prettier e a integração

```bash
npm install -D prettier eslint-config-prettier
```

- `prettier`: formatador de código
- `eslint-config-prettier`: desativa regras do ESLint que conflitam com o Prettier

### 2) Criar o arquivo de configuração do Prettier

Crie `.prettierrc` na raiz do projeto:

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all"
}
```

### 3) Criar o `.prettierignore`

Crie `.prettierignore` na raiz do projeto:

```
node_modules
dist
coverage
.vite
```

### 4) Integrar com o ESLint

No `eslint.config.js`, adicione `prettierConfig` (já vem importado do scaffold) ao array `extends`:

```js
import prettierConfig from 'eslint-config-prettier'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettierConfig, // ← garante que ESLint não conflite com Prettier
    ],
    // ...
  },
])
```

### 5) Scripts no `package.json`

Adicione os scripts de formatação:

```json
"format": "prettier --write .",
"format:check": "prettier --check ."
```

Use:

```bash
npm run format        # formata todo o projeto
npm run format:check  # verifica formatação (útil em CI)
npm run lint          # análise estática
```

**ESLint e Prettier prontos!**

---

## Instalando e configurando o Husky

O Husky executa lint, formatação e testes automaticamente nos hooks do Git, impedindo que código quebrado ou mal formatado chegue ao repositório.

### 1) Instalar Husky e lint-staged

```bash
npm install -D husky lint-staged
```

### 2) Inicializar o Husky

```bash
npx husky init
```

Isso cria a pasta `.husky/` e configura o hook path no Git. O script `prepare` no `package.json` é adicionado automaticamente para que o Husky seja reinstalado em novos clones.

### 3) Configurar o hook pre-commit

Edite `.husky/pre-commit`:

```
npx lint-staged
```

### 4) Configurar o lint-staged

No `package.json`, adicione:

```json
"lint-staged": {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{css,md,json}": ["prettier --write"]
}
```

Isso garante que apenas os arquivos em stage sejam analisados e formatados — muito mais rápido que rodar no projeto inteiro.

### 5) Configurar o hook pre-push

Crie `.husky/pre-push`:

```
npm run test:run
```

Este hook executa os testes unitários antes de cada `git push`, garantindo que código com testes falhos não entre no repositório remoto.

### 6) Testar os hooks

```bash
git add .
git commit -m "test: verificação dos hooks"
git push
```

O `pre-commit` formatará e lintará apenas os arquivos staged. O `pre-push` rodará os testes unitários.

**Husky pronto!**

---

## Resumo: configuração final

| Ferramenta            | Função                    | Quando roda                      |
| --------------------- | ------------------------- | -------------------------------- |
| Vite                  | Bundler e dev server      | `npm run dev` / `npm run build`  |
| React 19 + TypeScript | Biblioteca e tipagem      | Desenvolvimento                  |
| Tailwind CSS v4       | Estilização utility-first | Build e dev                      |
| React Compiler        | Otimização automática     | Build (via Babel)                |
| Vitest                | Testes unitários          | `npm run test:run` ou `pre-push` |
| ESLint + Prettier     | Linting e formatação      | `pre-commit` (via lint-staged)   |
| Husky + lint-staged   | Git hooks                 | `commit` e `push`                |

---

Desde já agradeço a todos e espero que tenham gostado!

Att.
Gustavo Machado Pontes

[linktr](https://linktr.ee/DevGustavus) [linkedin](https://www.linkedin.com/in/gustavo-machado-pontes/) [github](https://github.com/DevGustavus) [instagram](https://www.instagram.com/devgustavus/) [twitter](https://twitter.com/Gustavo72166607)
