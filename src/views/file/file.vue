<template>
  <div class="file">
    <div>
      <a-space>
        <span>有资源直接链接，使用创建location.href方式下载：</span>
        <a-button type="primary" @click="downloadImgByLocationHref">下载图片</a-button>
        <a-button type="primary" @click="downloadDocByLocationHref">下载DOC文档</a-button>
      </a-space>
    </div>
    <div>
      <a-space>
        <span>有资源直接链接，使用创建a-href方式下载：</span>
        <a-button type="primary" @click="downloadImg">下载图片</a-button>
        <a-button type="primary" @click="downloadDoc">下载DOC文档</a-button>
      </a-space>
    </div>
    <div>
      <a-space>
        <span>转换为Blob下载：</span>
        <a-button @click="downloadImgByAxios">下载图片 </a-button>
        <a-button type="primary" @click="downloadDocByAxios">下载DOC文档</a-button>
      </a-space>
    </div>
    <div>
      <a-space>
        <span>图片转换成Blob并显示:</span>
        <a-button type="primary" @click="showImage">访问并显示图片</a-button>
        <img :src="imgSrc" />
      </a-space>
    </div>
    <div>
      <a-space>
        <span>进度条：</span>
        <a-button type="primary" @click="downloadZipFile">下载629MB压缩包文件并显示进度条</a-button>
      </a-space>
      <div style="padding:10px;">
        下载进度：<a-progress
          :stroke-color="{
            from: '#108ee9',
            to: '#87d068',
          }"
          :percent="downLoadPercent"
          :status="getDownloadStatus"
        />
      </div>
    </div>
    <div>
      <a-space>
        <span>试一试：未认证情况</span>
        <a-button @click="clickWithUnauthorization">404未认证</a-button>
      </a-space>
    </div>
    <div>
      <a-space>
        <span>试一试：fetch</span>
        <a-button type="primary" @click="tryFetch">尝试fetch</a-button>
      </a-space>
    </div>
    <div>
      <a-space>
        <span>试一试：并发</span>
        <a-space>
          <a-button type="primary" @click="concurrencyRequest">并发请求</a-button>
        </a-space>
      </a-space>
    </div>
    <div>
      <a-space>
        <span>head方法</span>
        <a-button type="primary" @click="visitHeadMethod">访问Head方法</a-button>
      </a-space>
    </div>
    <div>
      <a-space>
        <span>option方法</span>
        <a-button type="primary" @click="visitOptionMethod">访问Option方法</a-button>
      </a-space>
    </div>
    <div>
      <a-space>
        <span>post方法</span>
        <a-button type="primary" @click="addUserRequest">addUserRequest</a-button>
      </a-space>
    </div>
    <a-button @click="updateUserRequest">updateUserRequest</a-button>
  </div>
</template>
<script>
//  常量声明
const value = { msg: "Hello World!" };

//  引入外部资源
import axios from "axios";
export default {
  name: "File",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      //  常量
      value,
      //  状态
      uploading: false,
      //  变量
      imgSrc: "",
      downLoadPercent: 0, // 下载进度
    };
  },
  computed: {
    getDownloadStatus() {
      if (this.downLoadPercent == 0) {
        return "normal";
      } else if (this.downLoadPercent < 100) {
        return "active";
      } else if (this.downLoadPercent == 100) {
        return "success";
      } else {
        return "exception";
      }
    },
  },
  watch: {},
  methods: {
    clickWithUnauthorization() {
      axios
        .get("http://192.168.100.59:8090/cockroach/project/my/list")
        .then((res) => {
          console.log("res===", res);
        })
        .catch((err) => {
          console.log("er", err);
        });
    },
    tryFetch() {
      fetch("https://www.kk23424.site/mock/cb28abad7a23ac4309b07f4072fcafdd/axios/user/list12")
        .then((res) => {
          console.log("res===", res);
          return res.json();
        })
        .then((data) => {
          console.log("data===", data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    visitHeadMethod() {
      axios
        .head("http://localhost:8890/file/img", {
          responseType: "blob",
          headers: {
            "Content-Type": "image/png",
          },
        })
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    visitOptionMethod() {
      axios
        .options("http://localhost:8890/file/img")
        .then((res) => {
          console.log("res===", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    addUserRequest() {
      axios
        .post("http://localhost:8890/user/add", { username: "大哥别杀我", password: 123456 })
        .then((res) => {
          console.log("res===", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    updateUserRequest() {
      axios
        .put("http://localhost:8890/user/update", { id: 12, username: "呵呵哒", password: "喜欢一个人" })
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    /**
     * HTTP REQUEST
     * 获取用户列表
     */
    async getUserListRequest() {
      try {
        const res = await axios.get("https://www.fastmock.site/mock/cb28abad7a23ac4309b07f4072fcafdd/axios/user/list");
        return res;
      } catch (err) {
        console.log("err===", err);
      }
    },
    /***
     * HTTP REQUEST
     * 获取项目列表
     */
    async getProjectListRequest() {
      try {
        const res = await axios.get(
          "https://www.fastmock.site/mock/cb28abad7a23ac4309b07f4072fcafdd/axios/project/list"
        );
        return res;
      } catch (err) {
        console.log("err===", err);
      }
    },
    async getAxiosAll() {
      let [res1, res2] = await Promise.all([this.getUserListRequest(), this.getProjectListRequest()]);
      console.log("res1==", res1);
      console.log("res2===", res2);
    },
    concurrencyRequest() {
      this.getAxiosAll();
    },
    /**
     * 直接链接下载
     */
    downloadImgByLocationHref() {
      location.href =
        "https://bbs-fd.zol-img.com.cn/t_s500x500/g6/M00/0B/04/ChMkKV9Mv6OIWwCMAAMaEoisOLgAABs5wHRvjUAAxoq829.jpg";
    },
    /***
     * 直接链接下载
     */
    downloadDocByLocationHref() {
      location.href = "http://www.zaq.gov.cn/uploads/749720193114552.doc";
    },
    /**
     * 通过创建链接方式下载
     */
    downloadByHref(href, fileName) {
      let link = document.createElement("a");
      let body = document.querySelector("body");

      link.download = fileName;
      link.href = href;
      link.style.display = "none";
      body.appendChild(link);

      link.click();
      body.removeChild(link);
    },
    downloadDoc() {
      location.href = "http://www.zaq.gov.cn/uploads/749720193114552.doc";
    },
    downloadImg() {
      const imgUrl =
        "https://bbs-fd.zol-img.com.cn/t_s500x500/g6/M00/0B/04/ChMkKV9Mv6OIWwCMAAMaEoisOLgAABs5wHRvjUAAxoq829.jpg";
      this.downloadByHref(imgUrl);
    },
    showImage() {
      axios
        .get("http://localhost:8890/file/img", {
          responseType: "blob",
          headers: {
            "Content-Type": "image/png",
          },
        })
        .then((res) => {
          console.log("res===", res);
          let blob = new Blob([res.data], { type: "image/png" });
          let link = URL.createObjectURL(blob);
          this.imgSrc = link;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    downloadByBlob(file, fileName = "", args = { type: "application/json;charset=utf-8" }) {
      let blob = new Blob([file], args);
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, fileName);
      } else {
        // for Non-IE
        let objectUrl = URL.createObjectURL(blob);
        let link = document.createElement("a");
        link.href = objectUrl;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(link.href);
      }
    },
    /***
     * 通过axios下载图片
     */
    downloadImgByAxios() {
      axios
        .get("http://localhost:8890/file/img", {
          responseType: "blob",
          headers: {
            "Content-Type": "image/png",
          },
        })
        .then((res) => {
          console.log("===res===", res);
          this.downloadByBlob(res.data, "cicd_flow.png", { type: "image/png" });
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    downloadDocByAxios() {
      axios
        .get("http://localhost:8890/file/doc", {
          responseType: "blob",
          headers: {
            "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          },
        })
        .then((res) => {
          console.log("===res===", res);
          this.downloadByBlob(res.data, "稻香.docx", {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    downloadBigFile() {
      axios
        .get("http://localhost:8890/file/exe", {
          responseType: "blob",
          headers: {
            "Content-Type": "application/vnd.microsoft.portable-executable",
          },
        })
        .then((res) => {
          console.log("===res===", res);
          this.downloadByBlob(res.data, "微信.exe", {
            type: "application/vnd.microsoft.portable-executable",
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    downloadZipFile() {
      const _this = this;
      axios
        .get("http://localhost:8890/file/zip", {
          responseType: "blob",
          headers: {
            "Content-Type": "application/x-7z-compressed",
          },
          onDownloadProgress(file) {
            let percent = parseInt(100 * (file.loaded / file.total));
            _this.$nextTick(() => {
              _this.downLoadPercent = percent;
            });
          },
        })
        .then((res) => {
          console.log("===res===", res);
          this.downloadByBlob(res.data, "书籍.zip", {
            type: "application/x-7z-compressed",
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
  filters: {},
  created() {},
  mounted() {},
  destoryed() {},
};
</script>
<style lang="scss" scoped>
.file {
}
div {
  margin-top: 10px;
}
</style>
