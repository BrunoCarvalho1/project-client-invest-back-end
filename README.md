# Backend - Gerenciador de Alocação de Ativos

Este documento descreve a camada de backend do sistema, responsável pela API, lógica de negócios, e comunicação com o banco de dados. A API é construída utilizando **Next.js API Routes** e o acesso aos dados é gerenciado pelo ORM **Prisma**.

---

## 🛠️ Tecnologias Principais

* **Framework API:** [Next.js (API Routes)](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Banco de Dados:** [MySQL](https://www.mysql.com/)
* **Validação:** [Zod](https://zod.dev/) (usado nos formulários, mas define a estrutura dos dados)

---

## Instalação

* git clone (https://github.com/BrunoCarvalho1/project-client-invest-back-end)
* cd project-client-invest-back-end
* npm install

## Configurações iniciais 

* Copie .env.example para um novo arquivo .env e configure sua string de conexão com o banco de dados:
* Edite o arquivo .env
* npx prisma migrate dev
* npm run dev
