<template>
  <section class="hero is-bold app-navbar">

    <div class="hero-head">

      <div class="nav-load-file-area">
        <b-field class="nav-load-file-b-field">
          <b-upload v-model="files" @change.native="fileUploaded">
            <a class="button nav-load-file-button">
              <img src="/static/images/icons/img-nor-over-open-dicom.svg">
              <span>Load Dicom 01</span>
            </a>
          </b-upload>
        </b-field>

        <span class="nav-load-file-label">
          <template v-if="files && files.length">
            <span
              class="file-name-span"
              :style="focusedCanvas && focusedCanvas.id === 'layout-left' ? 'color: white' : 'color: gray'"
            >&nbsp; | &nbsp;Dicom : {{ files[0].name }}</span>
          </template>
          <template v-if="focusedCanvas && focusedCanvas.id === 'layout-left'"><span class="canvas-selected">&nbsp; (*)</span></template>
        </span>
      </div>

      <div class="nav-load-file-area-2">
        <div class="nav-load-file-field-area-2">
          <b-field class="nav-load-file-b-field-2">
            <b-upload v-model="files2" @change.native="fileUploaded2">
              <a class="button nav-load-file-button-2">
                <img src="/static/images/icons/img-nor-over-open-dicom.svg">
                <span>Load Dicom 02</span>
              </a>
            </b-upload>
          </b-field>
        </div>

        <span class="nav-load-file-label-2">
          <template v-if="files2 && files2.length">
            <span
              class="file-name-span"
              :style="focusedCanvas && focusedCanvas.id === 'layout-right' ? 'color: white' : 'color: gray'"
            >&nbsp; | &nbsp;Dicom : {{ files2[0].name }}</span>
          </template>
          <template v-if="focusedCanvas && focusedCanvas.id === 'layout-right'"><span class="canvas-selected">&nbsp; (*)</span></template>
        </span>
      </div>

      <!--<b-field style="position: fixed; left: 260px; top: 0; height: 52px; width: 250px; z-index: 1025;">-->
      <!--<b-upload v-model="files" accept=".zip" @change.native="loadSegmetation">-->
      <!--<a class="button is-white" style="width: 100%; height: 100%;">-->
      <!--<img src="/static/sample/imgs/folder_open.png" style="width: 24px; height: 24px; top: 0; left: 0;">-->
      <!--&nbsp;<span>Load Segmentation</span>-->
      <!--</a>-->
      <!--</b-upload>-->
      <!--</b-field>-->

      <nav class="nav">
        <div class="nav-left">
          <img src="/static/images/logos/img-logo-vuno.svg">
          <!--<router-link @click.native="logoClicked" to="/" class="nav-item hero-brand" style="cursor: none">-->
          <!--<a style="height: 40px">-->
          <!--<img src="/static/images/logos/img-logo-vuno.svg">-->
          <!--</a>-->
          <!--</router-link>-->
        </div>

        <!--<div class="nav-right">-->
        <!--<a class="button nav-help-button">-->
        <!--Help-->
        <!--</a>-->
        <!--</div>-->
      </nav>

    </div>
  </section>
</template>

<script>
  import {mapState} from 'vuex'
  import * as mutationType from '@/store/mutation-types'
  import * as busType from '@/util/bus/bus-types'

  export default {
    name: 'AppHeader',
    computed: {
      ...mapState([
        'focusedCanvas'
      ])
    },
    data () {
      return {
        files: null,
        files2: null
      }
    },
    created () {
    },
    methods: {
      logoClicked () {
        this.$router.go('/')
      },
      fileUploaded () {
        console.log('fileUploaded')
        this.$store.commit(mutationType.SELECT_MENU, null)
        this.$store.commit(mutationType.SELECT_CANVAS, null)
        this.$bus.$emit(busType.FILE_UPLOADED, { file: this.files[0], from: 'left' })
      },
      fileUploaded2 () {
        console.log('fileUploaded2')
        this.$store.commit(mutationType.SELECT_MENU, null)
        this.$store.commit(mutationType.SELECT_CANVAS, null)
        this.$bus.$emit(busType.FILE_UPLOADED, { file: this.files2[0], from: 'right' })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/bh_style.scss";

  .app-navbar {
    position: fixed;
    width: 100%;
    z-index: 1024;
    background-color: $header-bg-color;
    font-weight: bold;
  }

  .hero .nav {
    height: $header-height;
    box-shadow: none;
  }

  .hero-head {
    height: $header-height;
  }

  .nav-item img {
    max-height: 100%;
  }

  .nav-left {
    img {
      margin-left: 14px;
      pointer-events: none;

      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }

  .nav-load-file-area {
    position: fixed;
    left: $sidebar-width;
    z-index: 1025;
    display: inline;
  }
  .nav-load-file-b-field {
  }
  .nav-load-file-button {
    margin-top: 20px;
    padding: 0 15px 0 0;
    width: 172px;
    height: 40px;
    background-color: $header-load-file-button-normal-color;
    color: $header-load-file-button-normal-label-color;
    border: none;

    span {
      font-size: 15px;
    }

    &:hover {
      background-color: #4c456d;
    }

    &:active {
      background-color: #27305e;
    }
  }
  .nav-load-file-label {
    margin-left: 177px;
    margin-top: 30px;
    top: 0px;
    width: 800px;
    height: 20px;
    font-size: 15px;
    color: white;
    position: absolute;
  }


  .nav-load-file-area-2 {
    position: fixed;
    width: calc((100vw - 242px) / 2);
    margin-left: calc((100vw - 242px) / 2 + 242px);
    z-index: 1025;
    display: inline;

    .nav-load-file-field-area-2 {
      position: relative;
      left: 0;
    }
  }
  .nav-load-file-b-field-2 {
  }
  .nav-load-file-button-2 {
    margin-top: 20px;
    padding: 0 15px 0 0;
    width: 172px;
    height: 40px;
    background-color: $header-load-file-button-normal-color;
    color: $header-load-file-button-normal-label-color;
    border: none;

    span {
      font-size: 15px;
    }

    &:hover {
      background-color: #4c456d;
    }

    &:active {
      background-color: #27305e;
    }
  }
  .nav-load-file-label-2 {
    margin-left: 177px;
    margin-top: 30px;
    top: 0px;
    width: 800px;
    height: 20px;
    font-size: 15px;
    color: white;
    position: absolute;
  }

  .file-name-span {
    color: white;
  }
  .canvas-selected {
    color: white;
  }

  .nav-help-button {
    width: 80px;
    height: 80px;
    background-color: $header-help-button-normal-color;
    color: $header-help-button-normal-label-color;
    border: none;

    &:hover {
      background-color: #4c456d;
    }
  }
</style>
