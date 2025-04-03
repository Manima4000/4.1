import { FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { CardHorizontalFood } from './food';


export interface foodProps{
  id: string;
  name: string;
  price: number;
  time: string;
  delivery: string;
  rating: number;
  image: string;
  restaurantId: string;
}

export default function TrendingFoods() {
  const [foods,setFoods] = useState<foodProps[]>([]);

  useEffect(() => {
    async function getFoods(){
      const response = await fetch("http://172.15.1.169:3000/foods")
      const data = await response.json();
      setFoods(data); 
    }

    getFoods();
  })



 return (
  <FlatList
    data={foods}
    renderItem={({item}) => <CardHorizontalFood food={item}/>}
    horizontal = {true}
    contentContainerStyle={{gap: 14, paddingLeft: 16, paddingRight: 16}}
    showsHorizontalScrollIndicator={false}
  />
 );
}