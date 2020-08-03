<template>
  <transition name="fade">
    <div class="ivContainer" v-if="visible" @keyup="close">
      <button class="ivCloseBtn" @click="close">×</button>
      <img class="ivImg" :src="url" @error="imgOnError" />
    </div>
  </transition>
</template>

<script>
import ImgBase64 from "./assets/imgError"

export default {
  name: "app",
  data() {
    return {
      visible: false,
      url: "",
    };
  },
  methods: {
    close() {
      // if (this.$refs.fade) {
      //   this.$refs.fade.addEventListener("transitionend", function () {
      //     console.log("css动画结束");
      //     // todo
      //   });
      // }
      this.visible = false;
      document.removeEventListener("keyup", this.keyClose);
      // console.log("执行了关闭");
      if (typeof this.onClose === "function") {
        this.$nextTick(() => {
          //动画执行完毕后删除dom,v-if只能删除这个组件内的，挂载的实际上还存在，所以要删掉，不然会显示=>   <!---->
          this.onClose();
        });
      }
    },
    keyClose(e) {
      //监听esc
      if (e.keyCode == 27) {
        this.close();
      }
    },
    imgOnError() {
      // console.log("图片错误");
      this.url = ImgBase64;
      // console.log(this.url);
    },
  },
  mounted() {
    document.addEventListener("keyup", this.keyClose);
    // console.log("执行了监听");
  },
};
</script>

<style>
html,
body,
#vue-picture-viewer {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.ivContainer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 19950111;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 0.35s;
}
.ivCloseBtn {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  opacity: 0.8;
  font-size: 3em;
  padding: 0 0.3em;
  color: #fff;
  background: transparent;
  border: 0;
  text-shadow: 0 0 2px #000;
  cursor: pointer;
  outline: none;
}
.ivCloseBtn:hover {
  opacity: 1;
}
.ivImg {
  position: absolute;
  max-height: 90%;
  max-width: 90%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  /* transform: scale(0); */
  opacity: 0;
}
</style>
