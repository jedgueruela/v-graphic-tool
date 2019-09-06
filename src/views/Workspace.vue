<template>
  <div class="workspace">
    <Header />
    <Pages />
    <router-view></router-view>
  </div>
</template>

<script>
import {
  Header,
  Pages
} from '../components/workspace';

export default {
  name: 'workspace',
  components: {
    Header,
    Pages
  }
}
</script>
