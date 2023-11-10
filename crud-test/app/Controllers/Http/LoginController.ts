import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Login from 'App/Models/Login'

export default class LoginController {
  public async index({ response }: HttpContextContract) {
    const logins = await Login.all()

    return response.status(200).json({
      success: true,
      data: logins,
    })
  }

  public async store({ request, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    if (typeof password !== 'string') {
      return response.status(400).json({
        success: false,
        message: 'Password must be of type string',
      })
    }

    if (typeof email !== 'string') {
      return response.status(400).json({
        success: false,
        message: 'Email must be of type string',
      })
    }

    if (password === '' || password === undefined) {
      return response.status(400).json({
        success: false,
        message: 'Password cannot be blank',
      })
    }

    if (password.length < 6) {
      return response.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      })
    }

    if (email === '' || email === undefined) {
      return response.status(400).json({
        success: false,
        message: 'Email cannot be blank',
      })
    }

    if (!email.includes('@')) {
      return response.status(400).json({
        success: false,
        message: 'Email must contain the "@" character',
      })
    }

    if (email.length < 8) {
      return response.status(400).json({
        success: false,
        message: 'Email must have at least 8 characters',
      })
    }

    if (!/[a-z]/.test(password)) {
      return response.status(400).json({
        success: false,
        message: 'Password must contain at least 1 lowercase character',
      })
    }

    if (!/[A-Z]/.test(password)) {
      return response.status(400).json({
        success: false,
        message: 'Password must contain at least 1 uppercase character',
      })
    }

    if (!/\d/.test(password)) {
      return response.status(400).json({
        success: false,
        message: 'Password must contain at least 1 number',
      })
    }

    try {
      const login = new Login()
      login.email = email
      login.password = password
      await login.save()

      return response.status(201).json({
        success: true,
        message: 'User created successfully',
        data: login,
      })
    } catch (error) {
      console.error(error)
      return response.status(400).json({
        success: false,
        message: 'Failed to create login',
      })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const login = await Login.findOrFail(params.id)

      return response.status(200).json({
        success: true,
        data: login,
      })
    } catch (error) {
      return response.status(404).json({
        success: false,
        message: 'Login not found',
      })
    }
  }

  // || password === undefined

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params
    const { email } = request.body()

    try {
      const user = await Login.findOrFail(id)
      user.email = email
      await user.save()

      return response.status(200).json({
        data: user,
        message: 'User atualizado com sucesso!',
      })
    } catch (error) {
      return response.status(404).json({
        error: 'User not found',
      })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const login = await Login.findOrFail(params.id)

      await login.delete()

      return response.status(200).json({
        success: true,
        message: 'Login deleted successfully',
      })
    } catch (error) {
      return response.status(404).json({
        success: false,
        message: 'Failed to delete login',
      })
    }
  }
}

// public async update({ params, request, response }: HttpContextContract) {
//   try {
//     const body = request.body

//     const login = await Login.findOrFail(params.id)

//     login.email = body.email
//     login.password = login.password

//     await login.save()

//     return response.status(200).json({
//       message: 'User atualizado com sucesso!',
//       data: login,
//     })
//   } catch (error) {
//     return response.status(500).json({
//       message: 'Falha ao atualizar o usuário',
//     })
//   }
// }
