import React, { useEffect, useState } from 'react'
import './App.css';
const App = () => {

  const [fetchData, setFetchData] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("billGates");
  const [repo, setRepo] = useState([])


  useEffect(() => {
    get_git_data();


  }, [query])
  const get_git_data = async () => {
    const response = await fetch
      (`https://api.github.com/users/${query}`);
    
    const data = await response.json();
    setFetchData(data);
    getRepo(query)


  };
  const getRepo = async () => {
    const getRepoData = await fetch(`https://api.github.com/users/${query}/repos`)
    const resData = await getRepoData.json()
    setRepo(resData)
  }

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  function getSearch(e) {
    e.preventDefault();
    setQuery(search);

    setSearch("");

  }

  return (
    <div className="App">
      <form className="search-form " onSubmit={getSearch} >
        <input className="input-field" type="search" placeholder="Search Name..."  value={search}
          onChange={updateSearch} />
        <button className="search-button" type="submit" >
          Search
        </button>
      </form>

      <div className='container '>
        <div style={{color: "red" ,}}>
          <div className='col-12  '>
            <div>
              <img src={fetchData.avatar_url} width="150px"   alt="image" />
              <div>
                <h2>{fetchData.login}</h2>
                <a href={fetchData.html_url}>{fetchData.html_url}</a>
                <p>{fetchData.id} </p>

              </div>
            </div>
            <div className='flex '>
              <div className='follow' >
                <h3>follow</h3>
                <h3>{fetchData.following}</h3>
              </div>
              <div className='follow' >
                <h3>follower</h3>
                <h3>{fetchData.followers}</h3>
              </div>
              <div className='follow' >
                <h3>repo</h3>
                <h3>{fetchData.public_repos}</h3>
              </div>
            </div>
          </div>
          <div >
            <h1>Repository Get here</h1>
            {
               
               repo.map((e)=>{
                return(
                  <div key={e.name}>
                 
                    <a href={e.html_url} target="_blank">{e.name}</a>
                 
                  </div>
                )
               })
             
            }
          
         

          </div>


        </div>

      </div>


    </div>


  )




}

export default App;