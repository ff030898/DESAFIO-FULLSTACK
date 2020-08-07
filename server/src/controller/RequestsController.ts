import Knex from '../database/connection';
import { Request, Response } from 'express';

class RequestsController {

    async index(request: Request, response: Response) {

        const requests = await Knex('requests').select('*');

        const serializedRequests = requests.map((item) => {
            return {
                id: item.id,
                name: item.name,
                tel: item.tel,
                coffee: item.coffee,
                qtd: item.qtd,
                status: item.status
            };
        });

        return response.json(serializedRequests);
    }

    async show(request: Request, response: Response) {

        //desestruturação: Poderia ser: const id = request.params.id;   
        const { status } = request.params;

        const requests = await Knex('requests').where('status', status);

        const serializedRequests = requests.map((item) => {
            return {
                id: item.id,
                name: item.name,
                tel: item.tel,
                coffee: item.coffee,
                qtd: item.qtd,
                status: item.status
            };
        });

        
        if (!requests) {
            return response.status(400).json({ message: 'Requests not found' });
        }

        return response.json(serializedRequests);
    }


    async create(request: Request, response: Response) {

        const {
            name,
            email,
            tel,
            coffee,
            qtd,
            status

        } = request.body;


        const trx = await Knex.transaction();

        const item = {

            name,
            email,
            tel,
            coffee,
            qtd,
            status

        }

        const insert = await trx('requests').insert(item);

        await trx.commit();

        if (insert) {
            return response.status(200).json({ message: 'create' });
        }

    }

    async store(request: Request, response: Response) {

        const { id } = request.params;

        const {
            name,
            email,
            tel,
            coffee,
            qtd,
            status

        } = request.body;

        const item = {

            name,
            email,
            tel,
            coffee,
            qtd,
            status
        }

        await Knex('requests')
            .update(item)
            .where({ id });

        return response.status(200).json({ message: 'update' });

    }

    async destroy (request: Request, response: Response) {

        const { id } = request.params;

        await Knex('requests')
            .del()
            .where({ id });

        return response.status(200).json({ message: 'delete' });

    }

}

export default RequestsController;