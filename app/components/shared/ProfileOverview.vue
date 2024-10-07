<script lang="ts" setup>
const profileData = {
  firstName: 'Fufura',
  lastName: 'Fufurasta',
  role: 'Admin',
  email: 'fufura@example.com',
  status: 'Active',
  createdAt: '01 Jan 2023',
  updatedAt: '15 Aug 2023',
}

const getMappedProfileInfo = computed(() => [
  {
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    role: profileData.role,
    profile: [
      { label: 'Email', value: profileData.email },
      { label: 'Active Status', value: profileData.status },
      { label: 'Created At', value: profileData.createdAt },
      { label: 'Updated At', value: profileData.updatedAt },
    ],
  },

])
</script>

<template>
  <div class="profile-container">
    <div class="profile-top">
      <div class="avatar" />
      <div class="profile-title">
        <h6>{{ getMappedProfileInfo[0]?.firstName }} {{ getMappedProfileInfo[0]?.lastName }}</h6>
        <p class="role">
          {{ getMappedProfileInfo[0]?.role }}
        </p>
      </div>
    </div>

    <div class="horizontal-divider" />

    <div class="profile-bottom">
      <div
        v-for="(info, index) in getMappedProfileInfo[0]?.profile"
        :key="index"
        class="profile-info"
      >
        <span class="label">
          {{ info.label }}:
        </span>
        <span class="value">
          {{ info.value }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-top {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 1rem;
}

.avatar {
  width: 80px;
  height: 80px;
  background-image: url('../assets/images/login-img.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  border: 3px solid var(--color-primary-300);
}

.profile-title {
  h6 {
    font-weight: var(--font-weight-semibold);
    margin-bottom: 0.25rem;
  }

  .role {
    color: var(--color-primary-500);
    font-size: var(--font-size-desktop-2);
  }
}

.horizontal-divider {
  width: 100%;
  height: 1px;
  background: var(--color-primary-300);
  margin: 1rem 0;
}

.profile-bottom {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  .profile-info {
    display: flex;
    gap: 10px;
    color: var(--color-primary-800);
    font-size: var(--font-size-desktop-2);

    .label {
      font-weight: 500;
      color: var(--color-primary-600);

      .value {
        font-weight: var(--font-weight-regular);
      }
    }
  }

  @include viewport-xs {
    grid-template-columns: 1fr 1fr;
  }
}

.dark {
  .profile-title {
    h6 {
      color: var(--color-primary-100);
    }

    .role {
      color: var(--color-primary-100);
    }
  }

  .profile-info {
    color: var(--color-primary-300);

    .label {
      color: var(--color-primary-100);
    }
  }
}
</style>
