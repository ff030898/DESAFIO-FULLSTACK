import React, { useEffect, useState } from 'react';
import MaterialTable, { Column } from 'material-table';
import api from '../../services/api';

interface Row {
    id: number;
    name: string;
    coffee: string;
    qtd: number;
    status: string;
}

interface TableState {
    columns: Array<Column<Row>>;
}

const PanelControl = (() => {

    const [data, setData] = useState<Row[]>([]);

    const [state] = useState<TableState>({
        columns: [
            { title: "id", field: "id", hidden: true },
            { title: "Cliente", field: "name" },
            { title: "Item", field: "coffee" },
            { title: "Status", field: "status", lookup: { 1: 'Preparando', 2: 'Pronto', 3: 'Retirar', 4: 'Finalizado' } },
            { title: "Quantidade", field: "qtd", type: 'numeric' }
        ],

    });

    useEffect(() => {
        api.get('requests').then(response => {
            setData(response.data)
        })
    }, [])

    const handleRowUpdate = (newData: Row, oldData: any, resolve: any) => {

        api.put("/requests/" + newData.id, newData)
            .then(res => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                resolve()
            })
    }


    return (


        <MaterialTable
            title="Pedidos"
            columns={state.columns}
            data={data}
            style={{ margin: 30, borderRadius: 10, padding: 30, fontWeight: 900 }}
            editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        handleRowUpdate(newData, oldData, resolve);
                    })
            }}
        />



    );

});

export default PanelControl;