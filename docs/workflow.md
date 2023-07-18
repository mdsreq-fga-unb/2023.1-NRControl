## Workflow de integração contínua

## Histórico de revisão

|Data|Versão|Descrição|Autor(es)|
|----|------|---------|---------|
|17/05/2023|0.1|Construção do documento|Gabriel|
|18/05/2023|0.2|Inclusão do workflow de teste do Node.js|Gabriel|
|17/07/2023|0.3|Adição das estratégias de teste|Gabriel|

A integração contínua (CI, Continuous Integration) é uma prática de software que exige commits frequentes de códigos para um repositório compartilhado. Fazer commits de códigos com frequência detecta erros com mais antecedência e reduz a quantidade de código necessária para depuração quando os desenvolvedores chegam à origem de um erro.

Para compilar e testar seu código, é necessário usar um servidor. Você pode criar e testar atualizações no local antes de fazer push do código para um repositório, ou pode usar um servidor de CI que verifica os novos commits de código em um repositório.

Por exemplo, como utilizaremos JavaScript no desenvolvimento do nosso produto, utilizaremos o seguinte workflow de integração contínua que cria e testa o código Node.js, que permite a execução de códigos JavaScript fora de um navegador web:

```
# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

name: Node.js CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test
```

<br>
A seguinte imagem mostra uma linha do tempo que os workflows de integração contínua irão seguir:

![Image](./images/workflow.PNG)

## Estratégia De Teste

|Estratégia|Tipo de Teste|Nivel de Teste|Técnica De Teste|Qualidade|Técnico ou Negócio|
|----------|-------------|--------------|----------------|---------|------------------|
|1|Funcional|Unitario|Automatico|Interna|Técnico|
|2|Funcional|Aceitação|Manual|Externa|Negócio|
|3|Funcional|Sistema|Caixa Preta|Externa|Técnico|
|4|Suportabilidade|Sistema|Manual|Externa|Negócio|