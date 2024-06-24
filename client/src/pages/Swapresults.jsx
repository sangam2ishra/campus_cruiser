/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */

import CardList from '../components/CardList';

import { useLocation, useParams } from 'react-router-dom';

const SwapResults = () => {
  const { pnrNumber } = useParams();
  console.log({pnrNumber});
    console.log("hii");
  const location = useLocation();
  const { results } = location.state;
  const travels=results;

  // Check if travels is undefined or not an array
  if (!travels || !Array.isArray(travels)) {
    return <div>No travels found</div>; // Or you can render an error message
  }

  return (
    <div className=''>
    <div className='flex flex-row flex-wrap '>
      {travels.map((travel, index) => (
        // <CardList key={index} travel={travel} type="SwapResults" />
        <div className=' mt-5 gap-4  m p-3 mx-auto'>
        <CardList key={index} travel={travel} pnr={pnrNumber}/>
        </div>
      ))}
    </div>
    </div>
  );
}

export default SwapResults;
