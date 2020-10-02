<template>
  <div class="container">

    <br />
    <router-view></router-view>
    <button
      type="submit"
      class="btn btn-primary"
      style="margin-right:0px; float:right"
      data-toggle="modal"
      data-target="#addProduct"
    >
      เพิ่มรายการสินค้า
    </button>
     <div
      class="btn-group btn-group-lg"
      role="group"
      aria-label="Basic example"
      
    >
      <router-link to="stock" type="button" class="btn btn-secondary"
        >Stock</router-link
      >
      <router-link to="account" type="button" class="btn btn-secondary"
        >Account</router-link
      >
    </div>
    <br /><br />
    <div
      class="modal fade bd-example-modal-lg"
      id="addProduct"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">เพิ่มรายการสินค้า</h5>
          </div>
          <table class="table table-striped md-3 text-center">
            <thead>
              <tr>
                <td>Name</td>
                <td>Detail</td>
                <td>Price $</td>
                <td>Quantity</td>
                <td>image</td>
              </tr>
              <td>
                <input type="text" class="form-control" v-model="name" />
              </td>
              <td>
                <input type="text" class="form-control" v-model="detail" />
              </td>
              <td>
                <input type="number" class="form-control" v-model="price" />
              </td>
              <td>
                <input type="number" class="form-control" v-model="quantity" />
              </td>
              <td>
                <form
                  action="/upload"
                  method="POST"
                  enctype="multipart/form-data"
                >
                  <input type="file" name="myImage" />
                  <button
                    type="submit"
                    class="btn"
                  >
                    Button
                  </button>
                </form>
              </td>
            </thead>
          </table>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="addProduct(index)"
            >
              เพิ่มข้อมูล
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              data-dismiss="modal"
              aria-label="Close"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-striped md-3 text-center">
      <thead>
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Detail</td>
          <td>Price $</td>
          <td>Quantity</td>
          <td>image</td>
          <td>Setting</td>
        </tr>
      </thead>
      <tbody id="productInfo">
        <tr v-for="(product, index) in $store.getters.product" :key="index">
          <td>{{ index + 1 }}</td>
          <td v-if="index !== editIndex">{{ product.productName }}</td>
          <td v-if="index !== editIndex">{{ product.productDetail }}</td>
          <td v-if="index !== editIndex">{{ product.productPrice }}</td>
          <td v-if="index !== editIndex">{{ product.productQuantity }}</td>
          <td v-if="index !== editIndex">{{ product.productImage }}</td>
          <td v-if="index !== editIndex">
            <button
              type="button"
              class="btn btn-danger mr-2"
              v-on:click="deleteProduct(index, product._id)"
            >
              ลบ
            </button>
            <button
              type="button"
              class="btn btn-warning"
              v-on:click="openEdit(index, product)"
            >
              แก้ไข
            </button>
          </td>

          <td v-if="index === editIndex">
            <input
              type="text"
              :value="product.productName"
              class="form-control"
              v-on:change="name = $event.target.value"
            />
          </td>
          <td v-if="index === editIndex">
            <input
              type="text"
              :value="product.productDetail"
              class="form-control"
              v-on:change="detail = $event.target.value"
            />
          </td>
          <td v-if="index === editIndex">
            <input
              type="number"
              :value="product.productPrice"
              class="form-control"
              v-on:change="price = $event.target.value"
            />
          </td>
          <td v-if="index === editIndex">
            <input
              type="number"
              :value="product.productQuantity"
              class="form-control"
              v-on:change="quantity = $event.target.value"
            />
          </td>
          <td v-if="index === editIndex">
            <form action="/upload" method="POST" enctype="multipart/form-data">
              <input
                v-on:change="image = $event.target.value"
                type="file"
                name="myImage"
              />
              <button type="submit" class="btn" data-src="">
              </button>
            </form>
          </td>
          <td v-if="index === editIndex">
            <button
              type="button"
              class="btn btn-success mr-2"
              v-on:click="editProduct(product._id)"
            >
              ยืนยัน
            </button>
            <br />
            <button
              type="button"
              class="btn btn-secondary"
              v-on:click="closeEdit(index)"
            >
              ยกเลิก
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editIndex: -1,
      name: "",
      detail: "",
      price: "",
      quantity: "",
      image: "",
    };
  },
  created() {
    this.fetchProduct();
  },
  methods: {
    fetchProduct() {
      this.$store.dispatch("fetchProduct");
    },
    deleteProduct(index, _id) {
      let payload = { index: index, _id: _id };
      this.$store.dispatch("deleteProduct", payload);
    },
    openEdit(index, product) {
      this.editIndex = index;
      this.name = product.productName;
      this.detail = product.productDetail;
      this.price = product.productPrice;
      this.quantity = product.productQuantity;
      this.image = product.productImage;
    },
    closeEdit(index) {
      (this.editIndex = index), (this.editIndex = -1);
      this.name = "";
      this.detail = "";
      this.price = "";
      this.quantity = "";
      this.image = "";
    },
    editProduct(_id) {
      let payload = {
        index: this.editIndex,
        _id: _id,
        productName: this.name,
        productDetail: this.detail,
        productPrice: this.price,
        productQuantity: this.quantity,
        productImage: this.image,
      };
      this.$store.dispatch("editProduct", payload).then(this.closeEdit());
    },
    addProduct(index) {
      let payload = {
        index: index + 1,
        productName: this.name,
        productDetail: this.detail,
        productPrice: this.price,
        productQuantity: this.quantity,
        productImage: this.image,
      };
      this.$store.dispatch("addProduct", payload).then(this.closeEdit());
    },
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>

<style>
.modal {
  text-align: center;
}

@media screen and (min-width: 768px) {
  .modal:before {
    display: inline-block;
    vertical-align: middle;
    content: " ";
    height: 100%;
  }
}

.modal-dialog {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}
</style>
