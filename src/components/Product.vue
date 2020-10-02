<template>
  <div class="row"  style="margin:10px; padding:10px">
    
      <div
        v-for="(product, index) in $store.getters.product"
        :key="index"
        class="card col-md-4 col-sm-12 col-lg-4"
        style="width: 18rem;"
      >
        <img class="card-img-top" src="../assets/images/iphone11.jpg" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">{{ product.productName }}</h5>
          <p class="card-text">{{ product.productDetail }}</p>
          <div class="card-footer">
            <p class="card-text">{{ product.productPrice }} $</p>
          </div>
          <a href="" class="btn btn-primary">Add to cart</a>
        </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      detail: "",
      price: "",
    };
  },
  created() {
    this.fetchProduct();
  },
  methods: {
    fetchProduct() {
      this.$store.dispatch("fetchProduct");
    },
  },
};
</script>

<style>
</style>
