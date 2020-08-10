import React, { useEffect, useState } from 'react'
import MaterialTable, { Column } from 'material-table'
import { getRequests, updateRequest } from '../../services/api'
import './styles.css'

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

const PanelControl = () => {
  const [data, setData] = useState<Row[]>([])

  const [state] = useState<TableState>({
    columns: [
      { title: 'id', field: 'id', hidden: true },
      { title: 'Cliente', field: 'name' },
      { title: 'Item', field: 'coffee' },
      { title: 'Status', field: 'status', lookup: { 1: 'Preparando', 2: 'Pronto', 3: 'Retirar', 4: 'Finalizado' } },
      { title: 'Quantidade', field: 'qtd', type: 'numeric' }
    ]

  })

  useEffect(() => {
    getRequests().then(setData)
  }, [])

  const handleRowUpdate = (newData: Row, oldData: any, resolve: any) => {

    updateRequest(newData.id, newData).then(res => {
      const dataUpdate = [...data]
      const index = oldData.tableData.id
      dataUpdate[index] = newData
      setData([...dataUpdate])
      resolve()
    })

  }
  return (

    <React.StrictMode>
      <div className="div-table">
        <MaterialTable
          title="Pedidos"
          columns={state.columns}
          data={data}
          style={{padding: 50}}
          editable={{
            onRowUpdate: (newData: any, oldData: any) =>
              new Promise((resolve) => {
                handleRowUpdate(newData, oldData, resolve)
              }),
          }}
        />
      </div>
    </React.StrictMode>

  )
}

export default PanelControl
