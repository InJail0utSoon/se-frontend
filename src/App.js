import './App.css';
import {useState} from 'react'

function App() {
	let [state, setState] = useState({'page':'search-page', 'query':'', 'res':[]})
	console.log("yo new state -> ", state)
	const search = (query) => {
		fetch("http://localhost:8000/mock_search/"+query)
		.then(res => res.json())
		.then(data => setState(state => ({...state, 'page':'res-page', 'res':data})))
	}

	if(state['page'] === "search-page") {
		return (
			<div class="search-bar">
				<form onSubmit={
					e => {
						e.preventDefault()
						search(state['query'])
					}
				}>
					<input value={state['query']} type="text" onChange={e => setState(state => ({...state, 'query':e.target.value}))} />
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
						<input value={state['query']} type="text" onChange={e => setState(state => ({...state, 'query':e.target.value}))} />
						<button type="submit" value="Submit" >
							Search
						</button>
					</form>
				</div>
				<div>
					{state['res'].map(elem => 
						(<div>
							<div>{elem.url}</div>
							<div>{elem.content}</div>
						</div>))
					}
				</div>
			</div>
		)
	}
}

export default App;
