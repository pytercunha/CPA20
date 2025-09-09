# CPA-20 Simulados com IA

Este é um projeto de um assistente de estudos para a certificação CPA-20, construído com React, TypeScript e a API do Gemini para geração de conteúdo dinâmico.

## Funcionalidades

- Geração de simulados para provas completas (1 a 5).
- Geração de simulados focados por módulos (1 a 7).
- Dificuldade progressiva nas provas.
- Quiz interativo com uma questão por vez.
- Feedback imediato e visual para respostas corretas/incorretas.
- Resumo de desempenho ao final do quiz.
- Links para outros recursos de estudo.

## Como Rodar Localmente

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <NOME_DA_PASTA>
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure a Chave da API:**
    - Crie um arquivo chamado `.env.local` na raiz do projeto.
    - Adicione a sua chave da API do Gemini a este arquivo:
      ```
      API_KEY="SUA_CHAVE_DA_API_AQUI"
      ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    Abra [http://localhost:5173](http://localhost:5173) (ou o endereço que aparecer no seu terminal) para ver a aplicação.

## Como Publicar na Web (Deploy) com a Vercel

Você pode publicar este site gratuitamente e acessá-lo de qualquer lugar.

1.  **Envie seu código para o GitHub:**
    - Crie um repositório no [GitHub](https://github.com/).
    - Envie todos os arquivos do projeto para este repositório.

2.  **Use a Vercel para publicar:**
    - Crie uma conta gratuita na [Vercel](https://vercel.com), de preferência usando sua conta do GitHub.
    - No painel da Vercel, clique em **"Add New... -> Project"**.
    - Importe o seu repositório do GitHub.
    - A Vercel detectará automaticamente que é um projeto Vite.

3.  **Adicione a Chave da API na Vercel:**
    - Antes de publicar, vá para a aba **Settings -> Environment Variables**.
    - Adicione uma nova variável:
      - **Name:** `API_KEY`
      - **Value:** `SUA_CHAVE_DA_API_AQUI`
    - Clique em "Save".

4.  **Publique:**
    - Volte para a aba de "Deployments" e clique em **"Deploy"** (ou reinicie a publicação se já tiver começado).
    - Após alguns minutos, a Vercel fornecerá um link público para o seu site. Pronto!
