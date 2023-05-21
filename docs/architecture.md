# Arquitetura do projeto

|Data|Versão|Descrição|Autor(es)|
|----|------|---------|---------|
|11/05/2023|0.1|Descrição da escolha de arquitetura e tipo arquitetural|Gabriel e Júlia|

## Arquitetura em camadas

Entre os motivos para a seleção desse tipo de arquitetura estão:

- Modularidade e reutilização de código: cada camada promove pode ser testada e desenvolvida de forma independente.
- Separação de responsabilidades: ajuda a organizar o código de forma clara e a manter a lógica de negócios isolada da interface do usuário e do acesso a dados.
- Facilita a manutenção e escabilidade.

## Estilo arquitetural: Model View Controller(MVC)

O MVC foi o estilo arquitetural escolhido pela familiaridade dos membros do grupo com o mesmo, além de casar bem com a arquitetura em camadas, por também ser dividido em camadas. E também, nós o considerarmos particularmente adequado para sistemas não tão complexos, como o nosso, pelas seguintes razões:

- Separação das responsabilidades: como o MVC separa as responsabilidades do sistema em 3 componentes principais(Modelo, Visualização e Controle), isso ajuda a manter o código organizado e facilita a compreensão e manutenção do sistema. Para projetos menores, essa clareza na estrutura é especialmente útil já que é mais fácil acompanhar a lógica do sistema.
- Reutilização de código: o MVC promove a reutilização de código ao separar a lógica de negócio(Model) da interface de usuário(View) e da lógica de controle(Controller). Isso permite que cada componente do sistema possa ser alterado ou substituído independente um do outro.
- Facilidade de manutenção: a divisão em camadas facilita a localização e correção de problemas e inclusão de novos recursos, além de facilitar a realização de testes específicos em cada camada.
- Agilidade no desenvolvimento: o MVC permite colaboração e iteratividade, dividindo o trabalho por camadas, possibilitando um desenvolvimento mais rápido e eficiente, ainda mais em equipes pequenas.

