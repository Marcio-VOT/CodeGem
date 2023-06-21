import { TiStarFullOutline, TiStarHalf } from 'react-icons/ti'
export function StarDisplay({
  grade,
  corner,
}: {
  grade?: number
  corner?: boolean
}) {
  const fullStar = <TiStarFullOutline size={50} color="white" />
  const halfFullStar = <TiStarHalf size={50} color="white" />
  const emptyStar = <TiStarFullOutline size={50} color="#8C8C8C" />
  return (
    <>
      <div className="flex">
        {fullStar}
        {halfFullStar}
        {emptyStar}
      </div>
    </>
  )
}
