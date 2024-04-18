import { useData } from '../Context/DataContext'
import SaleItem from '../Components/SaleItem'

const Vendas = () => {
  const { data } = useData()
  if (data === null) return null
  return (
    <ul>{data.map(sale => (
      <li key={sale.id}>
        <SaleItem sale={sale} />
      </li>
    ))}</ul>
  )
}

export default Vendas