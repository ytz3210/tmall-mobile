import userApi from '@/api/user'
import {Button, Cell, CellGroup, Field, Image, NavBar, Toast, Uploader} from 'vant'
import store from '@/store'

const baseApi = process.env.VUE_APP_IMG_BASE_URL
export default {
    components: {
        [Button.name]: Button,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [NavBar.name]: NavBar,
        [Field.name]: Field,
        [Toast.name]: Toast,
        [Image.name]: Image,
        [Uploader.name]: Uploader
    },
    data() {
        return {
            avatarUrl: 'http://microapp.gitee.io/linjiashop/logo.jpg'
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.user = store.state.app.user
            if (this.user.avatar) {
                this.avatarUrl = baseApi + this.user.avatar
            }
        },
        onClickLeft() {
            this.$router.go(-1)
        },
        afterRead(vantFile) {
            console.log('上传成功', vantFile)
            userApi.upload({
                name: vantFile.file.name,
                type: vantFile.file.type,
                base64: vantFile.content
            }).then(response => {
                //更新用户信息
                store.dispatch('app/toggleUser', response.data)
                this.avatarUrl = baseApi + response.data.avatar
            })
        }
    }
}
