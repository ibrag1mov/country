import { useContext, useEffect, useRef, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Card } from "./Components/Card/Card";
import { Header } from "./Components/Header";
import { SingleCard } from "./Components/SingleCard/SingleCard";
import { ThemeContext } from "./context/ThemeContext";



function App() {

  let { theme } = useContext(ThemeContext);

  const elInput = useRef();
  const elSelect = useRef();
  

  const [country, setCountry] = useState({
    isLoading: false,
    data: [],
    isError: '',
  });

  useEffect(() => {
    setCountry({
      ...country,
      isLoading: true,
    });
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCountry({
            ...country,
            isLoading: false,
            data: data,
          });
        }
      })
      .catch((err) => {
        if (err) {
          setCountry({
            ...country,
            isLoading: false,
            data: [],
            isError: err.message,
          });
        }
      });
  }, []);

  const handleChange = () => {
    fetch('https://restcountries.com/v3.1/region/' + elSelect.current.value)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCountry({
            isLoading: false,
            data: data,
          });
        }
      })
      .catch((err) => {
        if (err) {
          setCountry({
            ...country,
            isLoading: false,
            data: [],
            isError: err.message,
          });
        }
      });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (elInput.current.value !== '') {
      fetch('https://restcountries.com/v3.1/name/' + elInput.current.value)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setCountry({
              isLoading: false,
              data: data,
            });
          }
        })
        .catch((err) => {
          setCountry({
            isLoading: false,
            data: [],
            isError: err.message,
          });
        });
    } else {
      fetch('https://restcountries.com/v3.1/all')
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setCountry({
              ...country,
              isLoading: false,
              data: data,
            });
          }
        })
        .catch((err) => {
          if (err) {
            setCountry({
              ...country,
              isLoading: false,
              data: [],
              isError: err.message,
            });
          }
        });
    }
  };


  return (
    <div className={theme == 'dark' ? 'App bg-dark bg-gradient text-white' : 'App bg-light text-dark'}>
      <Header/>

      <Routes>
        <Route
          path='/name/:name'
          element={<SingleCard />}
        />
        <Route
          path='/'
          element={
            <main>
              <section>
                {' '}
                <div className='container py-5'>
                  <form
                    onSubmit={handleSubmit}
                    className='mb-5 d-flex justify-content-between'
                  >
                    <input
                      type='text'
                      className={theme == 'dark' ? "w-25 form-control my-3 shadow bg-dark text-white" : "w-25 form-control my-3 shadow"}

                      placeholder='Search for a country…'
                      ref={elInput}
                    />
                    <select
                      ref={elSelect}
                      className={theme == 'dark' ? " form-select w-25 ms-auto my-3 shadow bg-dark text-white" : "form-select w-25 ms-auto my-3 shadow"}
                      aria-label='Default select example'
                      onChange={handleChange}
                    >
                      <option
                        disabled
                        selected
                        value='sortby'
                      >
                        Sort by region
                      </option>
                      <option value='Africa'>Africa</option>
                      <option value='America'>America</option>
                      <option value='Asia'>Asia</option>
                      <option value='Europe'>Europe</option>
                      <option value='Oceania'>Oceania</option>
                    </select>
                  </form>
                  {country.isLoading ? <h1>Loading...</h1> : ''}
                  {country.isError ? <h1>{country.isError}</h1> : ''}
                  {country.data.length ? (
                   <div className="d-flex flex-wrap gap-4 justify-content-center">
                     {country.data.map((el) => (
                         <Card obj={el} to={`/name/${el.name.common}`}/>
                     ))}
                   </div>
                    
                  ) : (
                    ''
                  )}
                </div>
              </section>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
