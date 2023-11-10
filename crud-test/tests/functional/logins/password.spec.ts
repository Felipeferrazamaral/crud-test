import { test } from '@japa/runner'

test.group('Logins password', (group) => {
  // Write your test here
  group.tap((test) => test.tags(['@Logins_password']))

  test('should create user sucessfuly', async ({ client }) => {
    const response = await client
      .post('/api/logins')
      .json({
        email: 'Felipe@email.com.br',
        password: 'Senha123',
      })
      .send()

    response.assertStatus(201)
  })

  test('should return an error if login creation fails', async ({ client }) => {
    const response = await client.post('/api/logins').json({
      email: 'test@example.com',
      password: '',
    })

    response.assertStatus(400)
  })

  test('should return all logins', async ({ client }) => {
    const response = await client.get('/api/logins')

    response.assertStatus(200)
    response.assertBodyContains({ success: true })
  })

  test('should return 404 if login not found by id', async ({ client }) => {
    const response = await client.get('/api/logins/1')

    response.assertStatus(404)
    response.assertBodyContains({ success: false })
  })

  test('should return 200 if login  found by id', async ({ client }) => {
    const response = await client.get('/api/logins/78')

    response.assertStatus(200)
  })

  test('should return an error if password does not contain at least 1 lowercase character', async ({
    client,
  }) => {
    const response = await client.post('/api/logins').json({
      email: 'test@example.com',
      password: 'SENHA123',
    })

    response.assertStatus(400)
  })

  test('should return an error if password does not contain at least 1 uppercase character', async ({
    client,
  }) => {
    const response = await client.post('/api/logins').json({
      email: 'test@example.com',
      password: 'senha123',
    })

    response.assertStatus(400)
  })

  test('should return an error if password does not contain at least 1 number', async ({
    client,
  }) => {
    const response = await client.post('/api/logins').json({
      email: 'test@example.com',
      password: 'SenhaTeste',
    })

    response.assertStatus(400)
  })

  test('should return 400 if Password is not a string', async ({ client }) => {
    const response = await client.post('/api/logins').json({
      password: 123456,
    })

    response.assertStatus(400)
    response.assertBodyContains({ success: false, message: 'Password must be of type string' })
  })

  test('should return 400 if Email is not a string', async ({ client }) => {
    const response = await client.post('/api/logins').json({
      email: 12345677,
    })

    response.assertStatus(400)
  })

  test('should return an error if password is blank', async ({ client }) => {
    const response = await client.post('/api/logins').json({
      password: '',
    })

    response.assertStatus(400)
  })

  test('should return an error if email is blank', async ({ client }) => {
    const response = await client.post('/api/logins').json({
      email: '',
    })

    response.assertStatus(400)
  })

  test('should return 400 if email does not contain "@"', async ({ client }) => {
    const response = await client.post('/api/logins').json({
      email: 'Felipeemail.com.br',
      password: 'Senha123',
    })
    response.assertStatus(400)
  })

  test('should return 400 if email has less than 8 characters', async ({ client }) => {
    const response = await client.post('/api/logins').json({
      email: 'a@b.c',
      password: 'Senha123',
    })
    response.assertStatus(400)
  })

  test('should return an error if password is less than 6 characters', async ({ client }) => {
    const response = await client.post('/api/logins').json({
      password: 'Senh1',
    })

    response.assertStatus(400)
  })

  test('should return 200 if login update sucesfully', async ({ client }) => {
    const response = await client.put('/api/logins/78').json({
      email: 'Felipetoollz@email.com',
    })

    response.assertStatus(200)
  })

  test('should return 404 if login update fails', async ({ client }) => {
    const response = await client.put('/api/logins/1').json({
      email: 'test@example.com',
    })

    response.assertStatus(404)
  })

  test('should return 404 if login does not exist', async ({ client }) => {
    const response = await client.get('/api/logins/999')

    response.assertStatus(404)
    response.assertBodyContains({ success: false })
  })

  test('should delete user sucessfuly', async ({ client }) => {
    const response = await client.delete('/api/logins/108')

    response.assertStatus(200)
  })

  test('should return 404 failed to delete a login', async ({ client }) => {
    const response = await client.delete('/api/logins/90')

    response.assertStatus(404)
  })
})
