import { http, HttpResponse } from 'msw';

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];


export const userFixture = [
    // GET Request - Pobieranie listy użytkowników
  http.get('/users', () => {
    return HttpResponse.json(users);
  }),

  // POST Request - Dodawanie nowego użytkownika
  http.post('/users', async ({ request }) => {
    const user = await request.json() as User;
    const newUser = {
      id: users.length + 1,
      name: user.name,
      email: user.email
    };
    users.push(newUser);
    return HttpResponse.json(newUser, {
      status: 201
    });
  }),

  // PATCH Request - Aktualizacja użytkownika
  http.patch('/users/:id', async ({ request, params }) => {
    const updatedUser = await request.json() as Partial<User>;
    // Sprawdzamy czy `params.id` jest stringiem, a nie tablicą
    const id = typeof params.id === 'string' ? params.id : params.id[0];
    const userIndex = users.findIndex(user => user.id === parseInt(id, 10));

    if (userIndex > -1) {
      const newUser = { ...users[userIndex], ...updatedUser, id: users[userIndex].id };
      users[userIndex] = newUser;
      return HttpResponse.json(newUser);
    } else {
      return HttpResponse.json({ message: 'User not found' }, {
        status: 404
      });
    }
  }),

  // DELETE Request - Usuwanie użytkownika
  http.delete('/users/:id', ({ params }) => {
    const id = typeof params.id === 'string' ? params.id : params.id[0];
    const userIndex = users.findIndex(user => user.id === parseInt(id, 10));
    
    if (userIndex > -1) {
      users.splice(userIndex, 1);
      return HttpResponse.json({ message: 'User deleted' }, {
        status: 200
      });
    } else {
      return HttpResponse.json({ message: 'User not found' }, {
        status: 404
      });
    }
  }),
]