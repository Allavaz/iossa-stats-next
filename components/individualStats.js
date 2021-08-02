import { useTable, usePagination, useFilters } from 'react-table';
import { useMemo } from 'react';
import Link from 'next/link';
import { getTeamLogo } from '../utils/Utils';
import Image from 'next/image';

export default function IndividualStats({ players, category }) {
  const columns = useMemo(() => [
    {
      Header: 'Jugador',
      accessor: 'name',
      fixed: 'left',
      width: 150,
      Cell: row => {
        return (
          <Link href={'/jugador/' + row.row.original._id}><a>{row.row.original.name}</a></Link>
        )
      }
    },
    {
      Header: 'Equipo',
      accessor: 'team',
      Cell: row => {
        return (
          <div className='teamlogo' 
            style={{
              justifyContent: 'center'
            }}>
            <Image height='16px' 
              width='16px'
              src={getTeamLogo(row.row.original.team)} 
              alt={row.row.original.team}
              layout='fixed'
            >
            </Image> <div style={{marginLeft: '5px'}}>{row.row.original.team}</div>
          </div>
        )
      },
    },
    {
      Header: 'Partidos',
      accessor: 'matches',
      width: 70
    },
    {
      Header: 'Goles',
      accessor: 'goals',
      width: 70
    },
    {
      Header: 'Asistencias',
      accessor: 'assists',
      width: 100
    },
    {
      Header: 'Tiros (al Arco)',
      accessor: 'shotsontarget',
      width: 130,
      Cell: row => {
        return row.row.original.shots +" (" + row.row.original.shotsontarget + ")"
      }
    },
    {
      Header: 'Pases (Completados)',
      accessor: 'passes',
      width: 160,
      Cell: row => {
        return row.row.original.passes +" (" + row.row.original.passescompleted + ")"
      }
    },
    {
      Header: 'Precisión de Pases',
      accessor: 'passescompleted',
      Cell: row => {
        return isNaN(row.row.original.passescompleted/row.row.original.passes) ? '0%' : Math.round((row.row.original.passescompleted/row.row.original.passes)*100)+'%'
      },
      width: 150
    },
    {
      Header: 'Intercepciones',
      accessor: 'interceptions',
      width: 130
    },
    {
      Header: 'Atajadas (Sin Rebote)',
      accessor: 'savescaught',
      width: 180,
      Cell: row => {
        return row.row.original.saves +" (" + row.row.original.savescaught + ")"
      }
    },
    {
      Header: 'Faltas',
      accessor: 'fouls',
      width: 80
    },
    {
      Header: 'Tarjetas Amarillas',
      accessor: 'yellowcards',
      width: 150
    },
    {
      Header: 'Tarjetas Rojas',
      accessor: 'redcards',
      width: 130
    },
    {
      Header: 'Goles en Contra',
      accessor: 'owngoals',
      width: 130
    },
    {
      Header: 'Offsides',
      accessor: 'offsides',
      width: 80
    },
    {
      Header: 'Prom. Distancia Recorrida',
      accessor: 'distancecovered',
      width: 200,
      Cell: row => {
        return (Math.round(row.row.original.distancecovered)/1000)+ " km"
      }
    },
    {
      Header: 'Prom. Posesión',
      accessor: 'possession',
      width: 130,
      Cell: row => {
        return Math.round(row.row.original.possession)+ "%"
      }
    },
    {
      Header: 'Córners',
      accessor: 'corners',
      width: 80
    },
    {
      Header: 'Laterales',
      accessor: 'throwins',
      width: 90
    },
    {
      Header: 'Penales',
      accessor: 'penalties',
      width: 80
    },
    {
      Header: 'Tiros Libres',
      accessor: 'freekicks',
      width: 110
    },
    {
      Header: 'Tackles (Completados)',
      accessor: 'tacklescompleted',
      width: 180,
      Cell: row => {
        return row.row.original.tackles +" (" + row.row.original.tacklescompleted + ")"
      }
    },
    {
      Header: 'Faltas Sufridas',
      accessor: 'foulssuffered',
      width: 120
    },
    {
      Header: 'Saques de Arco',
      accessor: 'goalkicks',
      width: 130
    },
    {
      Header: 'Goles Recibidos',
      accessor: 'goalsconceded',
      width: 130
    },
  ], []);

  const data = useMemo(() => players, [players]);
  const tableInstance = useTable({ columns, data, initialState: { pageSize: 15 } }, useFilters, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    page,
    headerGroups,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    nextPage,
    previousPage,
    setFilter,
    state: { pageIndex, pageSize },
  } = tableInstance

  return (
    <>
      <h3>ESTADÍSTICAS INDIVIDUALES - {category.toUpperCase()}</h3>
      <div className='divDataTable' style={{
        borderRight: '1px solid var(--table-border-color)', 
        borderLeft: '1px solid var(--table-border-color)', 
        borderTop: '1px solid var(--table-border-color)',
      }}>
        <table {...getTableProps()} style={{borderCollapse: 'initial'}} className="dataTable">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th {...column.getHeaderProps()} 
                  style={column.Header === 'Jugador' ? {
                    position: 'sticky',
                    left: 0,
                    border: '0px',
                    borderBottom: '1px solid var(--table-border-color)',
                    borderRight: '1px solid var(--table-border-color)',
                    zIndex: 2
                  } : {
                    border: 0, 
                    borderBottom: '1px solid var(--table-border-color)', 
                    borderLeft: column.Header === 'Equipo' ? 0 : '1px solid var(--table-border-color)'
                  }}
                  key={index}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            <tr>
              <td style={{borderTop: 0, borderLeft: 0, position: 'sticky', left: 0, zIndex: 2}}>
                <input type='text' style={{textAlign: 'center', width: '21ch'}} onChange={e => setFilter('name', e.target.value)}></input>
              </td>
              <td style={{borderTop: 0, borderLeft: 0, borderRight: 0}}>
                <input type='text' style={{textAlign: 'center', width: '23ch'}} onChange={e => setFilter('team', e.target.value)}></input>
              </td>
              <td colSpan='23' style={{borderTop: 0, borderRight: 0}}></td>
            </tr>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell, index) => (
                    <td {...cell.getCellProps()}
                    style={cell.column.Header === 'Jugador' ? {
                      position: 'sticky',
                      left: 0,
                      border: 0,
                      borderBottom: '1px solid var(--table-border-color)',
                      borderRight: '1px solid var(--table-border-color)',
                      zIndex: 2
                    } : {
                      border: 0, 
                      borderLeft: cell.column.Header === 'Equipo' ? 0 : '1px solid var(--table-border-color)', 
                      borderBottom: '1px solid var(--table-border-color)',
                    }}
                    width={cell.column.Header === 'Equipo' ? '300px' : undefined}
                    key={index}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='pagination'>
        <button className='boton' disabled={!canPreviousPage} onClick={e => previousPage()} style={{margin: 0, marginRight: '10px'}}>Anterior</button>
        <div>Pagina {pageIndex + 1} de {Math.max(pageCount, 1)}</div>
        <button className='boton' disabled={!canNextPage} onClick={e => nextPage()} style={{margin: 0, marginLeft: '10px'}}>Siguiente</button>
      </div>
    </>
  )
}