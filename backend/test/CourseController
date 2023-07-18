const { getCourses, createCourses, getCourseById, putCourse } = require('../controllers/CourseControllers');
const { Course } = require('../models/schemas');

// Mocked req and res objects
const req = {};
const res = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
};

// Mocked Course data
const courseData = {
  name: 'Manejo de Máquina',
  course: 'MJ Máquina',
  info: 'Manejar X Máquina na Obra',
  conclusiondate: '2023-12-31',
  expirationdate: '2024-12-31',
};

// Mocked courses array
const courses = [
  { id: 1, name: 'Curso 1' },
  { id: 2, name: 'Curso 2' },
];

// Mocked course object
const course = { id: 1, name: 'Curso 1' };

// Mocking Sequelize methods
jest.mock('../models/schemas', () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  return {
    Course: dbMock.define('Course', courseData),
  };
});

describe('getCourses', () => {

  it('Deve retornar todos os cursos', async () => {
    Course.findAll = jest.fn().mockResolvedValue(courses);

    await getCourses(req, res);

    expect(Course.findAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(courses);
  });

  it('Deve retornat erro ao buscar curso', async () => {
    const error = { message: 'Database error' };
    Course.findAll = jest.fn().mockRejectedValue(error);

    await getCourses(req, res);

    expect(Course.findAll).toHaveBeenCalled();
  });
});





describe('createCourses', () => {
  it('Deve criar um novo curso', async () => {
    Course.create = jest.fn().mockResolvedValue(course);

    req.body = courseData;

    await createCourses(req, res);

    expect(Course.create).toHaveBeenCalledWith(courseData);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(course);
  });

  it('Mostrar erro ao criar curso', async () => {
    const error = { message: 'Database error' };
    Course.create = jest.fn().mockRejectedValue(error);

    req.body = courseData;

    await createCourses(req, res);

    expect(Course.create).toHaveBeenCalledWith(courseData);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(error);
  });
});

describe('getCourseById', () => {
  it('Deve retornar um curso pelo ID', async () => {
    const courseId = 1;
    Course.findByPk = jest.fn().mockResolvedValue(course);

    req.params = { id: courseId };

    await getCourseById(req, res);

    expect(Course.findByPk).toHaveBeenCalledWith(courseId);
    expect(res.json).toHaveBeenCalledWith(course);
  });

  it('Deve retornar erro ao buscar um curso por ID', async () => {
    const error = { message: 'Database error' };
    const courseId = 1;
    Course.findByPk = jest.fn().mockRejectedValue(error);

    req.params = { id: courseId };

    await getCourseById(req, res);

    expect(Course.findByPk).toHaveBeenCalledWith(courseId);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(error);
  });

  it('Retornar o erro 404 se o curso não for encontrado', async () => {
    const courseId = 1;
    Course.findByPk = jest.fn().mockResolvedValue(null);

    req.params = { id: courseId };

    await getCourseById(req, res);

    expect(Course.findByPk).toHaveBeenCalledWith(courseId);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Curso não encontrado' });
  });
});

describe('putCourse', () => {
  it('Deve atualizar o curso', async () => {
    const updatedCourse = [1];
    const id = 1;
    Course.update = jest.fn().mockResolvedValue(updatedCourse);

    req.params = { id };
    req.body = courseData;

    await putCourse(req, res);

    expect(Course.update).toHaveBeenCalledWith(courseData, { where: { id } });
    expect(res.json).toHaveBeenCalledWith(updatedCourse);
  });

  it('Deve retornar erro ao atualizar o curso', async () => {
    const error = { message: 'Database error' };
    const id = 1;
    Course.update = jest.fn().mockRejectedValue(error);

    req.params = { id };
    req.body = courseData;

    await putCourse(req, res);

    expect(Course.update).toHaveBeenCalledWith(courseData, { where: { id } });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Falha ao atualizar curso.' });
  });
});
