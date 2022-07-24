<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="request" class="form">
        <div>
          <label for="productName">productName</label>
          <input id="productName" type="text" v-model="productName" required />
        </div>
        <div>
          <label for="price">PRICE</label>
          <input id="price" type="text" v-model="price" />
        </div>
        <div>
          <label for="quantity">quantity</label>
          <input id="quantity" type="text" v-model="quantity" />
        </div>
        <div>
          <label for="description">description</label>
          <input id="description" type="text" v-model="description" />
        </div>
        <button @click="submit()" type="submit" class="btn">상품등록</button>
      </form>
      <v-file-input
        class="input"
        type="file"
        counter
        show-size
        label="이미지 제출(여러개 가능)"
        outlined
        dense
        multiple
        prepend-icon="mdi-camera"
        style="width: 400px; margin-left: 100px"
        @change="onImageChange"
      />
      <!--      <v-img v-for="(item, i) in fileList" :key="i" :src="item.url" />-->
    </div>
  </div>
</template>

<script>
import { validateEmail } from '@/utils/validation';
import axios from 'axios';

export default {
  data() {
    return {
      fileList: '',
      productName: '1',
      price: '1',
      quantity: '1',
      description: '1',
    };
  },
  computed: {
    isEmailValid() {
      return validateEmail(this.email);
    },
  },
  methods: {
    onImageChange(file) {
      // v-file-input 변경시
      if (!file) {
        return;
      }
      const formData = new FormData(); // 파일을 전송할때는 FormData 형식으로 전송
      this.uploadimageurl = []; // uploadimageurl은 미리보기용으로 사용
      file.forEach(item => {
        formData.append('fileList', item); // formData의 key: 'filelist', value: 이미지
        const reader = new FileReader();
        reader.onload = e => {
          this.uploadimageurl.push({ url: e.target.result });
          // e.target.result를 통해 이미지 url을 가져와서 uploadimageurl에 저장
        };
        reader.readAsDataURL(item);
      });
      formData.append('productName', this.productName);
      formData.append('price', this.price);
      formData.append('quantity', this.quantity);
      formData.append('description', this.description);
      axios({
        url: 'http://localhost:12345/api/products/admin/register', // 이미지 저장을 위해 back서버와 통신
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' }, // 이걸 써줘야 formdata 형식 전송가능
        data: formData,
      })
        .then(res => {
          console.log(res.data.message);
          this.imagecnt = file.length; // 이미지 개수 저장
        })
        .catch(err => {
          alert(err);
        });
    },

    // async upload() {
    //   try {
    //     // const payload = {
    //     //   productName: this.productName,
    //     //   price: this.price,
    //     //   quantity: this.quantity,
    //     //   description: this.description,
    //     // };
    //     let elem = document.createElement('input');
    //     // 이미지 파일 업로드 / 동시에 여러 파일 업로드
    //     elem.id = 'image';
    //     elem.type = 'file';
    //     elem.accept = 'image/*';
    //     elem.multiple = true;
    //     // 클릭
    //     elem.click();
    //     // 이벤트 감지
    //
    //     elem.onchange = function () {
    //       formData = new FormData();
    //       for (let index = 0; index < this.files.length; index++) {
    //         formData.append('fileList', this.files[index]);
    //       }
    //       formData.append('productName', this.productName);
    //       formData.append('price', this.price);
    //       formData.append('quantity', this.quantity);
    //       formData.append('description', this.description);
    //     };
    //     // formData.append('request', payload);
    //     // await adminRegister(formData);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // async submit() {
    //   try {
    //     await adminRegister(formData);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    initRequest() {
      this.file = '';
      this.productName = '';
      this.price = '';
      this.quantity = '';
      this.description = '';
    },
  },
};
</script>

<style>
.btn {
  color: white;
}
</style>
