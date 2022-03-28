import axios from 'axios';
import React, { Component } from 'react';
import { API_URL } from '../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons';

const Icon = ({ nama }) => {
  if (nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="me-2" />
  if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} className="me-2" />
  if (nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="me-2" />
  return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
}

class ListCategories extends Component {

  constructor(props) {
    super(props)

    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    axios.get(API_URL + 'categories')
      .then(res => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch(error => {
        console.log("Terjadi error" + error);
      });
  }

  render() {
    const { categories } = this.state;
    const { categoryDipilih, changeCategory } = this.props;
    return (
      <div className="col-md-2 mt-2">
        <h4><strong>Daftar Kategori</strong></h4>
        <hr />
        <ul className="list-group">
          {categories && categories.map((category) => (
            <li className={categoryDipilih === category.nama ? 'list-group-item category-aktif' : 'list-group-item '} key={category.id} onClick={() => changeCategory(category.nama)} style={{ cursor: 'pointer' }}>
              <h5 className='my-1'><Icon nama={category.nama} /> {category.nama}</h5>
            </li>
          ))}
        </ul >
      </div >
    );
  }
}

export default ListCategories;