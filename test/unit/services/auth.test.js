import AuthService from '../../../src/services/auth.js'
import bcrypt from 'bcrypt'
import Util from 'util'
import sinon from 'sinon'
import jwt from 'jsonwebtoken'
import config from 'config'

const hashAsync = Util.promisify(bcrypt.hash)

describe('Service: Auth', () => {
    context('authenticate', () => {
        it('should authenticate an user', async () => {
            const fakeUserModel = {
                findOne: sinon.stub()
            }
            const user = {
                name: 'John',
                email: 'johndoe@mail.com',
                password: '12345'
            }
            const authService = new AuthService(fakeUserModel)
            const hashedPassword = await hashAsync('12345', 10)
            const userFromDatabase = { ...user,
                password: hashedPassword
            }
            
            fakeUserModel.findOne.withArgs({ email: 'johndoe@mail.com' }).resolves(userFromDatabase)

            const res = await authService.authenticate(user)
            expect(res).to.eql(userFromDatabase)
        })

        it('should return false when the password does not match', async () => {
            const user = {
                email: 'john@mail.com',
                password: '12345'
            }
            const fakeUserModel = {
                findOne: sinon.stub()
            }
            fakeUserModel.findOne
                .resolves({ email: user.email, password: 'aFakeHashedPassword' })
            const authService = new AuthService(fakeUserModel)
            const response = await authService.authenticate(user)

            expect(response).to.be.false
        })
    })

    context('generateToken', () => {
        it('should generate a JWT token from payload', () => {
            const payload = {
                name: 'John',
                email: 'johndoe@mail.com',
                password: '12345'
            }
            const expectedToken = jwt.sign(payload, config.get('auth.key'), {
                expiresIn: config.get('auth.tokenExpiresIn')
            })
            const generateToken = AuthService.generateToken(payload)
            expect(generateToken).to.eql(expectedToken)
        })
    })
})