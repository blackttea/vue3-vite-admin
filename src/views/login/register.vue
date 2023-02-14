<template>
  <padding class="register-container container-center">
    <div class="register-main">
      <div class="re-left">
        <svg-icon class="re-img" name="register" :height="830" :width="830" />
      </div>
      <div class="re-right">
        <div class="back-icon">
          <svg-icon class="re-img" name="back" :height="16" :width="20" @click="backTo" />
        </div>
        <div class="re-main">
          <a-form
            :model="formState"
            name="basic"
            layout="vertical"
            autocomplete="off"
            class="r-main"
            :rules="rules"
            ref="formRef"
            @finish="handleFinish"
          >
            <a-form-item label="用户名" name="username" class="re-form">
              <a-input v-model:value="formState.username" />
            </a-form-item>

            <a-form-item label="手机号" name="phone" class="re-form">
              <a-input v-model:value="formState.phone" />
            </a-form-item>

            <a-form-item label="邮箱" name="email" class="re-form">
              <a-input v-model:value="formState.email" />
            </a-form-item>

            <a-form-item label="邮箱验证码" name="email" class="re-form">
              <a-input v-model:value="formState.emailCode" placeholder="请输入邮箱验证码">
                <template #suffix>
                  <a-button type="primary" danger @click="sendEmail">获取邮箱验证码</a-button>
                </template>
              </a-input>
            </a-form-item>

            <a-form-item label="密码" name="password" class="re-form">
              <a-input-password v-model:value="formState.password" />
            </a-form-item>

            <a-form-item label="确认密码" name="rePassword" class="re-form">
              <a-input-password v-model:value="formState.rePassword" />
            </a-form-item>

            <a-form-item>
              <a-button type="primary" html-type="submit" danger class="register-btn">确认</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </padding>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { reactive, ref } from "vue"
import type { Rule } from "ant-design-vue/es/form"
import type { FormInstance } from "ant-design-vue"
import { register, formType, sendEmailCode } from "@/api/login"

const router = useRouter()
const formRef = ref<FormInstance>()
const formState = reactive<formType>({
  username: "admin",
  phone: "14987194558",
  email: "85e@163.com",
  password: "admin",
  rePassword: "admin",
  emailCode: ""
})

const validatePass = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("Please input the password")
  } else {
    if (formState.username !== "") {
      if (formRef.value) formRef.value.validateFields("checkPass")
    }
    return Promise.resolve()
  }
}
const checkRePass = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("请再次输入密码!")
  } else if (value !== formState.password) {
    return Promise.reject("两次密码不相同!")
  } else {
    return Promise.resolve()
  }
}

const checkName = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("请输入用户名!")
  } else {
    return Promise.resolve()
  }
}

const checkPhone = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("请输入电话号码!")
  } else {
    const telephone = /^1[3456789]\d{9}$/
    if (telephone.test(formState.phone)) {
      return Promise.resolve()
    } else {
      return Promise.reject("请正确输入电话号码!")
    }
  }
}

const checkEmail = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("请输入电话号码!")
  } else {
    const regEmail = /^([a-zA-Z]|\d)(\w|-)+@[a-zA-Z\d]+\.([a-zA-Z]{2,4})$/
    if (regEmail.test(formState.email)) {
      return Promise.resolve()
    } else {
      return Promise.reject("请正确输入邮箱!")
    }
  }
}

const rules: Record<string, Rule[]> = {
  username: [{ required: true, validator: checkName, trigger: "change" }],
  phone: [{ required: true, validator: checkPhone, trigger: "change" }],
  email: [{ required: true, validator: checkEmail, trigger: "change" }],
  password: [{ required: true, validator: validatePass, trigger: "change" }],
  rePassword: [{ required: true, validator: checkRePass, trigger: "change" }]
}

const sendEmail = () => {
  sendEmailCode(formState).then((res) => {
    console.log(res)
  })
}
const handleFinish = () => {
  register(formState).then((res) => {
    console.log(res)
  })
}
const backTo = () => {
  router.push("/login")
}
</script>

<style scoped lang="scss">
$leftWidth: 830px;
$br: 5px;

.register-main {
  width: 1440px;
  height: 830px;
  border-radius: $br;
  display: flex;
  .re-left {
    height: 100%;
    width: $leftWidth;
    border-radius: $br;
  }
  .re-right {
    background-color: #ffffff;
    height: 100%;
    width: calc(100% - #{$leftWidth});
    border-radius: $br;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
    .back-icon {
      width: 100%;
      height: 46px;
      padding: 30px 0 0 30px;
    }
    .re-main {
      width: 100%;
      height: calc(100% - 46px);
      display: flex;
      justify-content: center;
      align-items: center;
      .r-main {
        width: 80%;
        .register-btn {
          width: 100%;
          border-radius: 20px;
        }
      }
    }
  }
}

:deep(.ant-input) {
  border-radius: 20px;
}

:deep(.ant-input-affix-wrapper) {
  border-radius: 20px;
}
</style>
