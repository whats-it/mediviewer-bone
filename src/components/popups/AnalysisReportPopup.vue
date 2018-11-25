<template>
  <vue-draggable-resizable
    class="report-popup"
    :parent="true"
    :resizable="false"
    :x="aX" :y="20" :z="2000"
    :w="700" :h="900">
    <div class="report-popup-inner">
      <div class="report-header">
        <span>Analysis Report</span>
        <img src="/static/images/icons/svg/btn-close-nor.svg"
             @click="closePopup"
             @mousedown="stopMovable">
      </div>
      <div
        class="report-body"
        v-if="analysisReport"
      >
        <div class="report-body-top">
          <div class="title">
            <span>PATIENT INFORMATION</span>
          </div>
          <div class="top-table">
            <table>
              <tr>
                <td class="content-name">PATIENT ID</td>
                <td class="content">{{ analysisReport.patient_id }}</td>
                <td class="content-name">SEX</td>
                <td class="content">{{ analysisReport.patient_sex }}</td>
              </tr>
              <tr>
                <td class="content-name">NAME</td>
                <td class="content">{{ analysisReport.patient_name }}</td>
                <td class="content-name">BIRTHDATE</td>
                <td class="content">{{ analysisReport.patient_birthdate }}</td>
              </tr>
            </table>
          </div>
          <div class="divider"></div>
          <div class="bottom-table">
            <table>
              <tr>
                <td class="content-name">STUDY ID</td>
                <td class="content">{{ analysisReport.study_id }}</td>
                <td class="content-name">STUDY DATE</td>
                <td class="content">{{ analysisReport.study_date }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="report-body-mid">
          <div class="title">
            <span>Analysis Result</span>
          </div>
          <div class="image-area">
            <img :src="('http://' + analysisReport.image_url)">
          </div>
        </div>
        <div class="report-body-bottom">
          <div class="grade">
            <span>해당 환자 영상분석 결과는 'Grade {{ analysisReport.grade }}' 입니다.</span>
          </div>
        </div>
      </div>
    </div>
  </vue-draggable-resizable>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'AnalysisReportPopup',
    computed: {
      ...mapGetters([
        'showAnalysisReportPopup',
        'analysisReport'
      ])
    },
    data () {
      return {
        aX: 0
      }
    },
    created () {
      this.aX = window.innerWidth / 2 - 350
    },
    mounted () {
    },
    methods: {
      ...mapActions([
        'showAnalysisReportPopupToggle'
      ]),
      closePopup (e) {
        this.showAnalysisReportPopupToggle(false)
        e.stopPropagation()
      },
      stopMovable (e) {
        e.stopPropagation()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/bh_style.scss";

  .report-popup {
    box-shadow: 5px 5px 30px black;

    .report-popup-inner {
      width: 100%;
      height: 100%;
      background-color: #282828;
      border-radius: 5px;
      overflow: hidden;

      .report-header {
        margin-left: 15px;
        width: 100%;
        height: 48px;

        span {
          position: relative;
          top: 10px;
          font-size: 15px;
          vertical-align: middle;
          color: #e3e3e3;
        }

        img {
          vertical-align: middle;
          margin-right: 15px;
          width: 48px;
          height: 48px;
          float: right;

          &:hover {
            cursor: pointer;
            background-color: $button-over-color;
          }
        }
      }

      .report-body {
        position: absolute;
        width: 100%;
        top: 48px;
        bottom: 0;
        padding: 20px 30px;
        background-color: rgb(32, 31, 36);
        overflow-y: auto;
        overflow-x: hidden;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;

        .report-body-top {
          .title {
            margin-top: 20px;
            font-size: 15px;
            color: #e3e3e3;
          }

          table {
            margin-bottom: 20px;
            width: 100%;
            tr {
              td.content-name {
                width: 20%;
              }
              td.content {
                width: 30%;
                color: #e3e3e3;
              }
            }
          }
        }

        .report-body-mid {
          .title {
            margin-top: 40px;
            font-size: 25px;
            color: #e3e3e3;
          }
          .image-area {
            width: 100%;
            height: 470px;
            border: 2px solid #282828;
            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }
        }

        .report-body-bottom {
          margin-top: 25px;
          .grade {
            text-align: center;
            span {
              font-weight: bold;
              font-size: 25px;
              color: #e3e3e3;
            }
          }
        }

        .divider {
          margin-bottom: 20px;
          width: 100%;
          height: 2px;
          background-color: #282828;
        }
      }

      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #3b3a40;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #787782;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
    border-radius: 10px;
  }
</style>
