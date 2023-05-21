# Backlog do Produto

## Histórico de revisão

|Data|Versão|Descrição|Autor(es)|
|----|------|---------|---------|
|10/05/2023|0.1|Construção do Backlog|Gabriel, Felipe, Júlia, Manoel e Vinícius|
|11/05/2023|0.2|Alterações na pontuação do Backlog|Júlia|
|11/05/2023|0.3|Alterações na descrição da pontuação do Backlog|Júlia|
|21/05/2023|0.4|Alteração na organização das tabelas|Júlia|

## Personas

- Usuário: pessoa com função de gerenciar os operários e os cursos feitos por eles.

## Requisitos não funcionais

|Nº|Classificação|Requisito|
|--|-------------|---------|
|RNF01|Interface|A aplicação deve conter estilização das páginas com cores, fontes e ícones de acordo com o padrão da empresa.|
|RNF02|Interface|A aplicação deve manter uma padronização na estilização das listagens, abresentando o mesmo modelo e botões de seleção.|
|RNF03|Suportabilidade|A aplicação deve ser compatível com as versões mais recentes dos navegadores modernos como Chrome, Safari, Edge, Firefox e Opera.|
|RFN04|Suportabilidade|O sistema deve ser modular e seguir as melhores práticas de programação, facilitando a manutenção futura e permitindo que novas funcionalidades sejam adicionadas sem causar impacto negativo em outras partes do sistema.|
|RNF05|Confiabilidade|A aplicação deve garantir a privacidade dos dados dos usuários, estando de acordo com a Lei Geral de Proteção de Dados (13.709/2018).|
|RNF06|Confiabilidade|A aplicação deve proporcionar um ambiente suficientemente seguro para garantir que apenas aqueles registrados no sistema tenham acesso a ele.|
|RNF07|Desempenho|A aplicação deve garantir que a conexão com o banco de dados apresente o tempo de resposta igual ou inferior a 1000 ms.|
|RNF08|Requisitos de implementação|A aplicação deve seguir regras para garantir que os dados inseridos no banco de dados estejam corretos e válidos. Isso pode envolver restrições de tipo de dados, validação de formato, faixas de valores aceitáveis e verificação de integridade referencial. |

## Requisitos funcionais

<table>
    <thead>
        <tr>
            <th>Tema</th>
            <th>Épico</th>
            <th>User Story</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="5">TH01 - Gerenciamento de usuário</td>
            <td rowspan="3">EP01 - Autenticação de usuário na plataforma</td>
            <td>US01 - Eu, como usuário, gostaria de realizar o login para acessar as funcionalidades da aplicação.</td>
        </tr>
        <tr>
            <td>US02 - Eu, como usuário, gostaria de recuperar e alterar minha senha, para caso eu perca o meu acesso.</td>
        </tr>
        <tr>
            <td>US03 - Eu, como usuário, gostaria de realizar o logout no aplicativo para que eu possa encerrar meu acesso.</td>
        </tr>
        <tr>
            <td rowspan="2">EP02 - Receber/enviar avisos</td>
            <td>US04 - Eu, como usuário, gostaria de enviar avisos sobre escalas e sobre a necessidade de realização de determinado curso no e-mail do funcionário, para obter maior transparência de comunicação.</td>
        </tr>
        <tr>
            <td>Eu, como usuário, gostaria de ser notificado quando um curso de determinado funcionário está prestes a expirar para poder avisar o operário da necessidade de realizar um novo curso</td>
        </tr>
        <tr>
            <td rowspan="15">TH02 - Gerenciamento de operários</td>
            <td rowspan="5">EP03 - Cadastro de operários/de dados de operário</td>
            <td>US06 - Eu, como usuário, gostaria de cadastrar um novo operário para ter todos os operários da empresa cadastrados no sistema.</td>
        </tr>
        <tr>
            <td>US07 - Eu, como usuário, gostaria de excluir um operário do sistema para caso ele saia da empresa.</td>
        </tr>
        <tr>
            <td>US08 - Eu, como usuário, gostaria de atualizar o cadastro de um operário caso tenha uma informação nova ou com necessidade de alteração.</td>
        </tr>
        <tr>
            <td>US09 - Eu, como usuário, gostaria de definir os funcionários de acordo com suas habilidades e competências, para ter certeza da qualificação dos operários que estão indo para determinada obra.</td>
        </tr>
        <tr>
            <td>US10 - Eu, como usuário, gostaria de gerenciar o banco de horas de cada operário, para saber se no final do mês determinado operário ficou devendo horas ou possui horas extras.</td>
        </tr>
        <tr>
            <td rowspan="4">EP04 - Visualização de dados de operários</td>
            <td> US11 - Eu, como usuário, gostaria de visualizar uma lista com todos os operários da empresa para conseguir realizar uma melhor gestão de equipe.</td>
        </tr>
        <tr>
            <td>US12 - Eu, como usuário, gostaria de selecionar um operário específico da lista para visualizar suas informações detalhadas para tomar as melhores decisões para a equipe</td>
        </tr>
        <tr>
            <td>US13 - Eu, como usuário, gostaria de visualizar todos os cursos e preparações realizados pelo operário para saber se ele atende os requisitos para determinada função.</td>
        </tr>
        <tr>
            <td>US14 - Eu, como usuário, gostaria de pesquisar um operário por nome ou CPF para encontrar informações específicas sobre ele.</td>
        </tr>
        <tr>
            <td rowspan="4">EP05 - Cadastro de cursos do operário</td>
            <td>US15 - Eu, como usuário, gostaria de adicionar um curso novo ao operário para manter os seus registros de cursos atualizados.</td>
        </tr>
        <tr>
            <td>US16 - Eu, como usuário, gostaria de excluir um curso do operário para manter os registros corretos.</td>
        </tr>
        <tr>
            <td>US17 - Eu, como usuário, gostaria de editar informações sobre um curso para manter os dados atualizados e corretos.</td>
        </tr>
        <tr>
            <td>US18 - Eu, como usuário, gostaria de anexar um certificado do curso realizado, para poder fazer a sua validação</td>
        </tr>
        <tr>
            <td rowspan="2">EP06 - Visualização de dados dos cursos do operário</td>
            <td>US19 - Eu, como usuário, gostaria de selecionar um curso específico realizado por um operário para visualizar as suas informações detalhadas.</td>
        </tr>
        <tr>
            <td>US20 - Eu, como usuário, gostaria de pesquisar por nome do curso para encontrar informações específicas.</td>
        </tr>
    </tbody>
</table>

## Priorização de histórias de usuário

|US|Nome|Valor de Negócio|Viabilidade|Criticidade|Total|
|--|----|----------------|-----------|-----------|-----|
|US18|Anexar certificado|3|3|3|9|
|US05|Notificar expiração|3|3|3|9|
|US01|Login|3|3|2|8|
|US02|Recuperar/alterar senha|2|3|2|7|
|US06|Cadastrar operário|3|3|1|7|
|US08|Atualizar cadastro de operário|3|3|1|7|
|US15|Adicionar curso|3|3|1|7|
|US09|Definir operário por competência|3|3|1|7|
|US11|Visualizar lista de operários|3|3|1|7|
|US12|Visualizar informações de operário|3|3|1|7|
|US13|Visualizar cursos feitos pelo operário|3|3|1|7|
|US04|Enviar avisos|3|2|2|7|
|US17|Editar informações sobre curso|3|3|1|7|
|US19|Visualizar informações de um curso|3|3|1|7|

*Foram distribuidos valores de 1 a 3 para os critérios acima descritos e a pontuação final foi calculada através de uma média simples.

## Mínimo Produto Viável 1

|US|Descrição|
|--|---------|
|US01|Eu, como usuário, gostaria de realizar o login para acessar as funcionalidades da aplicação.|
|US02|Eu, como usuário, gostaria de recuperar e alterar minha senha, para caso eu perca o meu acesso.|
|US06|Eu, como usuário, gostaria de cadastrar um novo operário para ter todos os operários da empresa cadastrados no sistema.|
|US11|Eu, como usuário, gostaria de visualizar uma lista com todos os operários da empresa para conseguir realizar uma melhor gestão de equipe.|
|US12|Eu, como usuário, gostaria de selecionar um operário específico da lista para visualizar suas informações detalhadas para tomar as melhores decisões para a equipe.|
|US15|Eu, como usuário, gostaria de adicionar um curso novo ao operário para manter os seus registros de cursos atualizados.|
|US13|Eu, como usuário, gostaria de visualizar todos os cursos e preparações realizados pelo operário para saber se ele atende os requisitos para determinada função.|

## Mínimo Produto Viável 2

|US|Descrição|
|--|---------|
|US18|Eu, como usuário, gostaria de anexar um certificado do curso realizado, para poder fazer a sua validação.|
|US04|Eu, como usuário, gostaria de enviar avisos sobre escalas e sobre a necessidade de realização de determinado curso no e-mail do funcionário, para obter maior transparência de comunicação.|
|US09|Eu, como usuário, gostaria de definir os funcionários de acordo com suas habilidades e competências, para ter certeza da qualificação dos operários que estão indo para determinada obra.|
|US05|Eu, como usuário, gostaria de ser notificado quando um curso de determinado funcionário está prestes a expirar para poder avisar o operário da necessidade de realizar um novo curso.|
|US08|Eu, como usuário, gostaria de atualizar o cadastro de um operário caso tenha uma informação nova ou com necessidade de alteração.|
|US17|Eu, como usuário, gostaria de editar informações sobre um curso para manter os dados atualizados e corretos.|
|US19|Eu, como usuário, gostaria de selecionar um curso específico realizado por um operário para visualizar as suas informações detalhadas.|

