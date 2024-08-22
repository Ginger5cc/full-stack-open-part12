const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { setAsync, getAsync } = require('../redis')



router.get('/statistics', async (_, res) => {
  const toAdd = await getAsync('added_todos');
  if (!toAdd) {
    return res.json({added_todos: "0"});
  }
  return res.json({added_todos: toAdd});
});

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});



/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todoCounter = async () => {
    const count = await getAsync('added_todos');

    return count ? setAsync('added_todos', parseInt(count) + 1) : setAsync('added_todos', 1);
  };

  todoCounter();
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const id = req.todo.id
  const body = req.body
  const update = {
    text: req.todo.text,
    done: body.done,
  }
  console.log('id', id)
  console.log('done is', body.text)
  const updatedTodo = await Todo.findByIdAndUpdate(id, update, { new: true })
  if (!updatedTodo) return res.sendStatus(404)
    else return res.status(200).json(updatedTodo)
  
});

router.use('/:id', findByIdMiddleware, singleRouter)

router.put('/statistics', async (req, res) => {
  const count = await getAsync('addedTodos');
  return count ? setAsync('addedTodos', parseInt(count) + 1) : setAsync('addedTodos', 1);
});



module.exports = router;
