# Labenu | Full-Stack Web Development Bootcamp
Desenvolvimento de aplicações completas, incluindo frontend Web com React e backend com Node.js.

![Screenshot_1](https://user-images.githubusercontent.com/45580434/79641791-06e1c100-8170-11ea-8ecf-b6c889805d55.png)
<br>

## FullStack - Projeto Final: Spotenu

<!-- <p align="center">
  <img  height='600' src=''>
</p> -->
<br>
<p align="center">
  <a href="https://github.com/rosanarezende/Labenu-Projeto-FullStack/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/rosanarezende/Labenu-Projeto-FullStack">
  </a>

  <a href="https://github.com/rosanarezende/Labenu-Projeto-FullStack/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/rosanarezende/Labenu-Projeto-FullStack">
  </a>

   <img alt="Repository size" src="https://img.shields.io/github/repo-size/rosanarezende/Labenu-Projeto-FullStack">
</p>


[Deploy](http://spotenu.surge.sh/)

[Documentação da API](https://documenter.getpostman.com/view/8138743/T17AiqSL?version=latest)

<br>

### Principais linguagens, tecnologias e ferramentas utilizadas

<br>

#### Frontend

- HTML
- CSS
- Javascript
- Node
- React (principal biblioteca para construção do site)
- Redux (para gerenciamento de estados)
- Redux-Thunk (para integração do redux com requisições assíncronas)
- React Router (para aplicar múltiplas rotas)
- Uso de bibliotecas de UI (Material UI)
- Styled-components
- Formulários com validação
- Autenticação e autorização
- Teste unitário, de lógica e de componentes
- Responsividade e adaptação de aplicação web para front.
<br><br>

#### Backend

- Node
- Typescript
- Arquitetura MVC**
- MySQL (para construção do banco de dados)
- Knex (para conexão com o banco de dados)
- Express (para integração do código através do protocolo HTTP)
- Dotenv (para acessar informações sensíveis por meio de variáveis de ambiente)
- UUID (para geraração de id)
- Bcryptjs (para criptografar senhas)
- Jsonwebtoken (para gerar tokens de autenticação)
- Jest (para testes automatizados)
<br><br>

#### Infraestrutura

- Serviços Cloud AWS 
    - EC2 (para o banco de dados)
    - Lambda e API Gateway (para o banckend)

- Surge.sh (para o front)

<br><br>

### Escopo do projeto

O *Spotenu* é um projeto que visa facilitar o acesso a músicas pelo mundo. Para isso, vamos dar suporte para dois tipos de usuários: as bandas (ou músicos) e os ouvintes (usuários que consomem as músicas). Além disso, nós vamos montar uma operação com funcionários próprios que precisam gerenciar os dados que circulam no nosso sistema. Eles serão os nossos administradores.

**Usuários músicos**

Vamos começar a explicar os usuários que são uma banda. Mesmo que haja músicos solos, nós vamos representar todos eles por uma banda, que deve possuir um nome, um nickname, uma descrição (onde se possa escrever qualquer texto de qualquer tamanho) e uma senha. Quando uma banda de cadastra, ela precisa esperar que um administrador aprove o seu cadastro para pode utilizar a nossa aplicação. 

As funcionalidades relacionadas a músicos são: criação, edição e deleção de álbuns; e criação, edição e deleção de músicas. Para criar um álbum, devemos informar o nome e relacioná-lo com um conjunto de gêneros. Um álbum pode ser de mais de um gênero musical. Na edição, é possível alterar o nome do álbum e os gêneros dele. Para criar uma música, os músicos devem informar o nome da música e o álbum a qual ela está relacionada. Só é possível alterar o nome da música. Por fim, sobre a deleção de músicas, não há muito o que explicar, mas a de álbuns tem um comportamento importante: ao se deletar um álbum todas as músicas devem ser deletadas também.  

Para se logar, o usuário músico pode fornecer o email ou o nickname (junto com a senha). Caso ele não tenha sido aprovado ainda, ele não deve ser capaz de se logar na aplicação.

**Usuários ouvintes**

Os ouvintes são divididos em duas categorias: pagantes e não pagantes. Os não pagantes só podem acessar a funcionalidade de busca da música, que deve fazer uma busca por termos dos nomes das músicas, com filtro de gênero opcional.

Já os pagantes tem acesso a isso e mais: playlists próprias. Ao criar uma playlist, basta fornecer um nome. Podem ser adicionadas músicas da playlist, ou retira-las. Todas as playlist são inicialmente privadas e só podem ser modificadas (ou adicionar e retirar músicas) pelo usuário criador. Ele pode tornar a playlist colaborativa, permitindo que qualquer um a veja; e, então, quem for seguidor da playlist também pode a modificar.

Um usuário ouvinte deve fornecer o nome, o email, nickname e senha no cadastro. Para logar, ele pode usar tanto o email como o nickname (junto com a senha).  

**Usuários administradores**

Os usuários administradores são responsáveis pelo gerenciamento do nosso projeto. Somente um usuário administrador pode cadastrar outro usuário administrador, passando as informações: nome, email, nickname e senha. 

Eles podem aprovar os músicos (como explicado acima). Além disso, eles também são capazes de adicionar gêneros musicais, passando somente um nome.

Por fim, há a possibilidade de bloquear qualquer usuário (que não seja um administrador). Quando um usuário for bloqueado ele não pode mais logar na aplicação. Para se logar, um administrador pode informar o email ou o nickname (junto com a senha)

<br>

#### Backend

- **1. Signup de usuário ouvinte**

    Um usuário ouvinte tem que fornecer o nome, o email, o nickname uma senha. Faça as validações básicas e garanta que a senha tenha, no mínimo, 6 caracteres. **Em todos os cadastros e logins**, vamos usar somente o *access token*

<br>

- **2. Cadastro de administrador**

    Os administradores também se cadastram com nome, email, nickname e senha. Aqui, a senha tem que possuir, no mínimo, 10 carácteres. Somente um usuário administrador pode adicionar outro (ou seja, esse endpoint deve ser autenticado e verificar se o token é de um administrador)

<br>

- **3. Signup de bandas**

    A banda precisa informar o seu nome, o nickname, o email, a sua descrição e uma senha, com, no mínimo 6 caracteres. Uma banda deve começar com o status de não aprovada (ou seja, não retorne um *access token* nesse endpoint)

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

#### Infraestrutura

A ideia é que você utilize os serviços da AWS e do Firebase que ensinamos nessas semanas. Você pode se aventurar entre outros serviços desses Cloud. Além disso, você pode usar os dois juntos se quiser, por exemplo: subir o backend em Firebase Functions mas usar o Bucket do S3 para armazenar as mídias.

<br>

- **Instruções para AWS**

    1. Suba o banco de dados MySQL em uma instância da EC2
    2. Crie lambdas e URLs no *API Gateway* para cada um dos endpoints solicitados e faça os testes necessários
    3. Configure o *bucket* do S3 para os fluxos relacionados a imagens (ou músicas) ou para deploy do *Frontend* do seu projeto

<br>

- **Instruções para Firebase**

    1. Configure o *Firebase Realtime Database* ou o *Firebase Firestore* para a sua aplicação
    2. Faça as configurações do serviço de *Storage* para armazenar os vídeos e as fotos
    3. Suba os endpoints em *Firebase Cloud Functions* e faça os testes necessários
    4. Utilize o *Firebase Hosting* ****para deploy do *Frontend* do seu projeto

<br><br>

#### Frontend

Abaixo estão as telas necessárias para a aplicação. É sua responsabilidade pensar nas informações que devem ser solicitadas em cada fluxo. Além disso, o formato e o layout é livre, e pode se basear em qualquer site. Você deve mostrar, em todas as telas, os erros que voltarem da API.

<br>

- **1. Tela de cadastro de usuário ouvinte**

    Um usuário ouvinte tem que fornecer o nome, o email, o nickname uma senha para se cadastrar

<br>

- **2. Tela de cadastro de usuários administradores**

    Os administradores também se cadastram com nome, email, nickname e senha. Aqui, a senha tem que possuir, no mínimo, 10 carácteres. Somente um usuário administrador pode adicionar outro (ou seja, algum usuário admin deve estar logado para fazer essa funcionalidade

<br>

- **3. Tela de cadastro de usuários bandas**

    A banda precisa informar o seu nome, o nickname, o email, a sua descrição e uma senha, com, no mínimo 6 caracteres. 

<br>

- **4. Tela de aprovação de bandas**

    Deve possuir uma lista com todas as bandas e um botão que permita aprovar cada uma delas

<br>

- **5. Tela de Login**

    Todos os usuários (ouvintes, administradores ou bandas) devem se logar pelo mesma tela. Eles podem fornecer o email ou o nickname e a senha correta. 

<br>

- **6. Tela de home**

    A tela de home pode ser acessada por todos os usuários. Ela deve possuir um menu que permita navegar pelas funcionalidades de cada um deles. 
    Por exemplo, para o usuário administrador, deve haver as possibilidades de: aprovar bandas, gerenciar gêneros musicais e adicionar administradores

<br>

- **7. Tela de ver e adicionar gêneos**

    Um administrador deve ser capaz de ver todos os gêneros musicais e adicionar quantos gêneros quiser passando as informações básica (no caso, só o nome).

<br>

- **8. Tela de criação de álbuns**

    Essa funcionalidade é para banda criarem álbuns próprios. Para isso, ela deve passar um nome e selecionar os gêneros apropriados. 

<br>

- **9. Tela de criação de músicas**

    Aqui é o onde as bandas criam músicas Para isso, devem fornecer o nome e o selecionar um álbum que já tenham criado.

<br><br>

#### Desafios

Você deve implementar os endpoints e as telas necessárias para se fazer as funcionalidades abaxio:

<br>

- **10. Procurar música**

    Essa funcionalidade pode ser acessada por usuários ouvintes (pagantes e não pagantes). Uma lista com o id e o nome deve ser retornada, paginada com 10 itens por vez.

<br>

- **11. Ver detalhe da música**

    Aqui, os usuários pagantes ou os não pagantes tem acesso a essa funcionalidade. Eles devem selecionar a música a partir de uma lista e serem redirecionados a uma tela com os detalhes dela

<br>

- **12. Tonar um usuário não pagante em um pagante**

    Um usuário administrador pode transformar um usuário não pagante em pagante, para ter acesso a outras funcionalidades. Caso o usuário já seja pagante, um erro deve ser mostrado.

<br>

- **13. Criação de playlist**

    Uma playlist pode ser criada por um usuário pagante. Ele só precisa fornecer um nome (e um id deve ser atrelado a ela). Inicalmente, ela é iniciada como privada, só podendo ser modificada pelo usuário que a criou.

<br>

- **14. Adicionar música a playlist**

    Um usuário pode adicionar em sua playlist uma música.

<br>

- **15. Retirar música de playlist**

    Um usuário pode retirar uma música de uma playlist dele.

<br>

- **16. Ver todas as playlists**

    Um usuário pode ver a lista de suas playlists. A lista deve ser paginada com 10 itens.

<br>

- **17. Tornar playlist colaborativa**

    Um usuário pode transformar a sua playlist em colaborativa. Permitindo que outros usuários a sigam e modifiquem.

<br>

- **18. Seguir playlist colaborativa**

    Um usuário pode seguir uma playlist de outro usuário. 

<br>

- **19. Modificar endpoints de playlist**

    Agora que possuimos a playlist colaborativa, você deve alterar as funcionalidades que são afetadas por isso

    - **Ver todas as playlists**

        Aqui, deve ser possível ver as playlists que o usuário criou e segue

    - **Adicionar música a playlist e retirar música de playlist**

        Agora, não só o usuário criador como também o usuário que segue uma playlist podem adicionar e retirar músicas das playlists

<br>

- **20. Editar perfil**

    Um usuário deve conseguir editar o seu perfil, alterando somente o nome.

<br>

- **21. Editar playlist**

    Usuários criadores e seguidores podem alterar o nome de uma playlist

<br>

- **22. Editar música**

    Os usuários banda podem alterar as suas músicas, mudando-a de álbum ou alterando o nome.

<br>

- **23. Deletar música**

    Os usuários banda podem deletar as suas músicas. Lembre-se de retirar todas as relações envolvidas: com álbuns, playlists e etc.

<br>

- **24. Deletar álbum**

    Os usuários banda podem deletar um álbum inteiro. Quando isso acontecer, todas as músicas e todas as relações envolvidas (inclusive as playlists) devem ser modificadoas.

<br>

- **25. Bloquear usuários ouvintes e músicos**

    Um administrador deve ser capaz de bloquear um usuário (ouvintes ou músicos). Isso impede-os de logar.

<br><br>

#### Comunicado sobre Testes

Nós gostaríamos de que você escrevesse testes automatizados durante a sua implementação. Não é obrigatório, mas consideramos importante!

Bom trabalho, sabemos que teremos ótimos resultados! 😄

