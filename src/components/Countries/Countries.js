import React, { Component } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import "./Countries.css";

const url = "https://restcountries.eu/rest/v2/all";

class Countries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: [],
      selected: [],
    };

    this.getApi = this.getApi.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getApi();
  }

  getApi() {
    axios.get(url).then((response) => {
      const countries = response.data;
      console.log(countries);
      this.setState({ countries });
      this.setState({ selected: countries[104] });
    });
  }

  handleChange = (event, value) => {
    this.setState({ selected: value });
  };

  population = (number) => {
    const num = parseInt(number);
    const str = num.toLocaleString("en-US");
    return str;
  };

  render() {
    return (
      <div>
        <Container maxWidth='sm' className='container'>
          <div className='auto'>
            <Autocomplete
              id='box'
              options={this.state.countries}
              getOptionLabel={(option) => option.name}
              onChange={this.handleChange}
              disableClearable
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Select Country'
                  variant='outlined'
                />
              )}
            />
          </div>

          <h2>{this.state.selected.name}</h2>
          <div id='details'>
            <img src={this.state.selected.flag} alt='flag' />
            <p>
              Capital: <span>{this.state.selected.capital}</span>
            </p>
            <p>
              Population:{" "}
              <span>{this.population(this.state.selected.population)}</span>
            </p>
            <p>
              Region: <span>{this.state.selected.region}</span>
            </p>
            <p>
              Sub-Region: <span>{this.state.selected.subregion}</span>
            </p>
            <p>
              Demonym: <span>{this.state.selected.demonym}</span>
            </p>
          </div>
        </Container>
      </div>
    );
  }
}

export default Countries;
