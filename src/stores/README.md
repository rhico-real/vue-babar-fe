# Pinia Stores

This directory contains Pinia stores for state management in the application.

## Available Stores

### UserProfile Store

The `userProfile.js` store handles fetching, storing, and accessing the user profile data.

#### Usage

Import the store in your component:

```js
import { useUserProfileStore } from '@/stores/userProfile';

// In your setup function or script setup
const userProfileStore = useUserProfileStore();
```

#### Available State

- `profile`: The full user profile object
- `loading`: Boolean indicating if a profile fetch is in progress
- `error`: Any error that occurred during profile fetch

#### Available Getters

- `isLoggedIn`: Boolean indicating if a user is logged in
- `userRole`: The user's role (e.g., 'GUEST', 'ADMIN')
- `userFullName`: The user's full name
- `userPhoto`: URL to the user's photo
- `userId`: The user's ID
- `userIdentifier`: The user's identifier/username

#### Available Actions

- `fetchProfile()`: Fetch the user profile from the API
- `clearProfile()`: Clear the profile data (useful for logout)
- `hasRole(role)`: Check if the user has a specific role

#### Example

```vue
<script setup>
import { useUserProfileStore } from '@/stores/userProfile';
import { computed, onMounted } from 'vue';

const userProfileStore = useUserProfileStore();
const userFullName = computed(() => userProfileStore.userFullName);
const userRole = computed(() => userProfileStore.userRole);

onMounted(async () => {
  try {
    await userProfileStore.fetchProfile();
  } catch (error) {
    console.error('Failed to load profile:', error);
  }
});
</script>

<template>
  <div>
    <h1>Welcome, {{ userFullName }}!</h1>
    <p>Your role: {{ userRole }}</p>
  </div>
</template>
```

## Store Persistence

To enable store persistence (saving state to localStorage), install the persistence plugin:

```bash
npm install pinia-plugin-persistedstate
```

Then in `main.js`, add:

```js
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```

And uncomment the `persist` section in the store configuration.
