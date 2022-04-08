import React, { Component } from 'react';
import '../App.css';
import { Hasil, ListCategories, Menus } from '../component';
import { API_URL } from '../utils/constants';
import axios from 'axios';
import swal from 'sweetalert';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menus: [],
      category: "Makanan",
      keranjangs: [],
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
    this.getKeranjang();
  }

  componentDidUpdate(prevState) {
    // console.log(this.state.keranjangs)
    // console.log(prevState.keranjangs)
    if (this.state.keranjangs !== prevState.keranjangs) {
      // this.getKeranjang();
    }
  }

  getKeranjang = () => {
    axios.get(API_URL + 'keranjangs')
      .then(res => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
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

    axios.get(API_URL + 'products?category.nama=' + value)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log("Terjadi error" + error);
      });
  }

  masukKeranjang = (value) => {
    axios.get(API_URL + 'keranjangs?product.id=' + value.id)
      .then(res => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value
          }
          axios.post(API_URL + 'keranjangs', keranjang)
            .then(res => {
              swal({
                title: "Sukses!",
                text: "masuk keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
              });
              this.getKeranjang();
            })
            .catch(error => {
              console.log("Terjadi error" + error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value
          }
          axios.put(API_URL + 'keranjangs/' + res.data[0].id, keranjang)
            .then(res => {
              swal({
                title: "Sukses!",
                text: "masuk keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1000,
              });
              this.getKeranjang();
            })
            .catch(error => {
              console.log("Terjadi error" + error);
            });
        }
      })
      .catch(error => {
        console.log("Terjadi error" + error);
      });
  }

  render() {
    const { menus, category, keranjangs } = this.state;
    return (
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
                masukKeranjang={this.masukKeranjang}
              />
            ))}
          </div>
        </div>
        <Hasil keranjangs={keranjangs} {...this.props} />
      </div>
    );
  }
}

export default Home;
