<template>
    <!-- Nav元素是一个可以用作页面导航的连接组，其中的导航元素链接到其他页面或者当前页面的其他部分。 -->
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <!-- 多模版渲染 区分登录状态和非登录状态 -->

                <!-- 适配思路: 登录时显示第一块 非登录时显示第二块  是否有token -->
                <template v-if="userStores.userInfo.token">
                    <li><a href="javascript:;" @click="$router.push('/member')"><i class=" iconfont icon-user"></i>
                        {{ userStores.userInfo.account }} </a></li>
                    <li>
                        <el-popconfirm @confirm="confirm" title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
                            <template #reference>
                                <a href="javascript:;">退出登录</a>
                            </template>
                        </el-popconfirm>
                    </li>
                    <li><a href="javascript:;" @click="$router.push('/member/order')">我的订单</a></li>
                    <li><a href="javascript:;" @click="$router.push('/member')">会员中心</a></li>
                </template>
                <template v-else>
                    <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
                    <li><a href="javascript:;">帮助中心</a></li>
                    <li><a href="javascript:;">关于我们</a></li>
                </template>
            </ul>
        </div>
    </nav>
</template>

<script setup lang='ts'>

import { useUserStore } from "@/stores/userStores";
import { useRouter } from "vue-router";

const userStores = useUserStore()
const router = useRouter()

const confirm = () => {
    //退出登录
    userStores.clearuserInfo()
    router.push("/login")
}

</script>

<style scoped lang="scss">
.app-topnav {
    background: #333;
    ul {
        display: flex;
        height: 54px;
        justify-content: flex-end;
        align-items: center;

        li {
            a {
                padding: 0 15px;
                color: #cdcdcd;
                line-height: 1;
                display: inline-block;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }

                &:hover {
                    color: $xtxColor;
                }
            }

            ~li {
                a {
                    border-left: 2px solid #666;
                }
            }
        }
    } 
}

</style>
