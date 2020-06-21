# Labenu | Full-Stack Web Development Bootcamp
Desenvolvimento de aplicações completas, incluindo frontend Web com React e backend com Node.js.

![Screenshot_1](https://user-images.githubusercontent.com/45580434/79641791-06e1c100-8170-11ea-8ecf-b6c889805d55.png)

<br><br>

## Backend - Projeto Final: Spotenu

<br>

### Principais tecnologias/ferramentas utilizadas

1. **Node**
2. **Typescript**
3. **Arquitetura MVC**
4. **MySQL** (para construção do banco de dados)
5. **Knex** (para conexão com o banco de dados)
6. **Express** (para intração do código através do protocolo HTTP)
7. **Dotenv** (para acessar informações sensíveis por meio de variáveis de ambiente)
8. **UUID** (para geraração de id)
9. **Bcryptjs** (para criptografar senhas)
10. **Jsonwebtoken** (para gerar tokens de autenticação)
11. **Jest** (para testes automatizados)

<br><br>

### Escopo

O Spotenu é um projeto que visa facilitar o acesso a músicas pelo mundo. Para isso, vamos dar suporte para dois tipos de usuários: as bandas (ou músicos) e os ouvintes (usuários que consomem as músicas). Além disso, nós vamos montar uma operação com funcionários próprios que precisam gerenciar os dados que circulam no nosso sistema. Eles serão os nossos administradores.

<br>

**Usuários músicos**

Vamos começar a explicar os usuários que são uma banda. Mesmo que haja músicos solos, nós vamos representar todos eles por uma banda, que deve possuir um nome, um nickname, uma descrição (onde se possa escrever qualquer texto de qualquer tamanho) e uma senha. Quando uma banda de cadastra, ela precisa esperar que um administrador aprove o seu cadastro para pode utilizar a nossa aplicação. 

As funcionalidades relacionadas a músicos são: criação, edição e deleção de álbuns; e criação, edição e deleção de músicas. Para criar um álbum, devemos informar o nome e relacioná-lo com um conjunto de gêneros. Um álbum pode ser de mais de um gênero musical. Na edição, é possível alterar o nome do álbum e os gêneros dele. Para criar uma música, os músicos devem informar o nome da música e o álbum a qual ela está relacionada. Só é possível alterar o nome da música. Por fim, sobre a deleção de músicas, não há muito o que explicar, mas a de álbuns tem um comportamento importante: ao se deletar um álbum todas as músicas devem ser deletadas também.  

Para se logar, o usuário músico pode fornecer o email ou o nickname (junto com a senha). Caso ele não tenha sido aprovado ainda, ele não deve ser capaz de se logar na aplicação.

<br>

**Usuários ouvintes**

Os ouvintes são divididos em duas categorias: pagantes e não pagantes. Os não pagantes só podem acessar a funcionalidade de busca da música, que deve fazer uma busca por termos dos nomes das músicas, com filtro de gênero opcional.

Já os pagantes tem acesso a isso e mais: playlists próprias. Ao criar uma playlist, basta fornecer um nome. Podem ser adicionadas músicas da playlist, ou retira-las. Todas as playlist são inicialmente privadas e só podem ser modificadas (ou adicionar e retirar músicas) pelo usuário criador. Ele pode tornar a playlist colaborativa, permitindo que qualquer um a veja; e, então, quem for seguidor da playlist também pode a modificar.

Um usuário ouvinte deve fornecer o nome, o email, nickname e senha no cadastro. Para logar, ele pode usar tanto o email como o nickname (junto com a senha).  

<br>

**Usuários administradores**

Os usuários administradores são responsáveis pelo gerenciamento do nosso projeto. Somente um usuário administrador pode cadastrar outro usuário administrador, passando as informações: nome, email, nickname e senha. 

Eles podem aprovar os músicos (como explicado acima). Além disso, eles também são capazes de adicionar gêneros musicais, passando somente um nome.

Por fim, há a possibilidade de bloquear qualquer usuário (que não seja um administrador). Quando um usuário for bloqueado ele não pode mais logar na aplicação. Para se logar, um administrador pode informar o email ou o nickname (junto com a senha)

<br>

#### Endpoints Mínimos

Você tem que definir os detalhes técnicos dos endpoints: o verbo; os inputs; se serão passados pelo body, path ou outros; os outputs e tudo mais. Serão resumidas algumas informações e dicas nos endpoints abaixo:

- **1. Signup de usuário ouvinte**

    Um usuário ouvinte tem que fornecer o nome, o email, o nickname uma senha. Faça as validações básicas e garanta que a senha tenha, no mínimo, 6 caracteres. **Em todos os cadastros e logins**, vamos usar somente o *access token*

<br>

- **2. Cadastro de administrador**

    Os administradores também se cadastram com nome, email, nickname e senha. Aqui, a senha tem que possuir, no mínimo, 10 carácteres. Somente um usuário administrador pode adicionar outro (ou seja, esse endpoint deve ser autenticado e verificar se o token é de um administrador)

<br>

- **3. Signup de bandas**

    A banda precisa informar o seu nome, a sua descrição e uma senha, com, no mínimo 6 caracteres. Uma banda deve começar com o status de não aprovada (ou seja, não retorne um *access token* nesse endpoint)

<br>     

- **4. Ver todas as bandas**

    Esse endpoint deve retornar uma lista com todas as bandas registradas no banco, com as informações: nome, email,  nickname e um booleano indicando se está aprovado ou não. Somente administradores podem ter acesso a essa funcionalidade

<br>

- **5. Aprovação de bandas**

    Um administrador pode aprovar uma banda, para que ela, então, consiga se logar. Caso um administrador tente aprovar uma banda que já tinha sido aprovada, um erro deve ser retornado (e, obviamente, se a banda não existir também).

<br>

- **6. Login**

    Todos os usuários (ouvintes, administradores ou bandas) devem se logar pelo mesmo endpoint. Eles podem fornecer o email ou o nickname e a senha correta. 

<br>

- **7. Adicionar Gênero**

    Somente um administrador pode adicionar gêneros na nossa aplicação. Para isso, deve fornecer um nome. Caso já exista um gênero com esse nome, um erro deve ser retornado

<br>

- **8. Ver gêneros músicias**

    Tanto um administrador como um usuário banda podem ver todos os gêneros músicas. Retorne uma lista com id e nome

<br>

- **9. Criação de álbuns**

    Uma banda pode criar um álbum para colocar as suas músicas. Deve fornecer o nome e uma lista de gêneros. Quando o álbum for criado, ele deve ser diretamente atrelado à banda que estiver autenticada na aplicação. Só bandas podem criar álbuns.

<br>

- **10. Criação de músicas**

    Para criar uma música, um nome e um álbum devem ser informados. Caso o álbum não exista, um erro deve ser informado. Se já existir uma música com esse nome no álbum, outro erro deve ser retornado. 

<br><br>

#### Desafios

- **10. Procurar música**
- **11. Ver detalhe da música**
- **12. Tonar um usuário não pagante em um pagante**
- **13. Criação de playlist**
- **14. Adicionar música a playlist**
- **15. Retirar música de playlist**
- **16. Ver todas as playlists**
- **17. Tornar playlist colaborativa**
- **18. Seguir playlist colaborativa**
- **19. Modificar endpoints de playlist**
- **20. Editar perfil**
- **21. Editar playlist**
- **22. Editar música**
- **23. Deletar música**
- **24. Deletar álbum**
- **25. Bloquear usuários ouvintes e músicos**

<br><br>

#### Testes

Nós gostaríamos de que você escrevesse testes automatizados durante a sua implementação. Não é obrigatório, mas consideramos importante!

Bom trabalho, sabemos que teremos ótimos resultados! 😄
