import React, { Fragment } from 'react'
import * as ReactBootstrap from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const { Container, Row, Col } = ReactBootstrap

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      movies: [],
      filteredMovies: [],
      userInput: ''
    }
  }

  async componentDidMount(){
    let movies

    try {
      const response = await fetch('/items')
      movies = await response.json()
      this.setState({
        movies,
        filteredMovies: movies
      })
    } catch (error_message){
      console.error(`there was an error fetching the initial movies from the db ${error_message}`)
    }
  }

  handleUserInputUpdate = event => {
    const userInput = event.target.value
    this.setState({
      userInput,
      filteredMovies: this.state.movies.filter(({ title }) => searchFilter({ title, userInput }))
    })
  }

  render(){    
    return (
      <Container>
        <Row>
          <Col md={{ offset: 3, span: 6 }}>
            <SearchBar movies={this.state.filteredMovies} userInput={this.state.userInput} userInputUpdate={this.handleUserInputUpdate}/>
            <MovieCard movies={this.state.filteredMovies} userInput={this.state.userInput} />
          </Col>
        </Row>
      </Container>
    )
  }
}

const SearchBar = ({ movies, userInput, userInputUpdate }) => {
  const { InputGroup, FormControl, Form } = ReactBootstrap

  return(
    <React.Fragment>
      <InputGroup size="sm" className="">
        <InputGroup.Text>movie title</InputGroup.Text>
        <Form.Control
          value={userInput} 
          onChange={userInputUpdate} 
        />
      </InputGroup>
      <Form.Text muted>
        Displaying {Object.keys(movies).length} results
      </Form.Text>
      <br />
      <br />
    </React.Fragment>
  )
}

function MovieCard({ movies, userInput }){

  if (Object.keys(movies).length === 0) return 'Loading...'

  return (
    <React.Fragment>
      {movies.
        map(movie => (
        <MovieDisplay
          movie={movie}
          key={movie.id}
        />
      ))}
    </React.Fragment>
  )
}

const searchFilter = ({ title, userInput }) => {
  if (!userInput) return true
  return title.toLowerCase().includes(userInput.toLowerCase())
}

function MovieDisplay({ movie }){
  const { Container, Row, Col } = ReactBootstrap

  return (
    <Container fluid >
      <Row>
        <Col xs={1} className="text-center">
        </Col>
        <Col xs={10} className="name">
          {movie.title} <text style={{ color: 'red' }}>{movie.score}</text>
        </Col>
        <Col sx={1} className="text-center remove">
        </Col>
      </Row>
    </Container>
  )
}

export default App;
