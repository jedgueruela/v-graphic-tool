<template>
  <div class="home">
    <Header />
    <main role="main">
      <Workspaces />
    </main>
  </div>
</template>

<script>
import {
  Header,
  Workspaces
} from '../components/home';

export default {
  name: 'home',
  components: {
    Header,
    Workspaces
  }
}
</script>
