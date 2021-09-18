import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    CurrentPage: 1,
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handlePageChange = (page) => {
    this.setState({ CurrentPage: page });
  };
  render() {
    if (this.state.movies.length === 0)
      return <p>There are no movies in the database.</p>;

    const movies = paginate(
      this.state.movies,
      this.state.CurrentPage,
      this.state.pageSize
    );
    return (
      <React.Fragment>
        <p>Showing {this.state.movies.length} moives in the database.</p>
        <table className="table table-striped table-hover">
          <caption>List of Movies</caption>
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id} className="table-info">
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={this.state.movies.length}
          pageSize={this.state.pageSize}
          CurrentPage={this.state.CurrentPage}
          OnPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
