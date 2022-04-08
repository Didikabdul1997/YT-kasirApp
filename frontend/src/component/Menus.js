import React from 'react'
import { numberWithCommas } from '../utils/utils';

function Menus({ menu, masukKeranjang }) {
  return (
    <>
      <div className='col-md-3 col-6 col-xs-12'>
        <div className="card w-100 mb-4 shadow" onClick={() => masukKeranjang(menu)}>
          <img src={'/images/' + menu.category.nama.toLowerCase() + '/' + menu.gambar} className="card-img-top" alt="..." />
          <div className="card-body">
            <h6 className="card-title">{menu.nama} <strong>({menu.kode})</strong></h6>
            <p className="card-text">Rp. {numberWithCommas(menu.harga)}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Menus