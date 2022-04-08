import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils/constants';

class Sukses extends Component {

  componentDidMount() {
    axios.get(API_URL + 'keranjangs')
      .then(res => {
        const keranjangs = res.data;
        keranjangs.map(function (item) {
          return axios
            .delete(API_URL + 'keranjangs/' + item.id)
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
            })
        })
      })
      .catch(error => {
        console.log("Terjadi error" + error);
      });
  }

  render() {
    return (
      <div className='mt-4'>
        <img src="images/sukses.svg" alt="" width="300" className='my-5' />
        <h2>Sukses</h2>
        <p>Terimakasih sudah memesan!</p>
        <Link to="/" className="btn btn-primary">Kembali</Link>
      </div>
    );
  }
}

export default Sukses;