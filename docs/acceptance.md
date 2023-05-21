# Critérios de aceitação

## Histórico de revisão
|Data|Versão|Descrição|Autor(es)|
|----|------|---------|---------|
|17/05/2023|0.1|Inclusão de critérios de aceitação|Gabriel, Felipe, Júlia, Manoel e Vinícius|

## Critérios de aceitação

|US|Nome|Critérios de aceitação|
|--|----|----------------------|
|US01|Login|1. O login deve ser realizado mediante email, no formato “email@email.com”, e senha, de no mínimo 8 caracteres, incluindo símbolos e números, corretos. A autenticação será feita a partir da validação com o banco de dados.|
|US02|Recuperar/alterar senha|1. Ao clicar em "Esqueceu sua senha?" deve ser enviado um email para o email informado para a recuperação da mesma.<br>2. Ao clicar no link de recuperação, o usuário deve ser redirecionado para uma página em que ele poderá redefinir sua senha.<br>3. A nova senha deve ter no mínimo 8 caracteres, incluindo símbolos e números.|
|US04|Enviar avisos|Para enviar o aviso, o usuário deve preencher os seguintes campos:<br>1. Para quem deseja enviar o aviso: neste campo, o usuário será capaz de pesquisar pelos operários cadastrados no sistema pelo nome e selecionar os desejados. Ao selecionar um operário, o seu nome aparecerá neste campo;<br>2. Assunto;<br>3. Descrição do assunto.|
|US05|Notificar expiração|Na notificação deverá conter:<br>1. Nome do operário com o curso prestes a expirar;<br>2. Código identificador do curso;<br>3. Data de expiração no formato DD/MM/AAAA.|
|US06|Cadastrar operário|O cadastro deve pedir as seguintes informações:<br>1. CPF: o CPF informado deve conter 11 números;<br>2. Nome: o nome deve conter nome e sobrenome;<br>3. Email: o email deve ter o formato "email@email.com";<br>4. Endereço;<br>5. Número de telefone: o número de telefone deve conter DDD e o telefone, totalizando 11 números;<br>6. Data de nascimento  no formato DD/MM/AAAA;<br>7. Data de admissão no formato DD/MM/AAAA;<br>8. Data de realização do ASO no formato DD/MM/AAAA.|
|US08|Atualizar cadastro de operário|1. Ao selecionar a opção de atualizar cadastro, a aplicação deve recuperar todos os dados adicionados nos campos de cadastro anteriormente para que o usuário possa editar apenas os dados que quer atualizar.| 
|US09|Definir operário por competência|As competências a serem selecionadas devem estar contidas em uma caixa de seleção. As competências são:<br>1. Servente;<br>2. Operador de máquinas;<br>3. Auxiliar de máquinas;<br>4. Sondador;<br>5. Soldador;<br>6. Encarregado;<br>7. Poceiro.|
|US11|Visualizar lista de operários|1. A lista deve ser organizada com os nomes do operários em ordem alfabética.|
|US12|Visualizar informações de operário|1. Ao clicar em cima de um item na lista, o mesmo deve redirecionar o usuário para uma página contendo todos os dados informados no cadastro e suas competências, além de um botão "Cursos".|
|US13|Visualizar cursos feitos pelo operário|1. Ao clicar em "Cursos" na página contendo os dados de um operário, o usuário deve ser redirecionado para uma página contendo uma lista que mostre todos códigos dos cursos e preparações realizados por ele.|
|US15|Adicionar curso|Ao adicionar um novo curso, é preciso preencher as seguintes informações:<br>1. Código do curso (Exemplo: NR-14);<br>2. Data de conclusão do curso no formato DD/MM/AAAA;<br>3. Data de expiração do curso no formato DD/MM/AAAA;<br>4. Campo de informações do curso.<br>O campo de informações irá conter uma introdução do assunto do curso e será preenchido pelo usuário.|
|US17|Editar informações sobre curso|1. Ao editar um curso, deve ser possível alterar a sua data de conclusão e expiração.|
|US18|Anexar certificado|1. Ao selecionar um curso, deve ter um campo para anexar uma imagem do certificado do curso;<br>2. Enquanto o certificado não for anexado, o cadastro do curso vai ter o status de "pendente".|
|US19|Visualizar informações de um curso|Ao selecionar um curso realizado pelo operário, deve ser exibido as seguintes informações:<br>1. Código do curso (Exemplo: NR-14);<br>2. Data de conclusão do curso no formato DD/MM/AAAA;<br>3. Data de expiração do curso no formato DD/MM/AAAA;<br>4. Campo de informações do curso.|