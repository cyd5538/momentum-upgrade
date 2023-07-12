import { useState, useEffect } from 'react';
import axios from 'axios';
import { Quote } from '@/types/type';

const NavLifeQuotes = () => {
  const [data, setData] = useState<Quote[] | null>(null);
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const [resize, setResize] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Quote[]>('/LifeQuotes.json');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching JSON:', error);
      }
    };
   
    // fetchData() 
    // Promises must be awaited, end with a call to .catch, end with a call to 
    // .then with a rejection handler or be explicitly marked as ignored with the `void` operator.
    fetchData().catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    if (data) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const quote = data[randomIndex];
      setRandomQuote(quote);
    }
  }, [data]);

  return (
    <div className={`text-white dark:bg-zinc-900 
    ${resize ?`w-3/4 p2 lg:w-[500px] bg-violet-500 opacity-90 ease-linear` : `duration-200 w-12 h-12 ease-linear bg-violet-500`} z-10 p-2 shadow-xl rounded-xl absolute left-2`}>
      <div className='relative'>
        {resize ? 
        <>
          {randomQuote && (
            <div className='flex flex-col p-4 gap-4'>
              <h1 className='text-xl font-bold underline underline-offset-2'>{randomQuote.author}</h1>
              <p>{randomQuote.message}</p>
            </div>
          )}
          <div 
          className='absolute right-4 bottom-[1px] cursor-pointer text-sm'
          onClick={() => setResize(!resize)}
          >
            창 줄이기
          </div>
        </>
        :           
        <div 
        className='cursor-pointer flex justify-center items-center mt-1'
        onClick={() => setResize(!resize)}
        >
          명언
        </div> 
      }
      </div>
    </div>
  );
}

export default NavLifeQuotes;
