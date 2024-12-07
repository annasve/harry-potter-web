import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Character from './types/Attributes';

import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';

interface ApiResponse {
  data: Character[];
  links: {
    current: string;
    last?: string;
    next?: string;
    self: string;
  };
  meta: {
    copyright: string;
    generated_at: string;
    pagination: {
      current: number;
      last?: number;
      next?: number;
      record: number;
    };
  };
}

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  //Retrieve all characters for one Catalog page
  useEffect(() => {
    const pageSize: number = 25; //TODO L8ER: let user choose from 3 pageSizes
    const fetchData = async () => {
      const url = `https://api.potterdb.com/v1/characters?page[size]=${pageSize}&page[number]=${pageNumber}`;

      //Try-catch block
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const res = (await response.json()) as ApiResponse;
        const data: Character[] = res.data;

        //(last page of API results has a specific data[] length and no meta.pagination.last property)
        let lastPage = false;
        if (res.meta.pagination.last === undefined) {
          lastPage = true;
          setTotalPages(res.meta.pagination.current);
        } else {
          setTotalPages(res.meta.pagination.last);
        }

        //Build an array with information for all characters (1 item = info for one character)
        const charactersArray: Character[] = [];
        if (data) {
          for (
            let index = 0;
            index < (lastPage ? data.length : pageSize);
            index++
          ) {
            const itemInfo = data[index] || {};
            charactersArray.push(itemInfo);
          }
        }
        setCharacters(charactersArray);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [pageNumber]);

  //Move between pages
  const handlePagination = (num: number) => {
    setPageNumber((prevPageNumber) => prevPageNumber + num);
  };

  return (
    <BrowserRouter>
      <div id="app-wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                totalPages={totalPages}
                handlePagination={handlePagination}
                pageNumber={pageNumber}
                attributes={characters}
              />
            }
          />
          <Route path="/character/:id" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
