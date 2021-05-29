import './App.css';
import {useState} from 'react'

function App() {
	let [state, setState] = useState({'page':'search-page', 'query':'', 'res':[]})
	console.log("rendering :: ", state)
	
	const search = (query) => {
		fetch("http://localhost:8000/search/"+query)
		.then(res => res.json())
		.then(data => setState(prevState => ({...prevState, 'page':'res-page', 'res':data})))
		.catch(err => alert(err))
	}

	const updateSearchBar = (e) => setState(prevState => ({...prevState, 'query':e.target.value}))

	if(state['page'] === "search-page") {
		return (
			<div class="search-bar">
				<form onSubmit={
					e => {
						e.preventDefault()
						search(state['query'])
					}
				}>
					<input value={state['query']} type="text" onChange={updateSearchBar} />
					<button type="submit" value="Submit" >
						Search
					</button>
				</form>
			</div>
		)
	}

	else
	{
		return (
			<div>
				<div class="search-bar">
					<form onSubmit={
						e => {
							e.preventDefault()
							search(state['query'])
						}
					}>
						<input value={state['query']} type="text" onChange={updateSearchBar} />
						<button type="submit" value="Submit" >
							Search
						</button>
					</form>
				</div>
				<div>
					{
						state['res'].map(elem => 
							(<div>
								<a href={elem.url}>{elem.url}</a>
								<div>{elem.content}</div>
								<div>
									<div>{elem.timestamp}</div>
									<div>{elem.score}</div>
								</div>
							</div>))
					}
				</div>
			</div>
		)
	}
}

export default App;
