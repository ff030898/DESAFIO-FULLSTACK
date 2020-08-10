import Knex from '../database/connection'
import { Request, Response, NextFunction } from 'express'
import { io } from '../server'


class RequestsController {
    static async index(request: Request, response: Response, next: NextFunction) {

        try {

            const filters = request.query;

            const status = filters.status as String;

            if (!status) {
                const requests = await Knex('requests').select('*')

                const serializedRequests = requests.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        tel: item.tel,
                        coffee: item.coffee,
                        qtd: item.qtd,
                        status: item.status
                    }
                })

                if (serializedRequests.length == 0) {
                    return response.status(404).json({ message: 'Not found' })
                }

                return response.status(200).json(serializedRequests)
            }

            const requests = await Knex('requests').where('status', status)

            const serializedRequests = requests.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    tel: item.tel,
                    coffee: item.coffee,
                    qtd: item.qtd,
                    status: item.status
                }
            })

            if (serializedRequests.length == 0) {
                return response.status(404).json({ message: 'Not found' })
            }

            return response.status(200).json(serializedRequests)



        } catch (err) {
            next(err)
        }
    }

    static async show(request: Request, response: Response, next: NextFunction) {

        try {
            // desestruturação: Poderia ser: const id = request.params.id;
            const { id } = request.params

            const requests = await Knex('requests').where('id', id)

            const serializedRequests = requests.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    tel: item.tel,
                    coffee: item.coffee,
                    qtd: item.qtd,
                    status: item.status
                }
            })

            if (serializedRequests.length == 0) {
                return response.status(404).json({ message: 'Not found' })
            }


            return response.status(200).json(serializedRequests)

        } catch (err) {
            next(err)
        }
    }

    static async create(request: Request, response: Response, next: NextFunction) {
        try {

            io.emit('status', 'create')
             
            const {
                name,
                email,
                tel,
                coffee,
                qtd,
                status

            } = request.body

            const item = {

                name,
                email,
                tel,
                coffee,
                qtd,
                status
            }

            await Knex('requests').insert(item)

            return response.status(201).json({ message: 'Request create successful' })

        } catch (err) {
            next(err)
        }
    }

    static async store(request: Request, response: Response, next: NextFunction) {

        try {

            io.emit('status', 'update')

            const { id } = request.params

            const {
                name,
                email,
                tel,
                coffee,
                qtd,
                status

            } = request.body

            const item = {

                name,
                email,
                tel,
                coffee,
                qtd,
                status
            }

            const update = await Knex('requests')
                .update(item)
                .where({ id })

            if (!update) {

                return response.status(400).json({ message: 'Bad Request' })

            }

            return response.status(201).json({ message: 'request update successful' })

        } catch (err) {
            next(err)
        }
    }

    static async destroy(request: Request, response: Response, next: NextFunction) {

        try {

            io.emit('status', 'delete')

            const { id } = request.params

            const del = await Knex('requests')
                .del()
                .where({ id })

            if (!del) {
                return response.status(404).json({ message: 'Not found' })
            }

            return response.status(200).json({ message: 'request delete successful' })

        } catch (err) {
            next(err)
        }
    }
}

export default RequestsController
