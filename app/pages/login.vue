<script lang="ts" setup>
import { ElNotification } from 'element-plus'
import LlmLoader from '~/components/LlmLoader.vue'
import { isStrongPassword, isValidEmail } from '~/utils/useValidation.js'

// CONSTANTS

definePageMeta({
  layout: 'login-layout',
})

// STATE

const loginForm = ref()

const form = ref({
  email: '',
  password: '',
})

const showPassword = ref(false)
const emailError = ref('')
const passwordError = ref('')
const isLeftVisible = ref(true)
const isRightVisible = ref(true)

const rules = {
  email: [
    {
      required: true,
      message: 'Please enter a valid email address.',
      validator: (rule, value, callback) => {
        if (isValidEmail(value)) {
          callback()
        }
        else {
          callback(new Error('Please enter a valid email address.'))
        }
      },
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: 'Password must be at least 8 characters, include uppercase and lowercase letters, a number, and a special character.',
      validator: (rule, value, callback) => {
        if (isStrongPassword(value)) {
          callback()
        }
        else {
          callback(new Error('Password must be at least 8 characters, include uppercase and lowercase letters, a number, and a special character.'))
        }
      },
      trigger: 'blur',
    },
  ],
}

// HELPERS

const handleSubmit = () => {
  emailError.value = ''
  passwordError.value = ''

  if (!isValidEmail(form.value.email)) {
    emailError.value = 'Please enter a valid email address.'
    return
  }

  if (!isStrongPassword(form.value.password)) {
    passwordError.value = 'Password must be at least 8 characters, include uppercase and lowercase letters, a number, and a special character.'
    return
  }

  if (!emailError.value && !passwordError.value) {
    ElNotification({
      title: 'Success',
      message: 'Form submitted successfully',
      type: 'success',
      duration: 2000,
    })
    console.log('Form submitted successfully')

    setTimeout(() => {
      isLeftVisible.value = false

      isRightVisible.value = false
    }, 500)
  }
}
</script>

<template>
  <div class="left" :class="{ hidden: !isLeftVisible }">
    <div class="login-container">
      <h4>Login</h4>

      <ClientOnly>
        <ElForm
          ref="loginForm"
          :model="form"
          :rules="rules"
          @submit.prevent="handleSubmit"
        >
          <ElFormItem label="Email Address:" prop="email">
            <ElInput
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Enter your email"
              clearable
            />
          </ElFormItem>

          <ElFormItem label="Password:" prop="password">
            <ElInput
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              show-password
            />
          </ElFormItem>

          <ElFormItem>
            <ElButton
              type="primary"
              native-type="submit"
              class="login-btn"
            >
              Login now
            </ElButton>
          </ElFormItem>
        </ElForm>
      </ClientOnly>
    </div>
  </div>
  <div class="right" :class="{ hidden: !isRightVisible }" />
</template>

<style lang="scss" scoped>
.left {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: 1/-1;
  grid-row: 1;
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;

  &.hidden {
    opacity: 0;
    transform: translateX(-100%);
    pointer-events: none;
  }

  @include viewport-ml {
    grid-column: span 5;
    margin-block: 0.625rem;
    border-radius: 0.5rem;
    background-color: white;
  }

  .login-container {
    padding: 0.75rem;
    width: 100%;
    border-radius: 0.5rem;
    background-color: var(--color-gray-100);
    opacity: 0.8;
    z-index: 2;
    margin-inline: 0.625rem;
    padding-block: 1.25rem;

    @include viewport-ml {
      color: var(--color-gray-900);
      margin-inline: var(--spacing-desktop-6-xl);
      background-color: transparent;
    }
  }

  h4 {
    margin-bottom: var(--spacing-fluid-xl);
    color: black;

    @include viewport-ml {
      color: var(--color-gray-900);
    }
  }

  .login-btn {
    width: 100%;
    padding: 0.625rem;
    background-color: #007bff;
    border: none;
    border-radius: 0.5rem;
    color: #ffffff;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .login-btn:hover {
    background-color: #0056b3;
  }
}

.right {
  background-image: url('~/assets/images/login-img.jpg');
  background-size: cover;
  background-position: center;
  grid-column: 1/-1;
  grid-row: 1;
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;

  &.hidden {
    opacity: 0;
    transform: translateX(100%);
    pointer-events: none;
  }

  @include viewport-ml {
    grid-column: span 7;
    margin-block: 0.625rem;
    border-radius: 0.5rem;
  }
}
</style>
