import { FillableStar } from '@/components/shared/svg/icons';
import React from 'react'

interface Props {
    rating: number;
}

const FIVE = [1, 2, 3, 4, 5];

const getFillPercentage = (rating: number, starPos: number) => {
    if ((starPos > rating ) && (rating > starPos - 1))
        return (rating - (starPos - 1)) * 100;
    if (starPos > rating) return 0;
    return 100;
}

const Ratings: React.FC<Props> = ({ rating }) => {
  return (
    <div className="flex gap-2 items-center">
        {
            FIVE.map(num => <FillableStar key={num} color='#ffe234' dimensions={{ width: 25}} fillPercentage={getFillPercentage(rating, num)} id={num}/>)
        }
        <p className='text-xl font-medium'>{ rating }</p>
    </div>
  )
}

export default Ratings