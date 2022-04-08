import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react';
import { API_URL } from '../utils/constants';
import { numberWithCommas } from '../utils/utils';

class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjang
    }
    axios.post(API_URL + 'pesanans', pesanan).then((res) => {
      this.props.history.push('/sukses')
    })
  }
  render() {
    const totalBayar = this.props.keranjang.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);

    return (
      <div className='fixed-bottom'>
        <div className="row">
          <div className="col-md-3 offset-9">
            <ul className="list-group">
              <li className="list-group-item text-start pt-3">
                <h4>Total Harga : <strong className="float-end me-2">Rp. {numberWithCommas(totalBayar)}</strong></h4>
                <div className="d-grid gap-2 my-2">
                  <button className="btn btn-primary btn-block btn-lg" onClick={() => this.submitTotalBayar(totalBayar)}><FontAwesomeIcon icon={faShoppingCart} /> Bayar</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TotalBayar;