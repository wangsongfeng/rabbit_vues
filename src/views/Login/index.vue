<template>
    <div>
        <header class="login-header">
            <div class="container m-top-20">
                <h1 class="logo">
                    <RouterLink to="/">小兔鲜</RouterLink>
                </h1>
                <RouterLink class="entry" to="/">
                    进入网站首页
                    <i class="iconfont icon-angle-right"></i>
                    <i class="iconfont icon-angle-right"></i>
                </RouterLink>
            </div>
        </header>

        <section class="login-section">
            <div class="wrapper">
                <nav>
                    <a href="javascript:;">账号登录</a>
                </nav>

                <div class="account-box">
                    <div class="form">
                        <!-- 账户 -->
                        <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="60px" status-icon>
                            <el-form-item prop="account" label="账户">
                                <el-input v-model="form.account" />
                            </el-form-item>
                            <!-- 密码 -->
                            <el-form-item prop="password" label="密码">
                                <el-input v-model="form.password" />
                            </el-form-item>

                            <!-- 同意协议 -->
                            <el-form-item prop="agree" label-width="22px">
                                <el-checkbox size="large" v-model="form.agree">
                                    我已同意隐私条款和服务条款
                                </el-checkbox>
                            </el-form-item>

                            <el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button>
                        </el-form>
                        
                         
                    </div>
                </div>
            </div>
        </section>

        <footer class="login-footer">
            <div class="container">
                <p>
                    <a href="javascript:;">关于我们</a>
                    <a href="javascript:;">帮助中心</a>
                    <a href="javascript:;">售后服务</a>
                    <a href="javascript:;">配送与验收</a>
                    <a href="javascript:;">商务合作</a>
                    <a href="javascript:;">搜索推荐</a>
                    <a href="javascript:;">友情链接</a>
                </p>
                <p>CopyRight &copy; 小兔鲜儿</p>
            </div>
        </footer>
    </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/userStores';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore()

const form = ref({
    account: 'heima282',
    password: 'hm#qd@23!',
    agree: true
}as any) 


//规则 
/**
 * RuleItem 来自 async-validator 的类型定义
 * required: true 明确表示必填
 * trigger: 'change' 定义触发验证的时机
 * Element Plus 的 el-form 组件需要通过 ref 获取实例调用内置的 validate 方法
 * 
 * 表单验证流程
 *   formRef.value.validate((valid) => {...})
 *   Element Plus 的表单组件会自动校验所有带 rules 的表单项
 *   valid 参数是所有校验结果的聚合（全部通过为 true）
 *   为什么先验证：避免向后端发送无效请求，前端先做基础验证（如非空、格式等）
 * */ 
const rules = {
    account: [
        {required: true, message: '用户名不能为空',trigger: 'blur'}
    ],
    password: [
        {required: true,message: '密码不能为空',trigger: 'blur'},
        {min:6,max:14,message: '密码长度为6-14个字符',trigger: 'blur'}
    ],
    agree: [
        {
            validator: (rule: any, value: boolean, callback: (error?: Error) => void) => {
                if (value) {
                    callback()
                } else {
                    callback(new Error('请勾选协议!'))
                }
            }
        }
    ]
}


const formRef = ref()

const router = useRouter()

const doLogin = () => {
    const {account,password} = form.value

    formRef.value?.validate(async (valid : boolean) => {
        if (valid) {
            await userStore.getUserInfo({account,password})

            ElMessage({type: 'success',message: '登录成功'})

            router.replace({path:'/'})
        }
    })
}

</script>

<style lang="scss" scoped>
.login-header {
    background-color: #fff;
    border-bottom: 1px solid #e4e4e4;

    .container {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
    }
    /// contain：
    /// 背景图缩放模式为 contain（完整显示图片，保持比例，可能留白）。
    .logo {
        width: 200px;
        a {
            display: block;
            height: 132px;
            width: 100%;
            text-indent: -9999px; //text-indent: -9999px：将文字缩进到屏幕外，视觉上隐藏但仍能被搜索引擎抓取（对SEO友好）。
            background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
        }
    }

    .entry {
        width: 120px;
        margin-bottom: 38px;
        font-size: 16px;

        i {
            font-size: 14px;
            color: $xtxColor;
            letter-spacing: -5px;
        }
    }
}

.login-section {
    background: url('@/assets/images/login-bg.png') no-repeat center / cover;
    height: 488px;
    position: relative;

    .wrapper {
        width: 380px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 54px;
        transform: translate3d(100px,0,0);
        box-shadow: 0 0 10px rgba(0,0,0,0.15);

        nav {
            font-size: 14px;
            height: 55px;
            margin-bottom: 20px;
            border-bottom: 1px solid #f5f5f5;
            display:  flex;
            padding: 0 40px;
            text-align: center;
            align-items: center;

            a {
                flex: 1;
                line-height: 1;
                display: inline-block;
                font-size: 18px;
                position: relative;
                text-align: center;
            }
        }
    }


    .account-box {

        .form {
            padding: 0 20px 20px 20px;

            &-item {
                margin-bottom: 28px;
                
            }
        }

        .agree {
            a {
                color: #069;
            }
        }
        .subBtn {
            background: $xtxColor;
            width: 100%;
            color: #fff;
        }

    }
}


.login-footer {
    padding: 30px 0 50px;
    background: #fff;

    p {
        text-align: center;
        color: #999;
        padding-top: 20px;

        a {
            line-height: 1;
            padding: 0 10px;
            color: #999;
            display: inline-block;

            ~a {
                border-left: 1px solid #ccc;
            }
        }
    }
}

</style>