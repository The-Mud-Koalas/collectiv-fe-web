import { COLORS } from '@/utils/constants/colors';
import React from 'react';
import { BeatLoader } from 'react-spinners';

const Loader: React.FC = () => {
  return (
    <BeatLoader color={COLORS.primary[800]}/>
  )
}

export default Loader