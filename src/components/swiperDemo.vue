<template>
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" :key="banner" v-for="banner in banners">
        <img :src="'/img'+banner">
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        banners: [ '/1.jpg', '/2.jpg', '/3.jpg', '/4.jpg', '/5.jpg' ],
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
          loop:true,
          autoplay: true,
          effect : 'coverflow',
          slidesPerView: 2,
          centeredSlides: true,
          coverflowEffect:{
            rotate:40,
            stretch: 0,
            depth: 0,
            modifier: 1
          }
        }
      }
    },
    mounted() {
      console.log('Current Swiper instance object', this.mySwiper)
      this.mySwiper.slideTo(3, 1000, false)
    }
  }
</script>
<style scoped>
img{
  width: 100%;  
}
</style>