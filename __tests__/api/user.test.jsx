import { POST } from '@/app/[locale]/api/auth/v1/user'
import { db } from '@/lib/db'
import { hashPassword } from '@/lib/utils'

jest.mock('@/lib/db', () => ({
  db: {
    user: {
      findUnique: jest.fn()
    }
  }
}))

jest.mock('@/lib/utils', () => ({
  hashPassword: jest.fn()
}))

describe('POST function', () => {
  const mockRequest = body => ({
    json: jest.fn().mockResolvedValue(body)
  })

  const mockResponse = () => ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 404 if user is not found', async () => {
    const req = mockRequest({ name: 'nonexistentuser', pswd: 'password' })
    const res = mockResponse()

    db.user.findUnique.mockResolvedValueOnce(null)

    await POST(req, res)

    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { userName: 'nonexistentuser' }
    })
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' })
  })

  it('should return 401 if password is incorrect', async () => {
    const req = mockRequest({ name: 'existinguser', pswd: 'wrongpassword' })
    const res = mockResponse()

    db.user.findUnique.mockResolvedValueOnce({ password: 'correcthash' })
    hashPassword.mockResolvedValueOnce('incorrecthash')

    await POST(req, res)

    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { userName: 'existinguser' }
    })
    expect(hashPassword).toHaveBeenCalledWith('wrongpassword')
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      error: 'Invalid username or password'
    })
  })

  it('should return user data if authentication succeeds', async () => {
    const req = mockRequest({ name: 'existinguser', pswd: 'correctpassword' })
    const res = mockResponse()

    db.user.findUnique.mockResolvedValueOnce({ password: 'correcthash' })
    hashPassword.mockResolvedValueOnce('correcthash')

    await POST(req, res)

    expect(db.user.findUnique).toHaveBeenCalledWith({
      where: { userName: 'existinguser' }
    })
    expect(hashPassword).toHaveBeenCalledWith('correctpassword')
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith({ password: 'correcthash' })
  })

  it('should handle errors and return 500', async () => {
    const req = mockRequest({ name: 'existinguser', pswd: 'correctpassword' })
    const res = mockResponse()

    db.user.findUnique.mockRejectedValueOnce(new Error('Database error'))

    await POST(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith('Internal Server Error')
  })
})
