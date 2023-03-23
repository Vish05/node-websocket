interface CardProps {
  points: string
}

const Card = ({ points }: CardProps) => {
  return <div>{points}</div>
}

export default Card
