import React, { Component } from 'react';
import { numberWithCommas } from '../utils/utils';
import TotalBayar from './TotalBayar';

class Hasil extends Component {
  render() {
    const { keranjangs } = this.props
    return (
      <div className="col-md-3 mt-2">
        <h4><strong>Daftar Kategori</strong></h4>
        <hr />
        <ul className="list-group">
          {keranjangs && keranjangs.map((keranjang) => (
            <li className="list-group-item" key={keranjang.id}>
              <div className="row">
                <div className="col-sm-2">
                  <div className="badge bg-success">
                    {keranjang.jumlah}
                  </div>
                </div>
                <div className="col text-start">
                  <h5>{keranjang.product.nama}</h5>
                  <p>Rp. {numberWithCommas(keranjang.product.harga)}</p>
                </div>
                <div className="col">
                  <strong className='float-end'>Rp. {numberWithCommas(keranjang.total_harga)}</strong>
                </div>
              </div>
            </li>
          ))}
          <TotalBayar keranjang={keranjangs} {...this.props} />
        </ul>
      </div>
    );
  }
}

export default Hasil;