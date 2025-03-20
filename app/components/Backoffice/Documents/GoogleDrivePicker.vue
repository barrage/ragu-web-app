<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import DocumentAddIcon from '~/assets/icons/svg/document-add.svg'

const runtimeConfig = useRuntimeConfig()
const { $api } = useNuxtApp()
const documentStore = useDocumentsStore()
const { t } = useI18n()

const CLIENT_ID = runtimeConfig.public.googleDrive.clientId
const APP_ID = runtimeConfig.public.googleDrive.appId

const SCOPES = [
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.appfolder',
  'https://www.googleapis.com/auth/drive.install',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
].join(' ')

const isLoading = ref(false)
const pickerInited = ref(false)
const gisInited = ref(false)
let tokenClient: any = null

let accessToken: string | null = null

const pickerCallback = async (data: any) => {
  if (data.action === google.picker.Action.PICKED) {
    const fileIds = data.docs.map((doc: any) => doc.id)

    const { data: importedData, execute: executeImport, error } = await useAsyncData(() =>
      $api.document.ImportGoogleDriveFile({
        files: fileIds,
        force: true,
      }, accessToken as string), { immediate: false })

    await executeImport()

    if (importedData.value?.failed && importedData.value.failed.length || error.value) {
      ElNotification({
        title: t('documents.notifications.create.error_title'),
        message: t('documents.notifications.create.error_description'),
        type: 'error',
        customClass: 'error',
        duration: 2500,
      })
    }
    else {
      ElNotification({
        title: t('documents.notifications.create.success_title'),
        message: t('documents.notifications.create.success_description'),
        type: 'success',
        customClass: 'success',
        duration: 2500,
      })
    }

    documentStore.newDocumentUploaded = true
  }
}

const maybeEnableButtons = () => {
  if (pickerInited.value && gisInited.value) {
    isLoading.value = false
  }
}

const initializePicker = async () => {
  await gapi.client.load('https://www.googleapis.com/discovery/v1/apis/drive/v3/rest')
  pickerInited.value = true
  maybeEnableButtons()
}

const gisLoaded = () => {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  })
  gisInited.value = true
  maybeEnableButtons()
}

const handleAuthClick = () => {
  tokenClient.callback = async (response: any) => {
    if (response.error !== undefined) {
      throw response
    }
    accessToken = response.access_token
    await createPicker()
  }

  if (accessToken === null) {
    tokenClient.requestAccessToken({ prompt: 'consent' })
  }
  else {
    tokenClient.requestAccessToken({ prompt: '' })
  }
}

const createPicker = () => {
  const view = new google.picker.View(google.picker.ViewId.DOCS)
  view.setMimeTypes(
    'application/pdf,application/vnd.google-apps.document,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,application/vnd.google-apps.spreadsheet,application/json,application/vnd.google-apps.folder',
  )
  const picker = new google.picker.PickerBuilder()
    .enableFeature(google.picker.Feature.NAV_HIDDEN)
    .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
    .setAppId(APP_ID)
    .setOAuthToken(accessToken)
    .addView(view)
    .addView(new google.picker.DocsUploadView())
    .setCallback(pickerCallback)
    .build()
  picker.setVisible(true)
}

// Load the Google API script
const loadGoogleApiScript = () => {
  const script = document.createElement('script')
  script.src = 'https://apis.google.com/js/api.js'
  script.async = true
  script.defer = true
  script.onload = () => {
    gapi.load('client:picker', initializePicker)
  }
  document.body.appendChild(script)
}

// Load the Google Identity Services script
const loadGoogleIdentityScript = () => {
  const script = document.createElement('script')
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true
  script.onload = () => gisLoaded()
  document.body.appendChild(script)
}

onMounted(() => {
  loadGoogleApiScript()
  loadGoogleIdentityScript()
})
</script>

<template>
  <el-button
    :loading="isLoading"
    @click="handleAuthClick"
  >
    <DocumentAddIcon size="20px" /> {{ t('documents.google_drive') }}
  </el-button>
</template>
