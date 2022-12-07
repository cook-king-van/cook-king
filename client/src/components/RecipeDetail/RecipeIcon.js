import React , {useState} from 'react';
import { Icon } from '@mui/material';
import '../../components/RecipeDetail/RecipeDetail.css'
const RecipeIcon = () => {
  const [size, setSize] = useState('2');
  const [time, setTime] = useState('10-15');
  const [like, setLike] = useState('13,500');
  return (
    <div className='Step-Icon'>
      <div className='Step-container'>
        <Icon fontSize='large'>person</Icon>
        <text className='Step-container'>{size}PEOPLE</text>
      </div>
      <div className='Step-container'>
        <Icon fontSize='large'>timer</Icon>
        <text className='Step-text'>{time}MIN</text>
      </div>
      <div className='Step-container'>
        <Icon fontSize='large'>favorite</Icon>
        <text className='Step-text'>{like}</text>
      </div>
    </div>
  );
};

export default RecipeIcon;
