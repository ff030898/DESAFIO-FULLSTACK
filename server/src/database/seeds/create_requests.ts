import knex from 'knex';

export async function seed(Knex: knex){
 await Knex('requests').insert([
    {name: 'John Doe', email: 'teste@gmail.com', tel:'(11)900000000', coffee: 'Café Expresso', qtd: 1, status: '1'},
    {name: 'John Doe', email: 'teste@gmail.com', tel:'(11)900000000', coffee: 'Café Expresso', qtd: 1, status: '2'},
    {name: 'Jane Doe', email: 'teste@gmail.com', tel:'(11)900000000', coffee: 'Café Expresso', qtd: 1, status: '1'},
    {name: 'Jane Doe', email: 'teste@gmail.com', tel:'(11)900000000', coffee: 'Café Expresso', qtd: 1, status: '2'},
    {name: 'John Doe', email: 'teste@gmail.com', tel:'(11)900000000', coffee: 'Café Expresso', qtd: 1, status: '3'}
 ])
}