import { Card, Badge } from 'antd'
import Link from 'next/link'
const { Meta } = Card
import currencyFormatter from '../../utils/helpers'
const CourseCard = ({ course }) => {
  const { name, instructor, price, image, slug, paid, category } = course
  return (
    <Link href={`/course/${slug}`}>
      <a>
        <Card
          className="mb-4 shadow bg-light"
          cover={
            <img
              src={image.Location}
              alt={name}
              style={{ height: '250px', objectFit: 'contain' }}
            />
          }
        >
          <h2 className="font-weight-bold">{name}</h2>
          <p>講師名 {instructor.name}</p>
          <Badge count={category} className="pb-2 mr-2" />
          <h4 className="pt-2">
            {paid
              ? currencyFormatter({ amount: price, currency: 'jpy' })
              : 'Free'}
          </h4>
        </Card>
      </a>
    </Link>
  )
}

export default CourseCard
