<template>
  <div v-if="from === 'left'">
    <div class="tags-left-top">
      <span>Study ID : {{ tagLeftInfo.studyId }}</span><br>
      <span>Study date : {{ tagLeftInfo.studyDate }}</span><br>
      <span>Patient's name : {{ tagLeftInfo.patientName }}</span><br>
      <span>Patient ID : {{ tagLeftInfo.patientId }}</span><br>
      <span>Patient sex : {{ tagLeftInfo.patientSex }}</span><br>
      <span>Patient's birth date : {{ tagLeftInfo.patientBirthDate }}</span><br>
    </div>
    <div class="tags-right-top">
      <span>Field strength : {{ tagLeftInfo.fieldStrength }}</span><br>
      <span>Scanning sequence : {{ tagLeftInfo.scanningSequence }}</span><br>
      <span>TR : {{ tagLeftInfo.repetitionTime }}</span><br>
      <span>TE : {{ tagLeftInfo.echoTime }}</span><br>
      <span>Flip angle : {{ tagLeftInfo.flipAngle }}</span><br>
      <span>Image dimensions (Y, Z, X) : </span><br><span>{{ tagLeftInfo.imageDimensions }}</span><br>
      <span>Voxel dimensions (Y, Z, X) : </span><br><span>{{ tagLeftInfo.voxelDimensions }}</span><br>
    </div>
    <div class="left-bottom">
      <div class="left-bottom-inner">
        {{ leftFlip ? left : right }}
      </div>
    </div>
    <div class="right-bottom">
      <div class="right-bottom-inner">
        {{ leftFlip ? right : left }}
      </div>
    </div>
  </div>
  <div v-else-if="from === 'right'">
    <div class="tags-left-top">
      <span>Study ID : {{ tagRightInfo.studyId }}</span><br>
      <span>Study date : {{ tagRightInfo.studyDate }}</span><br>
      <span>Patient's name : {{ tagRightInfo.patientName }}</span><br>
      <span>Patient ID : {{ tagRightInfo.patientId }}</span><br>
      <span>Patient sex : {{ tagRightInfo.patientSex }}</span><br>
      <span>Patient's birth date : {{ tagRightInfo.patientBirthDate }}</span><br>
    </div>
    <div class="tags-right-top">
      <span>Field strength : {{ tagRightInfo.fieldStrength }}</span><br>
      <span>Scanning sequence : {{ tagRightInfo.scanningSequence }}</span><br>
      <span>TR : {{ tagRightInfo.repetitionTime }}</span><br>
      <span>TE : {{ tagRightInfo.echoTime }}</span><br>
      <span>Flip angle : {{ tagRightInfo.flipAngle }}</span><br>
      <span>Image dimensions (Y, Z, X) : </span><br><span>{{ tagRightInfo.imageDimensions }}</span><br>
      <span>Voxel dimensions (Y, Z, X) : </span><br><span>{{ tagRightInfo.voxelDimensions }}</span><br>
    </div>
    <div class="left-bottom">
      <div class="left-bottom-inner">
        {{ rightFlip ? left : right }}
      </div>
    </div>
    <div class="right-bottom">
      <div class="right-bottom-inner">
        {{ rightFlip ? right : left }}
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import * as busType from '@/util/bus/bus-types'
//  import * as tagType from '@/data/tags'

  export default {
    name: 'TagInfo',
    props: {
      from: {
        type: String,
        default: null
      }
    },
    computed: {
      ...mapGetters([
        'tagLeftInfo',
        'tagRightInfo',
        'focusedCanvas'
      ])
    },
    data () {
      return {
        leftFlip: true,
        rightFlip: true,
        left: 'L',
        right: 'R'
      }
    },
    created () {
      // this.$bus.$on(busType.FILE_UPLOADED, this.dicomFileUploaded)
      this.$bus.$on(busType.FLIP_HORIZONTAL, this.flipHorizontal)
      this.$bus.$on(busType.RESET_TAG_INFO, this.resetTagInfo)
    },
    methods: {
      resetTagInfo (data) {
        if (data.from === 'left') {
          this.leftFlip = true
        } else if (data.from === 'right') {
          this.rightFlip = true
        }
      },
      dicomFileUploaded (dicomFile) {
//        switch (dicomFile.name) {
//          case 'dicom-001-02.zip':
//            this.tagData = tagType.TAG_001_02
//            break
//          case 'dicom-002-02.zip':
//            this.tagData = tagType.TAG_002_02
//            break
//          case 'dicom-003-02.zip':
//            this.tagData = tagType.TAG_003_02
//            break
//          case 'dicom-004-02.zip':
//            this.tagData = tagType.TAG_004_02
//            break
//          case 'dicom-005-02.zip':
//            this.tagData = tagType.TAG_005_02
//            break
//          default:
//            break;
//        }
      },
      flipHorizontal (data) {
        if (data.from === 'left') {
          this.leftFlip = !this.leftFlip
        } else if (data.from === 'right') {
          this.rightFlip = !this.rightFlip
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tags-left-top {
    position: absolute;
    left: 30px;
    top: 30px;
    width: 40%;
    height: 40%;
    text-align: left;
    color: #cfcfcf;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tags-right-top {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 50%;
    height: 40%;
    text-align: right;
    color: #cfcfcf;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tags-bottom {
    position: absolute;
    left: 0;
    bottom: 30px;
    width: 100%;
    height: 40%;
    color: #cfcfcf;

    .tags-bottom-inner {
      position: absolute;
      width: 100%;
      bottom: 0;
      text-align: center;
    }
  }

  .left-bottom {
    position: absolute;
    left: 30px;
    bottom: 30px;
    width: 40%;
    height: 40%;
    color: #cfcfcf;

    .left-bottom-inner {
      position: absolute;
      width: 100%;
      bottom: 0;
      text-align: left;
      font-family: AppleSDGothicNeo;
      font-size: 15px;
      font-weight: 800;
      font-style: normal;
      font-stretch: normal;
      letter-spacing: normal;
      color: #4a90e2;
    }
  }

  .right-bottom {
    position: absolute;
    right: 30px;
    bottom: 30px;
    width: 40%;
    height: 40%;
    color: #cfcfcf;

    .right-bottom-inner {
      position: absolute;
      width: 100%;
      bottom: 0;
      text-align: right;
      font-family: AppleSDGothicNeo;
      font-size: 15px;
      font-weight: 800;
      font-style: normal;
      font-stretch: normal;
      letter-spacing: normal;
      color: #4a90e2;
    }
  }

  span {
    white-space: nowrap;
  }
</style>
