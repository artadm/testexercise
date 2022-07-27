import React, { useEffect, useState } from 'react'
import OrdersService from '../../api/OrdersService'
import { UseSearch } from '../../hooks/useSearch'
import { IOrder } from '../../modals/IOrder'
import { getPageCount } from '../../utils/pages'
import MySearch from '../MySearch/MySearch'
import Pagination from '../pagination/Pagination'
import MySelect from '../select/MySelect'
import './List.scss'

const List = () => {
    const [orders, setOrders] = useState<IOrder[]>([])
    const [code, setCode] = useState(String)
    const [pages, setPage] = useState(1)
    const [params, setParams] = useState(String)
    const [numParams, setNumParams] = useState(String)
    const [allparams, setAllparams] = useState({ value: params, enums: numParams })
    const sortedSearch = UseSearch(orders, code, allparams)
    const [totalPages, setTotalPages] = useState(Number);
    const selectsort = [
        { name: 'researchId', value: 'researchId' },
        { name: 'price', value: 'price' },
    ]
    const fetchOrders = async (page: number) => {
        const response = await OrdersService.getAll(page)
        setOrders(response.dataObjects)
        setTotalPages(getPageCount(response.count, 20))
    }

    useEffect(() => {
        fetchOrders(pages)

    }, [code, pages, allparams])


    const changePage = (page: number) => {
        setPage(page)
    }

    const changeParams = () => {
        setAllparams({ value: params, enums: numParams })
    }


    return (
        <main className='list__container container'>
            <div className="list__inner">
                <MySearch code={code} setCode={setCode} placeholder='Впишите код заказа' ></MySearch>
                <MySelect defaultValue={'Выбрать сортировку по типу'} value={params} onChange={setParams} options={selectsort}></MySelect>
                <MySelect defaultValue={'Выбрать сортировку по возрастанию/убыванию'} value={numParams} onChange={setNumParams} options={[
                    { value: 'asc', name: 'возрастание' },
                    { value: 'desc', name: 'убывание' }
                ]}></MySelect>
                <button className='list__button' onClick={() => changeParams()}>Поиск</button>
                {sortedSearch.length != 0 ?
                    <>
                        <ul className="list">
                            <div className="list__headers">
                                <div className="list__item-code">Код</div>
                                <div className="list__item-name">Исследование</div>
                                <div className="list__item-material">Биомат.</div>
                                <div className="list__itemservice">Тип усл.</div>
                            </div>
                            {sortedSearch.map((el: IOrder) =>
                                <li key={el.code} className="list__item">
                                    <div className="list__item-code">{el.code}</div>
                                    <div className="list__item-name">{el.name}</div>
                                    <div className="list__item-material">{el.biomaterialName}</div>
                                    <div className="list__itemservice">Исс.</div>
                                </li>
                            )}
                        </ul>
                        <Pagination
                            page={pages}
                            changePage={changePage}
                            totalPages={totalPages}
                        />
                    </>
                    : <h1>Нет совпадений!</h1>
                }
            </div>
        </main>
    )
}

export default List