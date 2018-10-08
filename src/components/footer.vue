<template>
  <div class="footer">
    <p>小凶许!大脑斧!梅发怒!小福泥!小海疼!发福蝶!大鸡居!大飞囊!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted: function() {},
  methods: {},
  created() {
    $(function() {
      footerAuto();
    });
    function footerAuto() {
      var _wh = $(window).height();
      var _dh = $(document).height();
      var _bh = $(document.body).height();
      if (_bh < _wh) {
        $(".el-footer").css({
          position: "fixed",
          bottom: "0",
          left: "0"
        });
      } else {
        $(".el-footer").css({
          position: "static",
          bottom: "auto",
          left: "auto"
        });
      }
    }
  }
};
</script>
<style lang="less">
// div.footer {
//   margin: 0 auto;
//   height: 40px;
//   width: 100%;
//   p {
//     position: absolute;
//     top: 50%;
//     margin-top: -20px;
//   }
// }
</style>

