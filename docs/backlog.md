# Backlog do Produto

## Histórico de revisão

|Data|Versão|Descrição|Autor(es)|
|----|------|---------|---------|
|10/05/2023|0.1|Construção do Backlog|Gabriel, Felipe, Júlia, Manoel e Vinícius|
|11/05/2023|0.2|Alterações na pontuação do Backlog|Júlia|
|11/05/2023|0.3|Alterações na descrição da pontuação do Backlog|Júlia|

## 1. Temas

|Tema|Descrição|
|----|---------|
|TH01|Gerenciamento de usuário|
|TH02|Gerenciamento de operários|
|TH03|Gerenciamento de cursos|

## 2. Épicos

|Tema|Épico|Descrição|
|----|-----|---------|
|TH01|EP01|Autenticação de usuário na plataforma|
|TH02|EP02|Cadastro de operários|
|TH02|EP03|Visualização de dados de operários|
|TH02|EP04|Gerenciamento de informações sobre os funcionários|
|TH03|EP05|Cadastro de cursos|
|TH03|EP06|Visualização de dados dos cursos|
|TH03|EP07|Gerenciamento de informações sobre os cursos|

## 3. Histórias de usuário

|Tema|Épico|História de Usuário|Descrição|Pontuação|
|----|-----|-------------------|---------|---------|
|TH01|EP01|US01|Eu, como usuário, gostaria de realizar o login para acessar as funcionalidades da aplicação.|2,6|
|TH01|EP01|US02|Eu, como usuário, gostaria de poder recuperar e alterar minha senha caso eu perca o meu acesso.|2|
|TH01|EP01|US03|Eu, como usuário, quero ser capaz de realizar o logout no aplicativo para que eu possa encerrar meu acesso.|1|
|TH02|EP02|US04|Eu, como usuário, quero poder cadastrar um novo operário.|2,6|
|TH02|EP02|US05|Eu, como usuário, quero poder excluir um operário do sistema.|1,6|
|TH02|EP02|US06|Eu, como usuário, gostaria de atualizar o cadastro de um operário caso tenha uma informação nova ou com necessidade de alteração.|2|
|TH02|EP02|US07|Eu, como usuário, gostaria de poder adicionar um curso novo ao operário para manter os registros de cursos atualizados.|2,6|
|TH02|EP02|US08|Eu, como usuário, gostaria de poder excluir um curso do operário para manter os registros corretos.|2,6|
|TH02|EP03|US09|Eu, como usuário, gostaria de selecionar o operário de acordo com sua localização, para poder visualizar o funcionário mais próximo do local da obra.|2,3|
|TH02|EP03|US10|Eu, como usuário, gostaria de poder definir os funcionários de acordo com suas habilidades e competências, para ter segurança dos operários que estão indo para determinada obra.|2,6|
|TH02|EP03|US11|Eu, como usuário, gostaria de poder visualizar uma lista com todos os operários da empresa.|2,3|
|TH02|EP03|US012|Eu, como usuário, gostaria de ser capaz de selecionar um operário específico da lista para visualizar suas informações detalhadas.|2,6|
|TH02|EP03|US013|Eu, como usuário, gostaria de observar todos os cursos e preparações realizados pelo operário para saber se ele atende os requisitos para determinada função.|2|
|TH02|EP03|US014|Eu, como usuário, quero poder pesquisar um operário por nome ou CPF para encontrar informações específicas sobre ele.|2,6|
|TH02|EP04|US015|Eu, como usuário, gostaria de enviar avisos sobre escalas e sobre a necessidade de realização de determinado curso no e-mail do funcionário, para obter maior transparência de comunicação.|2,6|
|TH02|EP04|US016|Eu, como usuário, gostaria de ser notificado quando um curso de determinado funcionário está prestes a expirar para poder avisar o operário da necessidade de realizar um novo curso.|1,6|
|TH03|EP04|US017|Eu, como usuário, gostaria de poder editar informações sobre um curso para manter os dados atualizados e corretos.|2,6|
|TH03|EP05|US018|Eu, como usuário, gostaria de ser capaz de selecionar um curso específico realizado por um operário para visualizar as suas informações detalhadas.|2,3|
|TH03|EP05|US019|Eu, como usuário, quero poder pesquisar por nome do curso para encontrar informações específicas.|2,3|
|TH03|EP07|US020|Eu, como usuário, gostaria de poder validar se o curso informado pelo funcionário é valido, para manter a confiabilidade e certeza da capacitação.|2,3|
|TH02|EP04|US021|Eu, como usuário, gostaria gerenciar o banco de horas de cada operário, para saber se no final do mês determinado operário ficou devendo horas ou possui horas extras.|1,6|




*A pontuação aqui descrita foi estabelecida considerando critérios de viabilidade, valor de negócio e complexidade. Para seu cálculo foram distribuidos valores de 1 a 3 para os critérios acima descritos, a pontuação final foi calculada através de uma média simples.

### Personas

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

## Mínimo Produto Viável 1

## Mínimo Produto Viável 2