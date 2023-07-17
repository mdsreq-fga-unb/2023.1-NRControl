const { getEmployees, getEmployeeById, createEmployee, compareNames, putEmployee } = require('../controllers/EmployeeControllers');
const { Employee, Cursos } = require('../models/schemas');

describe('Employee Controller', () => {
  describe('getEmployees', () => {
    it('deve retornar uma lista de funcionários quando tudo estiver correto', async () => {
      const listOfEmployees = [{ name: 'Funcionário 1' }, { name: 'Funcionário 2' }];
      Employee.findAll = jest.fn().mockResolvedValue(listOfEmployees);
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await getEmployees(null, res);

      expect(Employee.findAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(listOfEmployees);
      expect(res.status).not.toHaveBeenCalled();
    });

    it('deve retornar um erro 500 quando houver uma falha ao obter a lista de funcionários', async () => {
      const error = new Error('Falha ao obter lista de funcionários.');
      Employee.findAll = jest.fn().mockRejectedValue(error);
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await getEmployees(null, res);

      expect(Employee.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Falha ao obter lista de funcionários.' });
    });
  });

  describe('getEmployeeById', () => {
    it('deve retornar o funcionário correto quando o ID existe', async () => {
      const id = 1;
      const employee = { id: id, name: 'Funcionário 1' };
      Employee.findByPk = jest.fn().mockResolvedValue(employee);
      const req = {
        params: {
          id: id,
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await getEmployeeById(req, res);

      expect(Employee.findByPk).toHaveBeenCalledWith(id);
      expect(res.json).toHaveBeenCalledWith(employee);
      expect(res.status).not.toHaveBeenCalled();
    });

    it('deve retornar um erro 404 quando o ID não existe', async () => {
      const id = 1;
      Employee.findByPk = jest.fn().mockResolvedValue(null);
      const req = {
        params: {
          id: id,
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await getEmployeeById(req, res);

      expect(Employee.findByPk).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Funcionário não encontrado.' });
    });

    it('deve retornar um erro 500 quando houver uma falha ao obter o funcionário', async () => {
      const id = 1;
      const error = new Error('Falha ao obter funcionário.');
      Employee.findByPk = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          id: id,
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await getEmployeeById(req, res);

      expect(Employee.findByPk).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Falha ao obter funcionário.' });
    });
  });

  describe('createEmployee', () => {
    it('deve criar um funcionário corretamente', async () => {
      const createdEmployee = { id: 1, name: 'Funcionário 1' };
      Employee.create = jest.fn().mockResolvedValue(createdEmployee);
      const req = {
        body: { name: 'Funcionário 1' },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await createEmployee(req, res);

      expect(Employee.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdEmployee);
    });

    it('deve retornar um erro 500 quando houver uma falha ao criar o funcionário', async () => {
      const error = new Error('Falha ao criar funcionário.');
      Employee.create = jest.fn().mockRejectedValue(error);
      const req = {
        body: { name: 'Funcionário 1' },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await createEmployee(req, res);

      expect(Employee.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Falha ao criar funcionário.' });
    });
  });

  

    it('deve retornar um erro 500 quando houver uma falha ao comparar os nomes', async () => {
      const error = new Error('Falha ao comparar nomes.');
      Employee.findAll = jest.fn().mockRejectedValue(error);
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await compareNames(null, res);

      expect(Employee.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Falha ao comparar nomes.' });
    });
  });

  describe('putEmployee', () => {
    // Caso de teste quando a atualização é bem-sucedida
    it('deve atualizar o funcionário corretamente', async () => {
      // Dados de exemplo
      const req = {
        params: {
          id: 1, // ID do funcionário a ser atualizado
        },
        body: {
          name: 'Novo Nome', // Novo nome do funcionário
          position: 'Nova Posição', // Nova posição do funcionário
        },
      };
  
      const res = {
        json: jest.fn(), // Função mock para res.json()
      };
  
      // Mock da função de atualização do Employee
      Employee.update = jest.fn().mockResolvedValue(1); // O valor retornado pode ser ajustado conforme necessário
  
      // Chamar a função controller
      await putEmployee(req, res);
  
      // Verificar se a função de atualização do Employee foi chamada corretamente
      expect(Employee.update).toHaveBeenCalledWith(
        {
          name: 'Novo Nome',
          position: 'Nova Posição',
        },
        {
          where: { id: 1 },
        }
      );
  
      // Verificar se res.json() foi chamado com o resultado da atualização
      expect(res.json).toHaveBeenCalledWith(1);
    });
  
    // Caso de teste quando a atualização falha
    it('deve retornar um erro ao falhar a atualização do funcionário', async () => {
      // Dados de exemplo
      const req = {
        params: {
          id: 1, // ID do funcionário a ser atualizado
        },
        body: {
          name: 'Novo Nome', // Novo nome do funcionário
          position: 'Nova Posição', // Nova posição do funcionário
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(), // Função mock para res.status()
        json: jest.fn(), // Função mock para res.json()
      };
  
      // Mock da função de atualização do Employee lançando um erro
      Employee.update = jest.fn().mockRejectedValue(new Error('Erro na atualização do funcionário'));
  
      // Chamar a função controller
      await putEmployee(req, res);
  
      // Verificar se res.status() foi chamado com o código de status 500
      expect(res.status).toHaveBeenCalledWith(500);
  
      // Verificar se res.json() foi chamado com a mensagem de erro apropriada
      expect(res.json).toHaveBeenCalledWith({ error: 'Falha ao atualizar funcionário.' });
    });
  });
