import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Hasil, ListCategories, Menus, NavbarComponent } from './component';
import { API_URL } from './utils/constants';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menus: [],
      category: "Makanan"
    }
  }

  componentDidMount() {
    axios.get(API_URL + 'products?category.nama=' + this.state.category)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log("Terjadi error" + error);
      });
  }

  changeCategory = (value) => {
    this.setState({
      category: value,
      menus: []
    })

    axios.get(API_URL + 'products?category.nama=' + this.state.category)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log("Terjadi error" + error);
      });
  }

  render() {
    const { menus, category } = this.state;
    return (
      <div className="App">
        <NavbarComponent />
        <div className="row mt-3">
          <ListCategories changeCategory={this.changeCategory} categoryDipilih={category} />
          <div className="col-md-7 mt-2">
            <h4><strong>Daftar Produk</strong></h4>
            <hr />
            <div className="row mx-2">
              {menus && menus.map((menu) => (
                <Menus
                  key={menu.id}
                  menu={menu}
                />
              ))}
            </div>
          </div>
          <Hasil />
        </div>
      </div>
    );
  }
}

export default App;
