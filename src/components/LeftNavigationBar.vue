<template>
    <div class="NavigationBar">
        <div class="leftNavigation">
<!--            :src="store.getters.userinfo.avatar ? store.getters.userinfo.avatar : require('../assets/logoHead.svg')"-->
            <el-avatar class="headPortrait" :size="70" :icon="UserFilled"
                       :src="require('../assets/logo1.png')"
                       style="background-color: #5c5c5c"/>

            <div v-if="store.getters.userinfo" class="surplus">Ai币：{{ store.getters.userinfo.frequency }}</div>
            <div v-else @click="loginVisible = true" class="loginBut">登录</div>
            <div class="header">
                <div class="switch-button">
                    <block v-for="(item,index) in navigationList" :key="index">
                        <router-link active-class="switch-active" class="switch-item" :to="item.to">
                            <el-icon>
                                <component :is="item.icon"/>
                            </el-icon>
                            <div class="switch-item-title">{{ item.title }}</div>
                        </router-link>
                    </block>
                </div>
            </div>

            <div class="bottom">
                <el-avatar :size="40" :icon="UserFilled" :src="require('../assets/logo2.png')"
                           style="background-color: #5c5c5c"/>
                <div class="bottomRight">
                    <div class="bottomRightName">Ai</div>
                    <div class="bottomRightEdition">v1.0.0</div>
                </div>
            </div>
        </div>
        <div class="rightContent">
            <RouterView v-slot="{ Component }">
                <!-- TODO 要缓存 -->
                <KeepAlive>
                    <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"></component>
                </KeepAlive>
                <!-- TODO 不缓存 -->
                <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive"></component>
            </RouterView>
        </div>
    </div>

    <LoginDialog :show="loginVisible" @close="loginVisible = false"/>
</template>

<script>
import {defineComponent, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {
    ChatDotSquare,
    ChatLineRound,
    ChatRound,

    EditPen, HelpFilled,
    MessageBox,
    UserFilled
} from '@element-plus/icons-vue'
import router from "@/router";
import store from "../store";
import LoginDialog from "@/components/LoginDialog.vue";

export default defineComponent({
    name: "LeftNavigationBar",
    components: {LoginDialog},
    computed: {
        store() {
            return store
        }
    },
    methods: {
        router() {
            return router
        }
    },
    setup() {
        let router = useRouter();
        // TODO DATA
        let loginVisible = ref(false)
        let dialogVisible = ref(false)
        let appletDialogVisible = ref(false)
        let isHeadNavigation = ref(false)
        let navigationList = ref([{
            title: '智能对话',
            icon: ChatDotSquare,
            to: '/'
        },
        //  {
        //     title: '新必应',
        //     icon: ChatLineRound,
        //     to: '/bing'
        // }, 
        {
            title: '智能绘图',
            icon: HelpFilled,
            to: '/painting'
        }, {
            title: '灵感创作',
            icon: EditPen,
            to: '/create'
        }
            , {
                title: '我的收藏',
                icon: MessageBox,
                to: '/collection'
            }
        ])

        watch(() => router.currentRoute.value, (newValue) => {
            isHeadNavigation.value = newValue.meta.isHeadNavigation;
        }, {
            immediate: true
        })

        const dropdown1 = ref()

        function showClick() {
            dropdown1.value.handleOpen()
        }


        return {
            isHeadNavigation,
            navigationList,
            UserFilled,
            showClick,
            dropdown1,
            appletDialogVisible,
            dialogVisible,
            loginVisible
        };
    },
});
</script>

<style scoped>
.NavigationBar {
    width: 100%;
    height: 100%;
    display: flex;
    border: 1px solid rgb(40, 40, 40);
    border-radius: 10px;
    overflow: hidden;
}

.leftNavigation {
    width: 260px;
    height: 100%;
    background-color: rgb(38, 38, 38);
    border-right: 1px solid rgb(40, 40, 40);
    position: relative;
}

.bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 70px;
    border-top: 1px solid rgb(40, 40, 40);
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 20px;
}

.bottomRight {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
}

.bottomRightName {
    font-size: 14px;
    font-weight: bold;
}

.bottomRightEdition {
    font-size: 12px;
    margin-top: 3px;
    color: #7c7c7c;
}

.headPortrait {
    display: block;
    margin: 50px auto 0;
}

.surplus {
    box-sizing: border-box;
    padding: 5px 10px;
    background-color: #7d80ff;
    display: table;
    margin: 20px auto 0;
    font-size: 13px;
    color: white;
    border-radius: 5px
}

.rightContent {
    position: relative;
    flex: 1;
    background: #464646;
}

.loginBut {
    width: 80px;
    height: 40px;
    background-color: #7d80ff;
    border-radius: 8px;
    margin: 20px auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 14px;
    cursor: pointer;
}

.header {
    margin-top: 20px;
}

.switch-button {
    box-sizing: border-box;
    padding: 0 20px;
}

.switch-item {
    height: 50px;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
    font-size: 15px;
}

.switch-item-title {
    margin-left: 10px;
}

.switch-active {
    background-color: #87aaf0;
    border-radius: 8px
}

@media only screen and (max-width: 767px) {
    .NavigationBar {
        border: none;
        border-radius: 0;
    }

    .leftNavigation {
        display: none;
    }
}

/*.NavigationBar {*/
/*  border: none;*/
/*  border-radius: 0;*/
/*}*/
</style>
